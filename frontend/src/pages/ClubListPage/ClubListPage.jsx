import { useState, useEffect } from 'react';
import CreateClubForm from '../../components/CreateClubForm/CreateClubForm';
import * as clubsAPI from '../../services/clubsAPI';

export default function ClubListPage() {
  const [clubs, setClubs] = useState([]);

  // Fetch all clubs when the component first renders
  useEffect(() => {
    async function getClubs() {
      const clubs = await clubsAPI.getAll(); // Fetch the list of clubs
      setClubs(clubs);
    }
    getClubs();
  }, []); // Empty array ensures this runs only once on mount

  // Update this function to handle adding a new club and updating the list
  async function handleAddClub(clubData) {
    const newClub = await clubsAPI.add(clubData); // Add new club via API
    setClubs([...clubs, newClub]); // Update state to include the new club
  }

  return (
    <div>
      <h1>Club List</h1>

      {/* Render the form to create a new club */}
      <CreateClubForm handleAddClub={handleAddClub} />

      {/* Add list of clubs */}
      <ul>
        {clubs.map((club) => (
          <li key={club._id}>
            {club.name}
            {/* add "Club Details" link/button here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
