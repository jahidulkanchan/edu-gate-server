const Review = require('./review.model');

// POST: Add a new review
exports.addReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit review.', error: err.message });
  }
};

// GET: All reviews (for home page display)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews.', error: err.message });
  }
};

// GET: Reviews by User
exports.getUserReviews = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user reviews.', error: err.message });
  }
};

// GET: Reviews by College
exports.getCollegeReviews = async (req, res) => {
  try {
    const collegeId = req.params.collegeId;
    const reviews = await Review.find({ collegeId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch college reviews.', error: err.message });
  }
};

// Backend controller example: (তোমার nodemodule তে)
exports.getUserReviewsWithCollege = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.find({ userId })
      .populate('collegeId', 'name imageUrl admissionDate') // কলেজ ইনফো
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user reviews.', error: err.message });
  }
};
