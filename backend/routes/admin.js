const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Production = require('../models/Production');
const Course = require('../models/Course');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Testimonial = require('../models/Testimonial');
const Award = require('../models/Award');
const Stat = require('../models/Stat');

// Get dashboard stats (admin only)
router.get('/dashboard', auth, async (req, res) => {
  try {
    const [
      productionsCount,
      coursesCount,
      galleryCount,
      contactsCount,
      testimonialsCount,
      awardsCount,
      newContacts
    ] = await Promise.all([
      Production.countDocuments(),
      Course.countDocuments(),
      Gallery.countDocuments(),
      Contact.countDocuments(),
      Testimonial.countDocuments(),
      Award.countDocuments(),
      Contact.countDocuments({ status: 'new' })
    ]);

    res.json({
      success: true,
      data: {
        productions: productionsCount,
        courses: coursesCount,
        gallery: galleryCount,
        contacts: contactsCount,
        newContacts,
        testimonials: testimonialsCount,
        awards: awardsCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
