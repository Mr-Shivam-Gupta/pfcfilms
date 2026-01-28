const mongoose = require('mongoose');

const topProjectSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  productionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Production',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TopProject', topProjectSchema);
