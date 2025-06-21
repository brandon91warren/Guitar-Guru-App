const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('dashboard/index', { user: req.user });
});

module.exports = router;
