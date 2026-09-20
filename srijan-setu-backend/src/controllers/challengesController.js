const Challenge = require('../models/Challenge');
const AuditLog = require('../models/AuditLog');
const aiService = require('../services/aiService');

exports.createChallenge = async (req, res) => {
  try {
    const { title, description, category, location, district, media } = req.body;

    const challenge = await Challenge.create({
      tracking_id: `SS-${Math.floor(1000 + Math.random() * 9000)}`, // Simple generator
      submitted_by: req.user._id,
      title,
      description,
      category,
      location,
      district,
      media,
      status: 'submitted'
    });

    // Trigger AI async job to categorize and match institutions
    // This runs in the background so the user gets an immediate response
    aiService.processChallengeWithAI(challenge._id);

    await AuditLog.create({
      user_id: req.user._id,
      action: 'CHALLENGE_CREATED',
      target_type: 'Challenge',
      target_id: challenge._id,
      ip_address: req.ip
    });

    res.status(201).json({ success: true, data: challenge });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getChallenges = async (req, res) => {
  try {
    const { role, profile } = req.user;
    let query = {};

    if (role === 'citizen') {
      // Citizen only sees their own
      query.submitted_by = req.user._id;
    } else if (role === 'hei_coordinator' || role === 'hei_member') {
      // HEI sees only matched challenges
      if (!profile || !profile.institution_id) {
         return res.status(403).json({ success: false, message: 'Institution ID missing in profile' });
      }
      query = { 'matched_institutions.institution_id': profile.institution_id };
    }
    // Government and admin can see all by default, so query remains {}

    const challenges = await Challenge.find(query).populate('submitted_by', 'profile.name');
    res.status(200).json({ success: true, data: challenges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    // RBAC visibility checks
    if (req.user.role === 'citizen' && challenge.submitted_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this challenge' });
    }
    if ((req.user.role === 'hei_coordinator' || req.user.role === 'hei_member') && 
        !challenge.matched_institutions.some(m => m.institution_id.toString() === req.user.profile.institution_id.toString())) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this challenge' });
    }

    res.status(200).json({ success: true, data: challenge });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCommunityChallenges = async (req, res) => {
  try {
    // Return all deployed challenges for the public community feed
    const challenges = await Challenge.find({ status: 'deployed' })
      .populate('submitted_by', 'profile.name')
      .sort('-updated_at')
      .limit(20);
      
    res.status(200).json({ success: true, data: challenges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
