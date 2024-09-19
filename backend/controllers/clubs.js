const Club = require('../models/club');
const Book = require('../models/Book');

module.exports = {
  create,
  index,
  show,
  joinClub,
  leaveClub,
  delete: deleteClub, 
  suggestBook,
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
    // Populate 'owner', 'members', and 'readingList' fields
    const club = await Club.findById(req.params.id)
      .populate('owner')
      .populate('members')
      .populate({
        path: 'readingList',
        model: 'Book', // Populate the readingList with Book model data
      });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.json(club);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching club' });
  }
}


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

async function deleteClub(req, res) {
  try {
    const { id } = req.params;

    const club = await Club.findByIdAndDelete(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    res.status(200).json({ message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function suggestBook(req, res) {
  try {
    const { id } = req.params; // Club ID
    const { title, author } = req.body; // Book details

    // Create a new Book document
    const newBook = new Book({
      title,
      author,
      clubId: id,  
    });

    await newBook.save();

    // Add the new book to the club's readingList array
    const updatedClub = await Club.findByIdAndUpdate(
      id,
      { $push: { readingList: newBook._id } }, 
      { new: true }
    ).populate('readingList');  // Populate the readingList to return updated data

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function leaveClub(req, res) {
  try {
    const { id } = req.params; // Club ID from the URL
    const { userId } = req.body; // User ID

    // Find the club by ID
    const club = await Club.findById(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    // Remove the user from the club's members array
    club.members = club.members.filter(member => member.toString() !== userId);
    await club.save();

    res.status(200).json(club); // Return the updated club
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
