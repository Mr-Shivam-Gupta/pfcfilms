const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

router.post('/image', auth, async (req, res, next) => {
  // Check storage options in priority order: Cloudinary > Vercel Blob > Local
  const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                        process.env.CLOUDINARY_API_KEY && 
                        process.env.CLOUDINARY_API_SECRET;
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

    // Priority 1: Use Cloudinary if configured
    if (useCloudinary) {
      try {
        const folder = 'pfcfilms/images';
        const result = await uploadToCloudinary(req.file.buffer, folder, {
          resource_type: 'image',
          format: path.extname(req.file.originalname).slice(1) || 'jpg',
        });
        
        // Return the Cloudinary secure URL
        return res.json({ 
          success: true, 
          path: result.secure_url,
          public_id: result.public_id 
        });
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to upload to Cloudinary: ' + cloudinaryError.message 
        });
      }
    }

    // Priority 2: Use Vercel Blob Storage if token is available
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
    }

    // Priority 3: Use local file storage for development
    const filePath = '/uploads/images/' + req.file.filename;
    res.json({ success: true, path: filePath });
  });
});

// Delete image endpoint (for Cloudinary cleanup)
router.delete('/image', auth, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image URL is required' 
      });
    }

    // Only delete from Cloudinary if it's a Cloudinary URL
    if (imageUrl.includes('cloudinary.com')) {
      try {
        await deleteFromCloudinary(imageUrl);
        return res.json({ 
          success: true, 
          message: 'Image deleted from Cloudinary' 
        });
      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to delete image from Cloudinary' 
        });
      }
    }

    // For non-Cloudinary URLs, just return success (local files can be cleaned up separately)
    res.json({ 
      success: true, 
      message: 'Delete request processed (non-Cloudinary URL)' 
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete image' 
    });
  }
});

module.exports = router;
