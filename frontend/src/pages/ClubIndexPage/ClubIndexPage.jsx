import React from 'react';
import { useState, useEffect } from 'react';
import CreateClubForm from '../../components/CreateClubForm/CreateClubForm';
import * as clubsAPI from '../../services/clubsAPI';
import { Link } from 'react-router-dom';

export default function ClubIndexPage() {
  const [clubs, setClubs] = useState([]);
  const [sortBy, setSortBy] = useState('name'); 

  // Fetch all clubs when the component first renders
  useEffect(() => {
    async function getClubs() {
      try {
        const clubs = await clubsAPI.getAll(); // Fetch the list of clubs
        setClubs(clubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    }
    getClubs();
  }, []); // Empty array ensures this runs only once on mount

  // Sort clubs based on selected sorting option
  function sortClubs(clubs, sortBy) {
    if (sortBy === 'name') {
      return [...clubs].sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
    } else if (sortBy === 'recent') {
      return [...clubs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by most recently created
    }
    return clubs;
  }

  async function handleAddClub(clubData) {
    const newClub = await clubsAPI.add(clubData); 
    setClubs([...clubs, newClub]); 
  }

  function handleSortChange(evt) {
    setSortBy(evt.target.value); // Update the sortBy state when the user selects a sorting option
  }

  return (
    <div id="club-index-page">
      <h1>Club Index</h1>
      <CreateClubForm handleAddClub={handleAddClub} />
      <div id="app-content"> 
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="recent">Most Recently Created</option>
        </select>
      </div>
      <ul>
        {sortClubs(clubs, sortBy).map((club) => (
          <li key={club._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="club-name">{club.name}</span> 
            <Link to={`/clubs/${club._id}`}>
              <button>View Details</button> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
