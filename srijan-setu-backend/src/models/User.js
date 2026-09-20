const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  phone: {
    type: String,
    unique: true,
    sparse: true
  },
  password_hash: {
    type: String,
    required: true,
    select: false // Do not return by default
  },
  role: {
    type: String,
    enum: ['citizen', 'hei_coordinator', 'hei_member', 'industry', 'government', 'admin'],
    required: true
  },
  sub_role: {
    type: String,
    enum: ['gov_viewer', 'gov_editor', 'gov_admin', 'org_admin', 'org_member', null],
    default: null
  },
  status: {
    type: String,
    enum: ['pending_verification', 'active', 'suspended'],
    default: 'active'
  },
  profile: {
    type: mongoose.Schema.Types.Mixed
    // Will contain role-specific data:
    // citizen: name, ward, district, preferred_language
    // hei_coordinator/member: institution_id (ref), department, expertise_tags[]
    // industry: organization_id (ref), sector, csr_focus_tags[]
    // government: department, jurisdiction/region
  },
  is_email_verified: {
    type: Boolean,
    default: false
  },
  is_phone_verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', UserSchema);
