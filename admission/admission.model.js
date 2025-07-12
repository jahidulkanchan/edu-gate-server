const { default: mongoose } = require("mongoose");

const admissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  candidateName: { type: String, required: true },
  subject: { type: String },
  candidateEmail: { type: String, required: true },
  candidatePhone: { type: String, required: true },
  address: { type: String },
  dateOfBirth: { type: Date, required: true },
  imageUrl: { type: String },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;  
