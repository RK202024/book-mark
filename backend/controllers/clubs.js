const Club = require('../models/club');

module.exports = {
  create,
  index,
  show,
};

async function create(req, res) {
  try {
    const club = await Club.create({ ...req.body, owner: req.user._id });
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ message: 'Error creating club' });
  }
}

async function index(req, res) {
    try {
      const clubs = await Club.find({}); // Fetch all clubs from the database
      res.json(clubs); // Send back the list of clubs as JSON
    } catch (err) {
      res.status(400).json({ message: 'Error fetching clubs' });
    }
  }

  // Fetch a single club by ID
async function show(req, res) {
    try {
      const club = await Club.findById(req.params.id).populate('owner members'); // Populate related fields
      res.json(club);
    } catch (err) {
      res.status(400).json({ message: 'Error fetching club' });
    }
  }