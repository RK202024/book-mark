import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import * as authService from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // useNavigate for redirection

  function handleLogOut() {
    authService.logOut();
    setUser(null);
    navigate('/login'); // Redirect to login after logging out
  }

  // Hide 'Home', 'Log In', and 'Sign Up' links on the Home page
  if (location.pathname === '/' && !user) {
    return null; // Return nothing to remove NavBar on the Home page if no user is logged in
  }

  return (
    <nav className="NavBar">
      {user ? (
        <>
          <Link to="/clubs">Clubs</Link>  
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp;&nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          &nbsp; | &nbsp;
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
