const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  action: {
    type: String,
    required: true
  },
  target_type: {
    type: String
  },
  target_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  ip_address: {
    type: String
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
