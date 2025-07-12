const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String }, // কলেজের ছবি URL (optional)
  admissionDates: { type: String }, // যেমন: "Jan 1 - March 31"
  events: [{ type: String }], // ইভেন্ট লিস্ট
  researchHistory: { type: String }, // রিসার্চ সম্পর্কে বিস্তারিত
  sports: [{ type: String }], // স্পোর্টস লিস্ট
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('College', collegeSchema);
