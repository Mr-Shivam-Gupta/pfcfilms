/**
 * One-time migration script:
 * - Uploads all files under ./uploads to Cloudinary
 * - Rewrites MongoDB documents that still reference local "/uploads/..." paths
 *
 * Run:
 *   node migrate-uploads-to-cloudinary.js
 *
 * Optional:
 *   node migrate-uploads-to-cloudinary.js --dry-run   (no DB writes, still uploads + prints what would change)
 */
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const { uploadToCloudinary } = require('./config/cloudinary');

const Award = require('./models/Award');
const Production = require('./models/Production');
const Gallery = require('./models/Gallery');
const Course = require('./models/Course');
const Testimonial = require('./models/Testimonial');
const TopProject = require('./models/TopProject');
const Celebrity = require('./models/Celebrity');

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const MAP_PATH = path.join(__dirname, 'cloudinary-migration-map.json');

const DRY_RUN = process.argv.includes('--dry-run');

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function localUrlForFile(absFilePath) {
  const rel = path.relative(UPLOADS_DIR, absFilePath);
  return `/uploads/${toPosix(rel)}`;
}

function cloudinaryPublicIdForFile(absFilePath) {
  // Example:
  // uploads/images/foo.jpg -> folder: pfcfilms, public_id: uploads/images/foo
  const rel = toPosix(path.relative(UPLOADS_DIR, absFilePath));
  const noExt = rel.replace(/\.[^/.]+$/, '');
  // Cloudinary public_id can contain slashes; sanitize weird chars
  const safe = noExt.replace(/[^a-zA-Z0-9/_-]+/g, '-');
  return `uploads/${safe}`;
}

async function fileExists(p) {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listFilesRecursive(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...(await listFilesRecursive(full)));
    } else if (ent.isFile()) {
      if (ent.name === '.gitkeep') continue;
      out.push(full);
    }
  }
  return out;
}

async function readJsonSafe(p, fallback) {
  try {
    const raw = await fsp.readFile(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJsonAtomic(p, obj) {
  const tmp = `${p}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify(obj, null, 2), 'utf8');
  await fsp.rename(tmp, p);
}

async function uploadAllUploadsToCloudinary() {
  requireEnv('CLOUDINARY_CLOUD_NAME');
  requireEnv('CLOUDINARY_API_KEY');
  requireEnv('CLOUDINARY_API_SECRET');

  if (!(await fileExists(UPLOADS_DIR))) {
    throw new Error(`Uploads directory not found: ${UPLOADS_DIR}`);
  }

  const map = await readJsonSafe(MAP_PATH, {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: {},
  });

  const files = await listFilesRecursive(UPLOADS_DIR);
  files.sort(); // stable order

  const stats = { total: files.length, uploaded: 0, skipped: 0, failed: 0 };

  for (const abs of files) {
    const localUrl = localUrlForFile(abs);
    if (map.files[localUrl]?.cloudinaryUrl) {
      stats.skipped++;
      continue;
    }

    try {
      const buffer = await fsp.readFile(abs);
      const public_id = cloudinaryPublicIdForFile(abs);
      const result = await uploadToCloudinary(buffer, 'pfcfilms', {
        resource_type: 'image',
        public_id,
        overwrite: false,
        unique_filename: false,
      });

      map.files[localUrl] = {
        localUrl,
        sourceFile: abs,
        public_id: result.public_id,
        cloudinaryUrl: result.secure_url,
        bytes: result.bytes,
        format: result.format,
        uploadedAt: new Date().toISOString(),
      };
      stats.uploaded++;

      // Persist as we go so reruns can resume
      map.updatedAt = new Date().toISOString();
      await writeJsonAtomic(MAP_PATH, map);
    } catch (err) {
      stats.failed++;
      console.error(`[UPLOAD FAILED] ${abs}: ${err?.message || err}`);
    }
  }

  return { map, stats };
}

function mapLookup(map, urlOrPath) {
  if (!urlOrPath) return null;
  if (typeof urlOrPath !== 'string') return null;
  if (!urlOrPath.startsWith('/uploads/')) return null;
  return map.files[urlOrPath]?.cloudinaryUrl || null;
}

async function rewriteModelFields({ map, name, model, fields, arrayFields = [] }) {
  const results = { scanned: 0, updatedDocs: 0, updatedFields: 0, skipped: 0 };

  // Build query: any relevant field starts with /uploads/
  const or = [];
  for (const f of fields) or.push({ [f]: { $regex: '^/uploads/' } });
  for (const af of arrayFields) or.push({ [af]: { $elemMatch: { $regex: '^/uploads/' } } });
  const query = or.length ? { $or: or } : {};

  const docs = await model.find(query);
  results.scanned = docs.length;

  for (const doc of docs) {
    let changed = false;

    for (const f of fields) {
      const current = doc[f];
      const next = mapLookup(map, current);
      if (next && next !== current) {
        doc[f] = next;
        changed = true;
        results.updatedFields++;
      }
    }

    for (const af of arrayFields) {
      const arr = doc[af];
      if (Array.isArray(arr) && arr.length) {
        let any = false;
        const nextArr = arr.map((v) => {
          const next = mapLookup(map, v);
          if (next && next !== v) {
            any = true;
            results.updatedFields++;
            return next;
          }
          return v;
        });
        if (any) {
          doc[af] = nextArr;
          changed = true;
        }
      }
    }

    if (changed) {
      results.updatedDocs++;
      if (!DRY_RUN) await doc.save();
    } else {
      results.skipped++;
    }
  }

  console.log(
    `[DB] ${name}: scanned=${results.scanned}, updatedDocs=${results.updatedDocs}, updatedFields=${results.updatedFields}, skipped=${results.skipped}`
  );

  return results;
}

async function rewriteDatabaseImagePaths(map) {
  requireEnv('MONGODB_URI');

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  const summary = {};
  summary.Award = await rewriteModelFields({ map, name: 'Award', model: Award, fields: ['image'] });
  summary.Production = await rewriteModelFields({ map, name: 'Production', model: Production, fields: ['image'] });
  summary.Course = await rewriteModelFields({ map, name: 'Course', model: Course, fields: ['image'] });
  summary.Testimonial = await rewriteModelFields({ map, name: 'Testimonial', model: Testimonial, fields: ['image'] });
  summary.TopProject = await rewriteModelFields({ map, name: 'TopProject', model: TopProject, fields: ['image'] });
  summary.Gallery = await rewriteModelFields({
    map,
    name: 'Gallery',
    model: Gallery,
    fields: ['image', 'thumbnail'],
  });
  summary.Celebrity = await rewriteModelFields({
    map,
    name: 'Celebrity',
    model: Celebrity,
    fields: ['image'],
    arrayFields: ['gallery'],
  });

  await mongoose.disconnect();
  return summary;
}

async function main() {
  console.log(`=== Cloudinary migration starting ===`);
  console.log(`Uploads dir: ${UPLOADS_DIR}`);
  console.log(`Map file:    ${MAP_PATH}`);
  console.log(`Mode:        ${DRY_RUN ? 'DRY RUN (no DB writes)' : 'APPLY (uploads + DB updates)'}`);

  const { map, stats } = await uploadAllUploadsToCloudinary();
  console.log(`\n[UPLOAD] total=${stats.total}, uploaded=${stats.uploaded}, skipped=${stats.skipped}, failed=${stats.failed}`);

  console.log(`\n=== Updating MongoDB image paths ===`);
  const dbSummary = await rewriteDatabaseImagePaths(map);

  console.log(`\n=== Done ===`);
  console.log(`Map saved at: ${MAP_PATH}`);
  console.log(`Tip: Your existing local URLs will keep working, but DB now uses Cloudinary URLs where possible.`);

  // Print concise summary
  const models = Object.keys(dbSummary);
  const updatedDocs = models.reduce((n, k) => n + (dbSummary[k]?.updatedDocs || 0), 0);
  const updatedFields = models.reduce((n, k) => n + (dbSummary[k]?.updatedFields || 0), 0);
  console.log(`DB total updatedDocs=${updatedDocs}, updatedFields=${updatedFields}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

