import { useLocation, useNavigate } from 'react-router-dom'; 
import * as authService from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser, isMember, handleLeaveClub }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogOut() {
    authService.logOut();
    setUser(null);
    navigate('/'); 
  }

  function handleLeaveClub() {
    navigate('/clubs/goodbye'); // Navigate to GoodbyePage
  }

  // Hide the NavBar on the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="NavBar">
      <div className="nav-left">
        {user && (
          <>
            <button onClick={handleLogOut} className="NavBar-button">
              Log Out
            </button>
          </>
        )}
      </div>

      <div className="nav-right">
        {isMember && (
          <>
            <button onClick={handleLeaveClub} className="NavBar-button">
              Leave Club
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
