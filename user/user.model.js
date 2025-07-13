const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false }, 
    university: { type: String },
    address: { type: String },
    photo: { type: String }, 
    isGoogleUser: { type: Boolean, default: false }, 
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
