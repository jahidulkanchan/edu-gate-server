const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('./user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', register);
router.post('/login', login);

// প্রোটেক্টেড রুট
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
