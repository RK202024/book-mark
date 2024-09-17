import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div id="home-page">
      <div className="button-container">
      <Link to="/login" className="home-button" onClick={() => console.log('Navigating to Login')}>Log In</Link>
      <Link to="/signup" className="home-button" onClick={() => console.log('Navigating to Sign Up')}>Sign Up</Link>
      </div>
    </div>
  );
}
