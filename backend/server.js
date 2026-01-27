const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// On Vercel, /var/task is read-only; use /tmp (ephemeral). For production uploads, use S3/Vercel Blob/Cloudinary.
const uploadsBase = process.env.VERCEL ? '/tmp/pfcfilms-uploads' : path.join(__dirname, 'uploads');
const uploadsImages = path.join(uploadsBase, 'images');

try {
  if (!fs.existsSync(uploadsImages)) {
    fs.mkdirSync(uploadsImages, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create uploads directory:', err.message);
}

// Serve uploaded images (before API routes)
// On Vercel, files in /tmp are ephemeral, so we handle missing files gracefully
app.use('/uploads', express.static(uploadsBase, {
  fallthrough: true, // Continue to next middleware if file not found
}));

// Handle missing upload files (especially on Vercel where /tmp is ephemeral)
app.use('/uploads', (req, res, next) => {
  // If we're on Vercel and the file doesn't exist, it's likely in ephemeral storage
  if (process.env.VERCEL) {
    console.warn(`File not found in ephemeral storage: ${req.path}`);
    // Return 404 with helpful message
    return res.status(404).json({
      success: false,
      message: 'Image not found. This file was stored in ephemeral storage and has been lost. Please re-upload the image.',
      path: req.path,
      note: 'On Vercel, files in /tmp are ephemeral. Use Vercel Blob Storage for persistent storage.'
    });
  }
  // In development, return standard 404
  res.status(404).json({
    success: false,
    message: 'File not found',
    path: req.path
  });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pfcfilms';
const connectPromise = mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

// Wait for MongoDB before handling API requests (avoids "buffering timed out" on serverless/cold start)
app.use(async (req, res, next) => {
  try {
    await connectPromise;
    next();
  } catch (err) {
    next(err);
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/productions', require('./routes/productions'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/awards', require('./routes/awards'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/top-projects', require('./routes/top-projects'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/migrate', require('./routes/migrate-images'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PFC Films API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectPromise;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

start();
