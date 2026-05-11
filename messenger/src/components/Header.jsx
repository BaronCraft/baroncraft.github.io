import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--accent-blue)">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 1 4.32V22l5.33-1.67c1.14.31 2.37.49 3.67.49 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.08 0-2.12-.16-3.1-.44L6 20.5v-3.06c-.61-1.08-.96-2.33-.96-3.44 0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7z"/>
          </svg>
          <span>Messenger</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Feed</Link>
          <Link to="/messages" className="nav-link">Messages</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
