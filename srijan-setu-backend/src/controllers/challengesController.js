const mongoose = require('mongoose');
const Challenge = require('../models/Challenge');
const AuditLog = require('../models/AuditLog');
const aiService = require('../services/aiService');

exports.createChallenge = async (req, res) => {
  try {
    const { title, description, category, location, district, media, coordinates } = req.body;

    // Handle flexible location formats (string or GeoJSON coordinates)
    let geoCoordinates = [85.3096, 23.3441]; // Default Ranchi, Jharkhand
    let addressStr = '';

    if (typeof location === 'string') {
      addressStr = location;
    } else if (location && typeof location === 'object') {
      if (Array.isArray(location.coordinates) && location.coordinates.length === 2) {
        geoCoordinates = location.coordinates;
      }
      if (location.address) addressStr = location.address;
    }

    if (Array.isArray(coordinates) && coordinates.length === 2) {
      geoCoordinates = coordinates;
    }

    const assignedDistrict = district || req.user?.profile?.district || 'Khunti';
    const computedTitle = title || (description ? description.substring(0, 45) + '...' : 'Community Challenge');

    const challenge = await Challenge.create({
      tracking_id: `JH-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      submitted_by: req.user?._id || new mongoose.Types.ObjectId(),
      title: computedTitle,
      description: description || '',
      category: category || 'Civic Infrastructure',
      location: {
        type: 'Point',
        coordinates: geoCoordinates
      },
      address: addressStr || `${assignedDistrict}, Jharkhand`,
      district: assignedDistrict,
      media: Array.isArray(media) ? media : (media ? [media] : []),
      status: 'submitted',
      priority_score: 75
    });

    // Run AI analysis & matching immediately so caller receives enriched response
    try {
      await aiService.processChallengeWithAI(challenge._id);
    } catch (aiErr) {
      console.warn('[AI Service Warning]', aiErr.message);
    }

    const populatedChallenge = await Challenge.findById(challenge._id)
      .populate('submitted_by', 'profile.name profile.district')
      .populate('matched_institutions.institution_id', 'name region expertise_domains');

    try {
      await AuditLog.create({
        user_id: req.user?._id || challenge.submitted_by,
        action: 'CHALLENGE_CREATED',
        target_type: 'Challenge',
        target_id: challenge._id,
        ip_address: req.ip
      });
    } catch (auditErr) {
      // Non-fatal
    }

    res.status(201).json({ success: true, data: populatedChallenge || challenge });
  } catch (err) {
    console.error('Error in createChallenge:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getChallenges = async (req, res) => {
  try {
    const { role, profile } = req.user || {};
    let query = {};

    if (role === 'citizen') {
      // Citizen sees their own submitted challenges
      query.submitted_by = req.user._id;
    } else if (role === 'hei_coordinator' || role === 'hei_member') {
      // HEI sees challenges matched with their institution
      if (profile && profile.institution_id) {
        query = { 'matched_institutions.institution_id': profile.institution_id };
        const matchedCount = await Challenge.countDocuments(query);
        // If no challenges are specifically matched yet, show all active challenges so HEI can explore
        if (matchedCount === 0) {
          query = {};
        }
      } else {
        query = {};
      }
    }
    // Government and admin see all challenges

    const challenges = await Challenge.find(query)
      .populate('submitted_by', 'profile.name profile.district')
      .populate('matched_institutions.institution_id', 'name region expertise_domains')
      .sort('-created_at');

    res.status(200).json({ success: true, data: challenges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('submitted_by', 'profile.name profile.district')
      .populate('matched_institutions.institution_id', 'name region expertise_domains');

    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    res.status(200).json({ success: true, data: challenge });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCommunityChallenges = async (req, res) => {
  try {
    // Return challenges for the public community feed (deployed or active)
    const challenges = await Challenge.find({ status: { $in: ['deployed', 'pilot', 'testing', 'matched'] } })
      .populate('submitted_by', 'profile.name profile.district')
      .populate('matched_institutions.institution_id', 'name region')
      .sort('-updated_at')
      .limit(30);
      
    res.status(200).json({ success: true, data: challenges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
