import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as clubsAPI from '../../services/clubsAPI';
import * as authService from '../../services/authService';

export default function ClubDetailsPage({ user, setUser, setIsMember, isMember, club, setClub }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [readingList, setReadingList] = useState([]); // List of suggested books
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');

  useEffect(() => {
    async function getClubDetails() {
      const clubData = await clubsAPI.getById(id);
      console.log('hi');
      console.log(clubData);
      setClub(clubData);
      const user = await authService.getUser();
      console.log(user);
      if (user) {
        setIsMember(clubData.members.some(member => member._id === user._id));
      }
      // Fetch books for the club
      const books = await clubsAPI.getBooks(id);
      console.log(books);
      setReadingList(books);
    }
    getClubDetails();
  }, [id]);

  async function handleJoinClub() {
    await clubsAPI.joinClub(id, user._id);
    navigate(`/clubs/${id}/welcome`);
  }

  async function handleSuggestBook() {
    const newBook = { title: bookTitle, author: bookAuthor };
    await clubsAPI.suggestBook(id, newBook);
    setReadingList([...readingList, newBook]);
    setBookTitle(''); // Reset form input
    setBookAuthor(''); // Reset form input
  }

  if (!club) return <h2>Loading...</h2>;

  return (
    <div id="club-details-page">
      <div id="app-content">
        <h1>{club.name}</h1>
        <p>Manager: {club.owner ? club.owner.name : 'Unknown'}</p>
        <p>Members: {club.members ? club.members.length : 0}</p>

        {!isMember && (
          <button onClick={handleJoinClub} className="NavBar-button">
            Join Club
          </button>
        )}

        {isMember && (
          <>
            <h2>Reading List</h2>
            <ul>
              {readingList.map((book, index) => (
                <li key={index}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
            <h3>Suggest a Book</h3>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book Title"
            />
            <input
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Book Author"
            />
            <button onClick={handleSuggestBook} className="NavBar-button">
              Suggest Book
            </button>
          </>
        )}
      </div>
    </div>
  );
}