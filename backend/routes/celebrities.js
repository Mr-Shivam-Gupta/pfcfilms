const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');
const auth = require('../middleware/auth');

// Get all celebrities (public)
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const query = {};
    if (featured === 'true') {
      query.featured = true;
    }
    const celebrities = await Celebrity.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: celebrities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single celebrity (public)
router.get('/:id', async (req, res) => {
  try {
    const celebrity = await Celebrity.findById(req.params.id);
    if (!celebrity) {
      return res.status(404).json({ success: false, message: 'Celebrity not found' });
    }
    res.json({ success: true, data: celebrity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create celebrity (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const celebrity = new Celebrity(req.body);
    await celebrity.save();
    res.status(201).json({ success: true, data: celebrity });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update celebrity (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const celebrity = await Celebrity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!celebrity) {
      return res.status(404).json({ success: false, message: 'Celebrity not found' });
    }
    res.json({ success: true, data: celebrity });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete celebrity (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const celebrity = await Celebrity.findByIdAndDelete(req.params.id);
    if (!celebrity) {
      return res.status(404).json({ success: false, message: 'Celebrity not found' });
    }
    res.json({ success: true, message: 'Celebrity deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
