const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stat', statSchema);
