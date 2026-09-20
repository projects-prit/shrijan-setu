const mongoose = require('mongoose');

const StageHistorySchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: ['prototype', 'testing', 'pilot', 'deployed'],
    required: true
  },
  changed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changed_at: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const NoteSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  challenge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  hei_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  team_members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  stage: {
    type: String,
    enum: ['prototype', 'testing', 'pilot', 'deployed'],
    default: 'prototype'
  },
  stage_history: [StageHistorySchema],
  notes: [NoteSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Project', ProjectSchema);
