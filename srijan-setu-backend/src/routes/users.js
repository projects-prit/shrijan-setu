const express = require('express');
const { getMe, updateMe } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/me')
  .get(getMe)
  .put(updateMe);

module.exports = router;
