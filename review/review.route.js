const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken'); // এখানে ইম্পোর্ট করো
const { addReview, getAllReviews, getUserReviews, getCollegeReviews } = require('./review.controller');

// POST - Add review (প্রাইভেট)
router.post('/', verifyToken, addReview);

// GET - All reviews (latest 10) (সবার জন্য ওপেন)
// যদি তুমি চাও, এইটা ওপেন থাকবে, তাহলে verifyToken লাগবে না
router.get('/', getAllReviews);

// GET - Reviews by user (প্রাইভেট, কারণ ইউজারের রিভিউস)
router.get('/user/:userId', verifyToken, getUserReviews);

// GET - Reviews by college (সবার জন্য ওপেন)
router.get('/college/:collegeId', getCollegeReviews);

module.exports = router;
