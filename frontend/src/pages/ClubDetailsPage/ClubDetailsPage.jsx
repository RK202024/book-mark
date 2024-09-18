import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as clubsAPI from '../../services/clubsAPI';
import * as authService from '../../services/authService';

export default function ClubDetailsPage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getClubDetails() {
      try {
        const clubData = await clubsAPI.getById(id);
        setClub(clubData);
        setBooks(clubData.books || []); // Initialize books state with the club's books
        const user = authService.getUser();
        if (user) {
          setIsMember(clubData.members.some(member => member._id === user._id));
          setIsManager(clubData.owner._id === user._id);
        }
      } catch (error) {
        console.error('Failed to fetch club details', error); // Log any errors
        setClub(null); // Stop loading state by setting club to null
      }
    }
    getClubDetails();
  }, [id]);

  async function handleJoin() {
    const user = authService.getUser();
    if (user) {
      await clubsAPI.joinClub(id, user._id);
      setIsMember(true);
      navigate(`/clubs/${id}/welcome`);
    }
  }

  async function handleDelete() {
    try {
      await clubsAPI.deleteClub(id);
      navigate('/clubs');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSuggestBook(evt) {
    evt.preventDefault();
    try {
      const suggestedBook = await clubsAPI.suggestBook(id, newBook);
      setBooks([...books, suggestedBook]); // Update the books state with the new book
      setNewBook({ title: '', author: '' }); // Clear the form
    } catch (error) {
      console.error('Failed to suggest book', error);
    }
  }

  function handleBookChange(evt) {
    const { name, value } = evt.target;
    setNewBook({ ...newBook, [name]: value });
  }

  if (club === null) return <h2>Unable to load club details. Please try again later.</h2>;
  if (!club) return <h2>Loading...</h2>;

  return (
    <div id="club-details-page"> 
      <div id="app-content">
        <h1>{club.name}</h1>
        <p>Manager: {club.owner ? club.owner.name : 'Unknown'}</p>
        <p>Members: {club.members ? club.members.length : 0}</p>
        <h2>Suggested Books</h2>
        <ul>
          {books.length ? books.map((book, index) => (
            <li key={index}>{book.title} by {book.author}</li>
          )) : <p>No books yet</p>}
        </ul>
        {isManager && (
          <form onSubmit={handleSuggestBook}>
            <h3>Suggest a Book</h3>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleBookChange}
                required
              />
            </label>
            <br />
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleBookChange}
                required
              />
            </label>
            <br />
            <button type="submit">Suggest Book</button>
          </form>
        )}
        {isMember ? (
          <button onClick={handleJoin}>Leave Club</button>
        ) : (
          <button onClick={handleJoin}>Join Club</button>
        )}
        {isManager && (
          <button onClick={handleDelete}>Delete Club</button>
        )}
      </div>
    </div>
  );
}
