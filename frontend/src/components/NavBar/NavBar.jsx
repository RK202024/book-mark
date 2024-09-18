import { useLocation, useNavigate } from 'react-router-dom'; 
import * as authService from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogOut() {
    authService.logOut();
    setUser(null);
    navigate('/'); 
  }

  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="NavBar">
      {user ? (
        <>
          <button onClick={handleLogOut} className="NavBar a">
            Log Out
          </button>
          &nbsp;&nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : null}
    </nav>
  );
}
