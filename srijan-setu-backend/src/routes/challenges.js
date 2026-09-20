const express = require('express');
const { createChallenge, getChallenges, getChallenge, getCommunityChallenges } = require('../controllers/challengesController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(protect);

router.route('/')
  .post(authorize('citizen'), createChallenge)
  .get(getChallenges);

router.route('/community')
  .get(getCommunityChallenges);

router.route('/:id')
  .get(getChallenge);

module.exports = router;
