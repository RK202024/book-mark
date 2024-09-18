import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as clubsAPI from '../../services/clubsAPI';

export default function ClubDetailsPage() {
  const { id } = useParams(); // Get the club ID from the URL
  const [club, setClub] = useState(null);

  // Fetch the club details when the page loads
  useEffect(() => {
    async function getClubDetails() {
      const club = await clubsAPI.getById(id); // Fetch club details by ID
      setClub(club);
    }
    getClubDetails();
  }, [id]);

  if (!club) return <h2>Loading...</h2>; // Show loading message while data is fetched

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
      </div>
    </div>
  );
}
