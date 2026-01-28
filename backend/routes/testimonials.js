const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single testimonial (public)
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create testimonial (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update testimonial (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
