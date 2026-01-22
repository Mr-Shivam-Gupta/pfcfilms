const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Production', 'Academy', 'Events', 'BTS', 'Trailers', 'Testimonials'],
    default: 'Production'
  },
  type: {
    type: String,
    required: true,
    enum: ['photo', 'video'],
    default: 'photo'
  },
  image: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  videoUrl: {
    type: String
  },
  duration: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
