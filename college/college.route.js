const express = require('express');
const router = express.Router();
const {
  getAllColleges,
  getCollegeById,
  addCollege,
  searchColleges,
} = require('./college.controller');

const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');

// Search colleges by name (public route)
router.get('/search', searchColleges);

// Get all colleges
router.get('/', getAllColleges);

// Get single college by ID
router.get('/:id', getCollegeById);

// Add new college (Admin only)
router.post('/', verifyToken, verifyAdmin, addCollege);

module.exports = router;
