const College = require('./college.model');

// কলেজ লিস্ট পাওয়া (GET /api/colleges)
exports.getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    res.status(200).json({ colleges });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch colleges.', error: error.message });
  }
};

// কলেজ ডিটেইল পাওয়া (GET /api/colleges/:id)
exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json({ college });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch college details.', error: error.message });
  }
};

// নতুন কলেজ যোগ করা (POST /api/colleges) - Optional, admin use case
exports.addCollege = async (req, res) => {
  try {
    const newCollege = new College(req.body);
    await newCollege.save();
    res.status(201).json({ message: 'College added successfully', college: newCollege });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add college.', error: error.message });
  }
};
