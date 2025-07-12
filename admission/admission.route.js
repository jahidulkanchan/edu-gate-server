const express = require('express');
const router = express.Router();
const { getAdmissionsByUser, addAdmission } = require('./admission.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, addAdmission);
router.get('/user/:userId', verifyToken, getAdmissionsByUser);


module.exports = router;
