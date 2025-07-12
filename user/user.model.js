const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    university: { type: String },
    address: { type: String },
    isAdmin: { type: Boolean, default: false }, // <-- Add this line
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
