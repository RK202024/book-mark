import { useLocation, useNavigate } from 'react-router-dom'; 
import * as authService from '../../services/authService';
import './NavBar.css';
import * as clubsAPI from '../../services/clubsAPI';

export default function NavBar({ user, setUser, isMember, club, setClub, setIsMember}) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogOut() {
    authService.logOut();
    setUser(null);
    navigate('/'); 
  }

  function handleLeaveClub() {
    const updatedClub = clubsAPI.leaveClub( club._id, user._id );
   
    setIsMember(false);
  
    setClub(updatedClub);

    navigate('/clubs/goodbye'); // Navigate to GoodbyePage
  }

  function handleDeleteClub() {
    const deletedClub = clubsAPI.deleteClub( club._id );
   
    setIsMember(false);
  
    setClub(null);

    navigate('/clubs'); // Navigate to GoodbyePage
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

      <div className="nav-center">
        {user && (user._id === club?.owner?._id) && (
          <>
            <button onClick={handleDeleteClub} className="NavBar-button">
              Delete Club
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

