const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.post('/image', auth, (req, res, next) => {
  uploadImage.single('image')(req, res, (err) => {
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
    const filePath = '/uploads/images/' + req.file.filename;
    res.json({ success: true, path: filePath });
  });
});

module.exports = router;
