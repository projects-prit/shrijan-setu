const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['University', 'College', 'Research Institute', 'Other'],
    required: true
  },
  region: {
    type: String,
    required: true
  },
  expertise_domains: {
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

module.exports = mongoose.model('Institution', InstitutionSchema);
