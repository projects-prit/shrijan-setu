const Project = require('../models/Project');
const Challenge = require('../models/Challenge');
const AuditLog = require('../models/AuditLog');
const Notification = require('../models/Notification');

exports.acceptChallenge = async (req, res) => {
  try {
    const { challenge_id } = req.params;
    
    // Check if user is hei_coordinator
    if (req.user.role !== 'hei_coordinator') {
      return res.status(403).json({ success: false, message: 'Only HEI Coordinators can accept challenges' });
    }

    const challenge = await Challenge.findById(challenge_id);
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    // Verify it's matched to this institution
    if (!challenge.matched_institutions.some(m => m.institution_id.toString() === req.user.profile.institution_id.toString())) {
      return res.status(403).json({ success: false, message: 'Challenge not matched to your institution' });
    }

    // Create the project
    const project = await Project.create({
      challenge_id: challenge._id,
      hei_id: req.user.profile.institution_id,
      team_members: [req.user._id],
      stage: 'prototype',
      stage_history: [{
        stage: 'prototype',
        changed_by: req.user._id
      }]
    });

    // Update challenge status
    challenge.status = 'prototype';
    await challenge.save();

    // Create Audit Log
    await AuditLog.create({
      user_id: req.user._id,
      action: 'CHALLENGE_ACCEPTED',
      target_type: 'Project',
      target_id: project._id,
      ip_address: req.ip
    });

    // Notify citizen
    await Notification.create({
      user_id: challenge.submitted_by,
      type: 'report',
      message: `Your challenge "${challenge.title}" has been accepted by an institution!`
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;
    
    const project = await Project.findById(id).populate('challenge_id');
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Verify authorization
    if (req.user.role === 'hei_coordinator' || req.user.role === 'hei_member') {
      if (project.hei_id.toString() !== req.user.profile.institution_id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized for this project' });
      }
    } else if (req.user.sub_role !== 'gov_admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update project stage' });
    }

    project.stage = stage;
    project.stage_history.push({
      stage,
      changed_by: req.user._id
    });
    
    await project.save();

    // Update challenge status
    if (project.challenge_id) {
      project.challenge_id.status = stage;
      await project.challenge_id.save();
      
      // Notify citizen
      await Notification.create({
        user_id: project.challenge_id.submitted_by,
        type: 'report',
        message: `Your report status changed to "${stage}"!`
      });
    }

    await AuditLog.create({
      user_id: req.user._id,
      action: 'PROJECT_STAGE_UPDATED',
      target_type: 'Project',
      target_id: project._id,
      ip_address: req.ip
    });

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'hei_coordinator' || req.user.role === 'hei_member') {
      query.hei_id = req.user.profile.institution_id;
    } else if (req.user.role === 'industry' || req.user.role === 'government') {
      // Industry and Government can see all projects
      // Could add filters here if needed
    }

    const projects = await Project.find(query).populate('challenge_id').sort('-created_at');
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
