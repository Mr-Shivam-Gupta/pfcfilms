const express = require('express');
const router = express.Router();
const Production = require('../models/Production');
const auth = require('../middleware/auth');

// Get all productions (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured, status } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }
    if (status) {
      query.status = status;
    }

    const productions = await Production.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: productions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single production (public)
router.get('/:id', async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production not found' });
    }
    res.json({ success: true, data: production });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create production (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const production = new Production(req.body);
    await production.save();
    res.status(201).json({ success: true, data: production });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update production (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const production = await Production.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production not found' });
    }
    res.json({ success: true, data: production });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete production (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const production = await Production.findByIdAndDelete(req.params.id);
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production not found' });
    }
    res.json({ success: true, message: 'Production deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
