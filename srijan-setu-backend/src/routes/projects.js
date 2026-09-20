const express = require('express');
const { acceptChallenge, updateStage, getProjects } = require('../controllers/projectsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProjects);

router.route('/:challenge_id/accept')
  .post(authorize('hei_coordinator'), acceptChallenge);

router.route('/:id/stage')
  .patch(authorize('hei_coordinator', 'hei_member', 'government'), updateStage);

module.exports = router;
