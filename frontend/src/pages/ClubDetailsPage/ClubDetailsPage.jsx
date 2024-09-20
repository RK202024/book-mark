import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as clubsAPI from "../../services/clubsAPI";
import * as authService from "../../services/authService";

export default function ClubDetailsPage({
  user,
  setUser,
  setIsMember,
  isMember,
  club,
  setClub,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [readingList, setReadingList] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  useEffect(() => {
    async function getClubDetails() {
      const clubData = await clubsAPI.getById(id);
      setClub(clubData);
      const user = await authService.getUser();
      if (user) {
        setIsMember(clubData.members.some((member) => member._id === user._id));
      }
      // Fetch books for the club
      const books = await clubsAPI.getBooks(id);
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
    setBookTitle("");
    setBookAuthor("");
  }

  if (!club) return <h2>Loading...</h2>;

  const isOwner = club.owner && user && club.owner._id === user._id;

  return (
    <div id="club-details-page">
      <div id="app-content" style={{ marginTop: "-200px" }}>
        <h1 id="club-index-title">{club.name}</h1>
        <p className="manager-members-center">
          <strong>Manager:</strong> {club.owner ? club.owner.name : "Unknown"} /
          <strong> Members:</strong> {club.members ? club.members.length : 0}
        </p>

        {!isMember && !isOwner && (
          <button onClick={handleJoinClub} className="NavBar-button">
            Join Club
          </button>
        )}

        {isMember && (
          <>
            <h2 style={{ textDecoration: "underline" }}>Reading List</h2>
            <ul className="reading-list">
              {readingList.map((book, index) => (
                <li key={index}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>

            <h3>Suggest a Book</h3>
            <input
              type="text"
              className="book-input"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book Title"
            />
            <input
              type="text"
              className="book-input"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Book Author"
            />
            <button onClick={handleSuggestBook} className="suggest-book-button">
              Suggest Book
            </button>
          </>
        )}
      </div>
    </div>
  );
}
