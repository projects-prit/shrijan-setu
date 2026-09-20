const User = require('../models/User');

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profile: { ...req.user.profile, ...req.body.profile } },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
