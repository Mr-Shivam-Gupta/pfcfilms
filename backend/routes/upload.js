const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.post('/image', auth, async (req, res, next) => {
  // Check if we should use Vercel Blob Storage
  const useBlobStorage = process.env.BLOB_READ_WRITE_TOKEN;

  uploadImage.single('image')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File too large (max 5MB)' });
      }
      if (err.message && err.message.includes('Only image')) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    // Use Vercel Blob Storage if token is available
    if (useBlobStorage) {
      try {
        const { put } = await import('@vercel/blob');
        const ext = path.extname(req.file.originalname) || '.jpg';
        const base = path.basename(req.file.originalname, ext).replace(/\s+/g, '-').slice(0, 50);
        const filename = `images/${Date.now()}-${base}${ext}`;
        
        // Upload to Vercel Blob Storage
        const blob = await put(filename, req.file.buffer, {
          access: 'public',
          contentType: req.file.mimetype,
        });
        
        // Return the Blob URL (full URL)
        return res.json({ success: true, path: blob.url });
      } catch (blobError) {
        console.error('Blob upload error:', blobError);
        // Fallback: try to use filename if available, otherwise generate one
        const ext = path.extname(req.file.originalname) || '.jpg';
        const base = path.basename(req.file.originalname, ext).replace(/\s+/g, '-').slice(0, 50);
        const fallbackFilename = req.file.filename || `${Date.now()}-${base}${ext}`;
        const filePath = '/uploads/images/' + fallbackFilename;
        return res.json({ success: true, path: filePath });
      }
    } else {
      // Use local file storage for development
      const filePath = '/uploads/images/' + req.file.filename;
      res.json({ success: true, path: filePath });
    }
  });
});

module.exports = router;
