const express = require('express');
const router = express.Router();
const { getAllColleges, getCollegeById, addCollege } = require('./college.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', getAllColleges);
router.get('/:id', getCollegeById);
router.post('/', verifyToken, verifyAdmin, addCollege);

module.exports = router;
