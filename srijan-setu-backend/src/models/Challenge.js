const mongoose = require('mongoose');

const MatchedInstitutionSchema = new mongoose.Schema({
  institution_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  match_score: {
    type: Number,
    required: true
  }
}, { _id: false });

const ChallengeSchema = new mongoose.Schema({
  tracking_id: {
    type: String,
    required: true,
    unique: true
  },
  submitted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  priority_score: {
    type: Number,
    default: 0
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [85.3096, 23.3441] // Default coordinates (Ranchi, Jharkhand)
    }
  },
  address: {
    type: String,
    default: ''
  },
  district: {
    type: String,
    default: 'Khunti'
  },
  media: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['submitted', 'matched', 'prototype', 'testing', 'pilot', 'deployed'],
    default: 'submitted'
  },
  duplicate_of: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    default: null
  },
  ai_verification: {
    verified: { type: Boolean, default: false },
    confidence_score: { type: Number, default: 0 },
    category_detected: { type: String, default: '' },
    summary: { type: String, default: '' },
    moderation_status: { type: String, default: 'approved' }
  },
  matched_institutions: [MatchedInstitutionSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Index for geospatial queries
ChallengeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Challenge', ChallengeSchema);
