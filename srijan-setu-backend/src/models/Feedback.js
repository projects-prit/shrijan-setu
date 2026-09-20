const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  citizen_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
