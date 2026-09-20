const express = require('express');
const { offerSupport, respondToOffer, getCollaborations } = require('../controllers/collaborationsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getCollaborations)
  .post(authorize('industry'), offerSupport);

router.route('/:id/respond')
  .patch(authorize('hei_coordinator'), respondToOffer);

module.exports = router;
