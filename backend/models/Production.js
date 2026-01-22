const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Feature Films', 'Documentaries', 'Music Videos', 'Commercials', 'Short Films', 'Web Series', 'Reality Shows'],
    default: 'Feature Films'
  },
  year: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  awards: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: ''
  },
  genre: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Released', 'Upcoming', 'In Production'],
    default: 'Released'
  },
  releaseDate: {
    type: Date
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

module.exports = mongoose.model('Production', productionSchema);
