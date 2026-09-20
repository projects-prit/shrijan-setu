const mongoose = require('mongoose');

const ContributionLogSchema = new mongoose.Schema({
  amount: Number,
  note: String,
  logged_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  logged_at: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const CollaborationSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  support_type: {
    type: String,
    enum: ['mentoring', 'funding', 'technical'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'withdrawn'],
    default: 'pending'
  },
  pledge_amount: {
    type: Number,
    default: null
  },
  contribution_log: [ContributionLogSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Collaboration', CollaborationSchema);
