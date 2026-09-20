const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  csr_focus_tags: {
    type: [String],
    default: []
  },
  verification_status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Organization', OrganizationSchema);
