const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const Award = require('../models/Award');
const Production = require('../models/Production');
const Gallery = require('../models/Gallery');
const Course = require('../models/Course');
const Testimonial = require('../models/Testimonial');

/**
 * Migration endpoint to move existing /uploads/images/... paths to Blob Storage
 * This should be run once after setting up Blob Storage to migrate existing images
 * 
 * Note: This requires the actual image files to still exist locally.
 * If files are already lost (e.g., on Vercel /tmp), you'll need to re-upload them manually.
 */
router.post('/to-blob', auth, async (req, res) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(400).json({
      success: false,
      message: 'BLOB_READ_WRITE_TOKEN not configured. Please set up Vercel Blob Storage first.'
    });
  }

  try {
    const { put } = await import('@vercel/blob');
    const uploadsImages = process.env.VERCEL 
      ? path.join('/tmp/pfcfilms-uploads', 'images')
      : path.join(__dirname, '../uploads', 'images');

    const results = {
      awards: { updated: 0, failed: 0, skipped: 0 },
      productions: { updated: 0, failed: 0, skipped: 0 },
      gallery: { updated: 0, failed: 0, skipped: 0 },
      courses: { updated: 0, failed: 0, skipped: 0 },
      testimonials: { updated: 0, failed: 0, skipped: 0 },
    };

    // Migrate Awards
    const awards = await Award.find({ image: { $regex: '^/uploads/images/' } });
    for (const award of awards) {
      try {
        const filename = path.basename(award.image);
        const filePath = path.join(uploadsImages, filename);
        
        if (!fs.existsSync(filePath)) {
          results.awards.skipped++;
          continue;
        }

        const fileBuffer = fs.readFileSync(filePath);
        const blob = await put(`images/${filename}`, fileBuffer, {
          access: 'public',
          contentType: 'image/jpeg', // Adjust if needed
        });

        award.image = blob.url;
        await award.save();
        results.awards.updated++;
      } catch (err) {
        console.error(`Failed to migrate award ${award._id}:`, err.message);
        results.awards.failed++;
      }
    }

    // Migrate Productions
    const productions = await Production.find({ image: { $regex: '^/uploads/images/' } });
    for (const production of productions) {
      try {
        const filename = path.basename(production.image);
        const filePath = path.join(uploadsImages, filename);
        
        if (!fs.existsSync(filePath)) {
          results.productions.skipped++;
          continue;
        }

        const fileBuffer = fs.readFileSync(filePath);
        const blob = await put(`images/${filename}`, fileBuffer, {
          access: 'public',
          contentType: 'image/jpeg',
        });

        production.image = blob.url;
        await production.save();
        results.productions.updated++;
      } catch (err) {
        console.error(`Failed to migrate production ${production._id}:`, err.message);
        results.productions.failed++;
      }
    }

    // Migrate Gallery
    const galleryItems = await Gallery.find({ 
      $or: [
        { image: { $regex: '^/uploads/images/' } },
        { thumbnail: { $regex: '^/uploads/images/' } }
      ]
    });
    for (const item of galleryItems) {
      try {
        // Migrate main image
        if (item.image && item.image.startsWith('/uploads/images/')) {
          const filename = path.basename(item.image);
          const filePath = path.join(uploadsImages, filename);
          
          if (fs.existsSync(filePath)) {
            const fileBuffer = fs.readFileSync(filePath);
            const blob = await put(`images/${filename}`, fileBuffer, {
              access: 'public',
              contentType: 'image/jpeg',
            });
            item.image = blob.url;
          }
        }

        // Migrate thumbnail
        if (item.thumbnail && item.thumbnail.startsWith('/uploads/images/')) {
          const filename = path.basename(item.thumbnail);
          const filePath = path.join(uploadsImages, filename);
          
          if (fs.existsSync(filePath)) {
            const fileBuffer = fs.readFileSync(filePath);
            const blob = await put(`images/${filename}`, fileBuffer, {
              access: 'public',
              contentType: 'image/jpeg',
            });
            item.thumbnail = blob.url;
          }
        }

        await item.save();
        results.gallery.updated++;
      } catch (err) {
        console.error(`Failed to migrate gallery item ${item._id}:`, err.message);
        results.gallery.failed++;
      }
    }

    // Migrate Courses
    const courses = await Course.find({ image: { $regex: '^/uploads/images/' } });
    for (const course of courses) {
      try {
        const filename = path.basename(course.image);
        const filePath = path.join(uploadsImages, filename);
        
        if (!fs.existsSync(filePath)) {
          results.courses.skipped++;
          continue;
        }

        const fileBuffer = fs.readFileSync(filePath);
        const blob = await put(`images/${filename}`, fileBuffer, {
          access: 'public',
          contentType: 'image/jpeg',
        });

        course.image = blob.url;
        await course.save();
        results.courses.updated++;
      } catch (err) {
        console.error(`Failed to migrate course ${course._id}:`, err.message);
        results.courses.failed++;
      }
    }

    // Migrate Testimonials
    const testimonials = await Testimonial.find({ image: { $regex: '^/uploads/images/' } });
    for (const testimonial of testimonials) {
      try {
        const filename = path.basename(testimonial.image);
        const filePath = path.join(uploadsImages, filename);
        
        if (!fs.existsSync(filePath)) {
          results.testimonials.skipped++;
          continue;
        }

        const fileBuffer = fs.readFileSync(filePath);
        const blob = await put(`images/${filename}`, fileBuffer, {
          access: 'public',
          contentType: 'image/jpeg',
        });

        testimonial.image = blob.url;
        await testimonial.save();
        results.testimonials.updated++;
      } catch (err) {
        console.error(`Failed to migrate testimonial ${testimonial._id}:`, err.message);
        results.testimonials.failed++;
      }
    }

    res.json({
      success: true,
      message: 'Migration completed',
      results
    });
  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
