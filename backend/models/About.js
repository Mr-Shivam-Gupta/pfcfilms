const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  directorName: {
    type: String,
    required: true,
    trim: true
  },
  directorTitle: {
    type: String,
    required: true,
    trim: true
  },
  directorImage: {
    type: String,
    required: true
  },
  directorBio: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  achievements: [{
    icon: String,
    number: String,
    label: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);
