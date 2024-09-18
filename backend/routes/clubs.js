const express = require('express');
const router = express.Router();
const clubsCtrl = require('../controllers/clubs');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// POST /api/clubs/create
router.post('/create', ensureLoggedIn, clubsCtrl.create);
router.get('/', ensureLoggedIn, clubsCtrl.index);
router.get('/:id', ensureLoggedIn, clubsCtrl.show);
router.post('/:id/join', ensureLoggedIn, clubsCtrl.joinClub);
router.delete('/:id', ensureLoggedIn, clubsCtrl.delete);

// POST /api/clubs/:id/books/suggest
router.post('/:id/books/suggest', ensureLoggedIn, clubsCtrl.suggestBook);

module.exports = router;
