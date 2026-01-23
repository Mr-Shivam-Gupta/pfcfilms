const express = require('express');
const router = express.Router();
const TopProject = require('../models/TopProject');
const auth = require('../middleware/auth');

// Get all top projects (public)
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const query = {};
    
    if (featured === 'true') {
      query.featured = true;
    }

    const topProjects = await TopProject.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: topProjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single top project (public)
router.get('/:id', async (req, res) => {
  try {
    const topProject = await TopProject.findById(req.params.id);
    if (!topProject) {
      return res.status(404).json({ success: false, message: 'Top project not found' });
    }
    res.json({ success: true, data: topProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create top project (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const topProject = new TopProject(req.body);
    await topProject.save();
    res.status(201).json({ success: true, data: topProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update top project (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const topProject = await TopProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!topProject) {
      return res.status(404).json({ success: false, message: 'Top project not found' });
    }
    res.json({ success: true, data: topProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete top project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const topProject = await TopProject.findByIdAndDelete(req.params.id);
    if (!topProject) {
      return res.status(404).json({ success: false, message: 'Top project not found' });
    }
    res.json({ success: true, message: 'Top project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
