import { Link, useNavigate } from 'react-router-dom';

export default function GoodbyePage() {
  const navigate = useNavigate();

  function handleLogout() {
    authService.logout(); // Logs the user out
    navigate('/'); // Redirect to Home Page
  }

  return (
    <div id="goodbye-page">
      <h1>We're sorry to see you go!</h1>
      <p>Check out some other clubs!</p>
      <div className="button-container">
        <Link to="/clubs">
          <button>Clubs</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}