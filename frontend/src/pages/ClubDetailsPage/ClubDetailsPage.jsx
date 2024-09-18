import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as clubsAPI from '../../services/clubsAPI';
import * as authService from '../../services/authService';

export default function ClubDetailsPage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getClubDetails() {
      const club = await clubsAPI.getById(id);
      setClub(club);
      const user = authService.getUser();
      if (user) {
        setIsMember(club.members.some(member => member._id === user._id));
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

  if (!club) return <h2>Loading...</h2>;

  return (
    <div id="club-index-page"> 
      <div id="app-content">
        <h1>{club.name}</h1>
        <p>Owner: {club.owner ? club.owner.name : 'Unknown'}</p>
        <p>Members: {club.members ? club.members.length : 0}</p>
        <ul>
          {club.members.map((member) => (
            <li key={member._id}>{member.name}</li>
          ))}
        </ul>
        {!isMember && (
          <button onClick={handleJoin}>Join Club</button>
        )}
      </div>
    </div>
  );
}
