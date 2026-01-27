const path = require('path');
const multer = require('multer');

// Match server.js: on Vercel use /tmp (ephemeral); otherwise project uploads folder
const uploadsImages = process.env.VERCEL
  ? path.join('/tmp/pfcfilms-uploads', 'images')
  : path.join(__dirname, '../uploads', 'images');

const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/webp', 'image/svg+xml', 'image/bmp'];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIMES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP, SVG, BMP)'), false);
  }
};

// Use memory storage when using Vercel Blob, disk storage otherwise
const useBlobStorage = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL;

const storage = useBlobStorage && process.env.BLOB_READ_WRITE_TOKEN
  ? multer.memoryStorage() // Use memory storage for Blob uploads
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadsImages);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.jpg';
        const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').slice(0, 50);
        cb(null, `${Date.now()}-${base}${ext}`);
      },
    });

const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // 5MB

module.exports = { uploadImage };
