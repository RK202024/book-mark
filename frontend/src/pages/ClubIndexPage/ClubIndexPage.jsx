import React, { useState, useEffect } from 'react';
import CreateClubForm from '../../components/CreateClubForm/CreateClubForm';
import * as clubsAPI from '../../services/clubsAPI';
import { Link } from 'react-router-dom';

export default function ClubIndexPage() {
  const [clubs, setClubs] = useState([]);
  const [sortBy, setSortBy] = useState('name'); 

  useEffect(() => {
    async function getClubs() {
      try {
        const clubs = await clubsAPI.getAll(); 
        setClubs(clubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    }
    getClubs();
  }, []);

  function sortClubs(clubs, sortBy) {
    if (sortBy === 'name') {
      return [...clubs].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'recent') {
      return [...clubs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return clubs;
  }

  async function handleAddClub(clubData) {
    const newClub = await clubsAPI.add(clubData); 
    setClubs([...clubs, newClub]); 
  }

  function handleSortChange(evt) {
    setSortBy(evt.target.value); 
  }

  return (
    <div id="club-index-page">
      <h1 id="club-index-title">Club Index</h1> 
      <div id="app-content"> 
        <div className="sort-container">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="recent">Most Recently Created</option>
          </select>
        </div>
      </div>
      <ul className="club-list">
        {sortClubs(clubs, sortBy).map((club) => (
          <li key={club._id} className="club-item">
            <span className="club-name">{club.name}</span> 
            <Link to={`/clubs/${club._id}`}>
              <button>View Details</button> 
            </Link>
          </li>
        ))}
      </ul>
      
      <CreateClubForm handleAddClub={handleAddClub} />
    </div>
  );
}
