const express = require('express');
const router = express.Router();

const { getAdmissionsByUser, addAdmission, updateAdmission, getPendingAdmissions } = require('./admission.controller');

const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// 👉 Add admission (authenticated user)
router.post('/', verifyToken, addAdmission);

// 👉 Get admissions by user (authenticated user)
router.get('/:userId', verifyToken, getAdmissionsByUser);

// 👉 Get pending admissions (admin only)
router.get('/admin/pending', verifyToken, verifyAdmin, getPendingAdmissions);

// 👉 Update admission (admin only)
router.patch('/:id', verifyToken, verifyAdmin, updateAdmission);

module.exports = router;
