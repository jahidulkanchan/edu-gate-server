const Admission = require('./admission.model');



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
