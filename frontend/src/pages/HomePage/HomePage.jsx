import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div id="home-page">
      <div className="button-container">
        <Link to="/login" className="home-button">Log In</Link>
        <Link to="/signup" className="home-button">Sign Up</Link>
      </div>
    </div>
  );
}