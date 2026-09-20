const Challenge = require('../models/Challenge');
const Project = require('../models/Project');

exports.getAnalyticsOverview = async (req, res) => {
  try {
    // Only Govt or Industry
    if (req.user.role !== 'government' && req.user.role !== 'industry') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const totalChallenges = await Challenge.countDocuments();
    const activeProjects = await Project.countDocuments({ stage: { $in: ['prototype', 'testing', 'pilot'] } });
    const deployedProjects = await Project.countDocuments({ stage: 'deployed' });

    res.status(200).json({
      success: true,
      data: {
        totalChallenges,
        activeProjects,
        deployedProjects,
        fundsDisbursed: 12500000 // Mock value for now
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
