const verifyAdmin = require('../middlewares/verifyAdmin');
const Admission = require('./admission.model');


module.exports.getPendingAdmissions = [
  verifyAdmin,
  async (req, res) => {
    try {
      const pending = await Admission.find({ isApproved: false }).populate('collegeId userId');
      res.status(200).json(pending);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch pending admissions.', error: error.message });
    }
  },
];
module.exports.getAdmissionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const admissions = await Admission.find({ userId });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch admission data.' });
  }
};
exports.addAdmission = async (req, res) => {
  try {
    // req.body থেকে ডাটা নাও
    const admissionData = {
      ...req.body,
      userId: req.user.id, // verifyToken থেকে ইউজারের আইডি নাও
    };

    const newAdmission = new Admission(admissionData);
    await newAdmission.save();

    res.status(201).json({ message: 'Admission submitted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit admission.', error: err.message });
  }
};
module.exports.updateAdmission = [
  verifyAdmin,
  async (req, res) => {
    try {
      const admissionId = req.params.id;

      const updatedAdmission = await Admission.findByIdAndUpdate(admissionId, { $set: req.body }, { new: true });

      if (!updatedAdmission) {
        return res.status(404).json({ message: 'Admission not found.' });
      }

      res.status(200).json({ message: 'Admission updated successfully.', admission: updatedAdmission });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update admission.', error: error.message });
    }
  },
];
