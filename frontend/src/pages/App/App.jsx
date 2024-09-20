import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import ClubIndexPage from "../ClubIndexPage/ClubIndexPage";
import ClubDetailsPage from "../ClubDetailsPage/ClubDetailsPage";
import ClubWelcomePage from "../ClubWelcomePage/ClubWelcomePage";
import GoodbyePage from "../GoodbyePage/GoodbyePage";

function App() {
  const [user, setUser] = useState(getUser()); // Initialize with getUser directly
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    setUser(getUser()); // Set the user on component mount
  }, []);

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} setIsMember={setIsMember} isMember={isMember} setClub={setClub} club={club} />
      <section id="main-section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {user ? (
            // Authenticated routes
            <>
              <Route path="/clubs" element={<ClubIndexPage />} />
              <Route
                path="/clubs/:id"
                element={
                  <ClubDetailsPage
                    user={user}
                    setUser={setUser}
                    setIsMember={setIsMember}
                    isMember={isMember}
                    setClub={setClub}
                    club={club}
                  />
                }
              />
              <Route path="/clubs/:id/welcome" element={<ClubWelcomePage />} />
              <Route path="/clubs/goodbye" element={<GoodbyePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            // Unauthenticated routes
            <>
              <Route path="/login" element={<LogInPage setUser={setUser} />} />
              <Route
                path="/signup"
                element={<SignUpPage setUser={setUser} />}
              />
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
