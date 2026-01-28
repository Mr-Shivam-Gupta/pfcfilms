const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    
    // Set default image for testimonials without images
    const testimonialsWithDefaults = testimonials.map(testimonial => {
      const testimonialObj = testimonial.toObject();
      if (!testimonialObj.image || testimonialObj.image.trim() === '') {
        // Use public path for default image
        testimonialObj.image = '/public/images/default-user-icon.png';
      }
      return testimonialObj;
    });
    
    res.json({ success: true, data: testimonialsWithDefaults });
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
    
    const testimonialObj = testimonial.toObject();
    // Set default image if missing
    if (!testimonialObj.image || testimonialObj.image.trim() === '') {
      testimonialObj.image = '/public/images/default-user-icon.png';
    }
    
    res.json({ success: true, data: testimonialObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create testimonial (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    
    const testimonialObj = testimonial.toObject();
    // Set default image if missing
    if (!testimonialObj.image || testimonialObj.image.trim() === '') {
      testimonialObj.image = '/public/images/default-user-icon.png';
    }
    
    res.status(201).json({ success: true, data: testimonialObj });
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
    
    const testimonialObj = testimonial.toObject();
    // Set default image if missing
    if (!testimonialObj.image || testimonialObj.image.trim() === '') {
      testimonialObj.image = '/public/images/default-user-icon.png';
    }
    
    res.json({ success: true, data: testimonialObj });
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
