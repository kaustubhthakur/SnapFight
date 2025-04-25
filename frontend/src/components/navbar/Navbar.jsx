import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      
      // Get username from localStorage if available
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.username || 'User');
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint
      const response = await fetch('http://localhost:9000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Clear local storage regardless of response
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Update state
      setIsLoggedIn(false);
      setUsername('');
      
      alert('Logged out successfully');
      
      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Even if the server request fails, clear local storage and state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-main">
          {/* Logo on left */}
          <div className="logo">
            <Link to="/">sNapFiGhT</Link>
          </div>

          {/* Dynamic auth section based on login state */}
          {isLoggedIn ? (
            <div className="user-section">
              <span className="username">Welcome, {username}</span>
              <Link to="/profile" className="profile-btn">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <div className="hamburger-menu">
            <button onClick={toggleMenu} className="hamburger-btn">
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="mobile-menu">
          {isLoggedIn ? (
            <div className="mobile-user-section">
              <span className="mobile-username">Welcome, {username}</span>
              <Link to="/profile" className="mobile-profile-btn">Profile</Link>
              <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
            </div>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="mobile-login-btn">Login</Link>
              <Link to="/register" className="mobile-register-btn">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}