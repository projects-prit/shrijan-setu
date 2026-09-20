const express = require('express');
const { getAllUsers, updateUserStatus, getVerifications, updateVerificationStatus } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All admin routes must be protected (and theoretically checked for admin role, 
// but for this demo we just use basic protection)
router.use(protect);

// User routes
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id/status')
  .put(updateUserStatus);

// Verification routes
router.route('/verifications')
  .get(getVerifications);

router.route('/verifications/:id')
  .put(updateVerificationStatus);

module.exports = router;
