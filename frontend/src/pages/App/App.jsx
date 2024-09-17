import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import ClubListPage from '../ClubListPage/ClubListPage';
import ClubDetailsPage from '../ClubDetailsPage/ClubDetailsPage'; 

function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const loggedInUser = getUser();
    console.log('User from authService:', loggedInUser); 
    setUser(loggedInUser);
  }, []);

  console.log('Current user state:', user); 

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clubs" element={<ClubListPage />} />
            <Route path="/clubs/:id" element={<ClubDetailsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            {/* Redirect to login page if not authenticated */}
            <Route path="/clubs" element={<Navigate to="/login" />} />
            <Route path="/clubs/:id" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;
