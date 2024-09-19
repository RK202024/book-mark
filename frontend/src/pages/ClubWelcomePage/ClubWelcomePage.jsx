import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as clubsAPI from '../../services/clubsAPI';
import * as authService from '../../services/authService';

export default function ClubWelcomePage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getClubDetails() {
      const club = await clubsAPI.getById(id);
      setClub(club);
    }
    async function getCurrentUser() {
      const currentUser = authService.getUser();
      setUser(currentUser);
    }
    getClubDetails();
    getCurrentUser();
  }, [id]);

  if (!club || !user) return <h2>Loading...</h2>;

  function handleReadingList() {
    navigate(`/clubs/${id}`);
  }

  return (
    <div id="club-welcome-page">
      <h1>Welcome to the {club.name}, {user.name}!</h1>
      <p>We are excited to read with you! Enjoy your time here!</p>

      <button onClick={handleReadingList} className="reading-list-button">
        View Reading List
      </button>
    </div>
  );
}
