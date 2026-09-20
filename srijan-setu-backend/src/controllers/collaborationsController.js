const Collaboration = require('../models/Collaboration');
const Project = require('../models/Project');
const AuditLog = require('../models/AuditLog');
const Notification = require('../models/Notification');

exports.offerSupport = async (req, res) => {
  try {
    const { project_id, support_type, pledge_amount } = req.body;
    
    // Only Industry can offer support
    if (req.user.role !== 'industry') {
      return res.status(403).json({ success: false, message: 'Only Industry/CSR partners can offer support' });
    }

    if (!req.user.profile || !req.user.profile.organization_id) {
      return res.status(403).json({ success: false, message: 'Organization ID missing in profile' });
    }

    const project = await Project.findById(project_id).populate('challenge_id hei_id');
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const collab = await Collaboration.create({
      project_id,
      organization_id: req.user.profile.organization_id,
      support_type,
      pledge_amount,
      status: 'pending' // Industry member proposes, or auto-pending for HEI to accept
    });

    await AuditLog.create({
      user_id: req.user._id,
      action: 'COLLABORATION_OFFERED',
      target_type: 'Collaboration',
      target_id: collab._id,
      ip_address: req.ip
    });

    res.status(201).json({ success: true, data: collab });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.respondToOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'active' or 'rejected'
    
    // Only HEI can respond
    if (req.user.role !== 'hei_coordinator') {
      return res.status(403).json({ success: false, message: 'Only HEI Coordinators can respond to offers' });
    }

    const collab = await Collaboration.findById(id).populate('project_id');
    if (!collab) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }

    // Verify it's their project
    if (collab.project_id.hei_id.toString() !== req.user.profile.institution_id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized for this project' });
    }

    collab.status = status;
    await collab.save();

    await AuditLog.create({
      user_id: req.user._id,
      action: `COLLABORATION_${status.toUpperCase()}`,
      target_type: 'Collaboration',
      target_id: collab._id,
      ip_address: req.ip
    });

    res.status(200).json({ success: true, data: collab });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCollaborations = async (req, res) => {
  try {
    let collabs = [];
    if (req.user.role === 'hei_coordinator' || req.user.role === 'hei_member') {
      // Find projects for this HEI
      const projects = await Project.find({ hei_id: req.user.profile.institution_id });
      const projectIds = projects.map(p => p._id);
      
      collabs = await Collaboration.find({ project_id: { $in: projectIds } })
        .populate({
          path: 'organization_id',
          select: 'profile.name' // assuming User model has this structure
        })
        .populate('project_id');
    } else if (req.user.role === 'industry') {
      collabs = await Collaboration.find({ organization_id: req.user.profile.organization_id })
        .populate({
          path: 'project_id',
          populate: [
            { path: 'challenge_id' },
            { path: 'hei_id' }
          ]
        });
    }
    
    res.status(200).json({ success: true, data: collabs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
