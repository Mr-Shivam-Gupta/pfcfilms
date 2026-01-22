const express = require('express');
const router = express.Router();
const About = require('../models/About');
const auth = require('../middleware/auth');

// Get about content (public)
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Return default structure if no data exists
      about = {
        directorName: 'Mr. Pramod Kumar Gupta',
        directorTitle: 'Founder & Creative Director',
        directorImage: '',
        directorBio: '',
        quote: '',
        vision: '',
        mission: '',
        achievements: []
      };
    }
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create/Update about content (admin only)
router.post('/', auth, async (req, res) => {
  try {
    let about = await About.findOne();
    if (about) {
      // Update existing
      Object.assign(about, req.body);
      await about.save();
    } else {
      // Create new
      about = new About(req.body);
      await about.save();
    }
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update about content (admin only)
router.put('/', auth, async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
