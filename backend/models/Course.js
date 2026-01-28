const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: String,
    required: true
  },
  students: {
    type: String,
    default: '0+'
  },
  rating: {
    type: String,
    default: '0'
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  modules: [{
    type: String
  }],
  academy: {
    type: String,
    enum: ['Acting School', 'Dance Academy', 'Film Academy'],
    default: 'Film Academy'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
