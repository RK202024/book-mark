const Club = require('../models/club');

module.exports = {
  create,
  index,
  show,
  joinClub, 
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
    res.json(clubs); 
  } catch (err) {
    res.status(400).json({ message: 'Error fetching clubs' });
  }
}

async function show(req, res) {
  try {
    const club = await Club.findById(req.params.id).populate('owner members'); 
    res.json(club);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching club' });
  }
}

// Function to handle joining a club
async function joinClub(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body; 

    // Find the club by ID
    const club = await Club.findById(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    // Add user to the club's members array if not already a member
    if (!club.members.includes(userId)) {
      club.members.push(userId);
      await club.save();
    }

    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
