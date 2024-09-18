import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as clubsAPI from '../../services/clubsAPI';
import * as authService from '../../services/authService';

export default function ClubDetailsPage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getClubDetails() {
      const club = await clubsAPI.getById(id);
      setClub(club);
      const user = authService.getUser();
      if (user) {
        setIsMember(club.members.some(member => member._id === user._id));
        setIsManager(club.owner._id === user._id); // Determine if the user is the manager
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
      navigate('/clubs'); // Navigate back to the Club Index Page
    } catch (error) {
      console.error('Error deleting club:', error); // ERASE console log
    }
  }

  if (!club) return <h2>Loading...</h2>;

  return (
    <div id="club-details-page"> 
      <div id="app-content">
        <h1>{club.name}</h1>
        <p>Manager: {club.owner ? club.owner.name : 'Unknown'}</p> 
        <p>Members: {club.members ? club.members.length : 0}</p>
        <ul>
          {club.members.map((member) => (
            <li key={member._id}>{member.name}</li>
          ))}
        </ul>
        {!isMember && (
          <button onClick={handleJoin}>Join Club</button>
        )}
        {isManager && (
          <button onClick={handleDelete}>Delete Club</button> 
        )}
      </div>
    </div>
  );
}
