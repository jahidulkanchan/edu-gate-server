const { default: mongoose } = require("mongoose");

const admissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  candidateName: { type: String }, // optional
  subject: { type: String }, // optional
  candidateEmail: { type: String }, // optional
  candidatePhone: { type: String }, // optional
  address: { type: String },
  dateOfBirth: { type: Date },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;  
