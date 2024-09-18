import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import './App.css';  
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import ClubIndexPage from '../ClubIndexPage/ClubIndexPage'; 
import ClubDetailsPage from '../ClubDetailsPage/ClubDetailsPage'; 
import ClubWelcomePage from '../ClubWelcomePage/ClubWelcomePage';
import GoodbyePage from '../GoodbyePage/GoodbyePage';

function App() {
  const [user, setUser] = useState(null); // Default to null to handle loading state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await getUser();
        setUser(loggedInUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Always set loading to false
      }
    };
    fetchUser();
  }, []);

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {loading ? (
            // Show loading message or spinner for routes that depend on user state
            <Route path="*" element={<div>Loading...</div>} />
          ) : user ? (
            // Authenticated routes
            <>
              <Route path="/clubs" element={<ClubIndexPage />} /> 
              <Route path="/clubs/:id" element={<ClubDetailsPage />} />
              <Route path="/clubs/:id/welcome" element={<ClubWelcomePage />} />
              <Route path="/clubs/goodbye" element={<GoodbyePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            // Unauthenticated routes
            <>
              <Route path="/login" element={<LogInPage setUser={setUser} />} />
              <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
              <Route path="/clubs" element={<Navigate to="/signup" />} />
              <Route path="/clubs/:id" element={<Navigate to="/signup" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </section>
    </main>
  );
}

export default App;
