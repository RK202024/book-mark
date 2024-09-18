const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get books for a specific club
router.get('/:clubId', async (req, res) => {
  try {
    const books = await Book.find({ clubId: req.params.clubId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    clubId: req.body.clubId
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
