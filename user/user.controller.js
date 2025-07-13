const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

// 🔹 Register (only for email-password users)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Login (supports both email-password and Google)
exports.login = async (req, res) => {
  try {
    const { email, password, name, photo } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    let user = await User.findOne({ email });

    // ✅ Google login: user not found → create new Google user
    if (!user && (password === null || password === undefined)) {
      user = await User.create({
        email,
        name: name || 'Google User',
        photo: photo || '',
        isGoogleUser: true,
      });
    }

    // ✅ Google login: user found → skip password, return token
    if (password === null || password === undefined) {
      // Optionally update missing info
      if (!user.name && name) user.name = name;
      if (!user.photo && photo) user.photo = photo;
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ message: 'Login successful', token, user });
    }

    // ✅ Email/Password login
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get Profile (auth protected)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔹 Update Profile (auth protected)
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
