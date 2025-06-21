const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', lessonController.index);
router.get('/new', ensureAuthenticated, lessonController.newForm);
router.post('/', ensureAuthenticated, lessonController.create);
router.get('/:id', lessonController.show);
router.get('/:id/edit', ensureAuthenticated, lessonController.editForm);
router.put('/:id', ensureAuthenticated, lessonController.update);
router.delete('/:id', ensureAuthenticated, lessonController.delete);

module.exports = router;
