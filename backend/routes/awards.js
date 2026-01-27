const express = require('express');
const router = express.Router();
const Award = require('../models/Award');
const auth = require('../middleware/auth');

// Get all awards (public)
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const query = {};
    if (featured === 'true') {
      query.featured = true;
    }
    const awards = await Award.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: awards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single award (public)
router.get('/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) {
      return res.status(404).json({ success: false, message: 'Award not found' });
    }
    res.json({ success: true, data: award });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create award (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const award = new Award(req.body);
    await award.save();
    res.status(201).json({ success: true, data: award });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update award (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!award) {
      return res.status(404).json({ success: false, message: 'Award not found' });
    }
    res.json({ success: true, data: award });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete award (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id);
    if (!award) {
      return res.status(404).json({ success: false, message: 'Award not found' });
    }
    res.json({ success: true, message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
