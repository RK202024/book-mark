const express = require('express');
const router = express.Router();
const clubsCtrl = require('../controllers/clubs');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// POST /api/clubs/create
router.post('/create', ensureLoggedIn, clubsCtrl.create);
router.get('/', ensureLoggedIn, clubsCtrl.index);

module.exports = router;
