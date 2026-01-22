const express = require('express');
const router = express.Router();
const Stat = require('../models/Stat');
const auth = require('../middleware/auth');

// Get all stats (public)
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ order: 1 });
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create stat (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const stat = new Stat(req.body);
    await stat.save();
    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update stat (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const stat = await Stat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!stat) {
      return res.status(404).json({ success: false, message: 'Stat not found' });
    }
    res.json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete stat (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);
    if (!stat) {
      return res.status(404).json({ success: false, message: 'Stat not found' });
    }
    res.json({ success: true, message: 'Stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
