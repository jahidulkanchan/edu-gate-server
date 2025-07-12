const User = require('../user/user.model');

const verifyAdmin = async (req, res, next) => {
  try {
    // verifyToken এর পরে চলবে, তাই req.user থাকা উচিত
    const userId = req.user?.userId || req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // অ্যাডমিন হলে পরবর্তী middleware বা route handler এ যাও
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = verifyAdmin;
