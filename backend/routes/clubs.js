const express = require('express');
const router = express.Router();
const clubsCtrl = require('../controllers/clubs');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// POST /api/clubs/create
router.post('/create', ensureLoggedIn, clubsCtrl.create);

// GET all clubs
router.get('/', ensureLoggedIn, clubsCtrl.index);

// GET a specific club
router.get('/:id', ensureLoggedIn, clubsCtrl.show);

// POST to join a club
router.post('/:id/join', ensureLoggedIn, clubsCtrl.joinClub);

// POST to leave a club
router.post('/:id/leave', ensureLoggedIn, clubsCtrl.leaveClub);

// DELETE a club
router.delete('/:id', ensureLoggedIn, clubsCtrl.delete);

// POST to suggest a book for a club
router.post('/:id/suggest', ensureLoggedIn, clubsCtrl.suggestBook);

// GET books for a specific club
router.get('/:id/books', ensureLoggedIn, async (req, res) => {
  try {
    const books = await Book.find({ clubId: req.params.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
