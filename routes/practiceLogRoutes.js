const express = require('express');
const router = express.Router();
const logController = require('../controllers/practiceLogController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticated, logController.index);
router.get('/new', ensureAuthenticated, logController.newForm);
router.post('/', ensureAuthenticated, logController.create);
router.get('/:id/edit', ensureAuthenticated, logController.editForm);
router.put('/:id', ensureAuthenticated, logController.update);
router.delete('/:id', ensureAuthenticated, logController.delete);

module.exports = router;