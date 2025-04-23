import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-main">
          {/* Logo on left */}
          <div className="logo">
            <Link to="/">sNapFiGhT</Link>
          </div>

         

          {/* Auth buttons on right */}
          <div className="auth-buttons">
            <button className="login-btn">Login</button>
            <button className="register-btn">Register</button>
          </div>

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
        
          <div className="mobile-auth-buttons">
            <button className="mobile-login-btn">Login</button>
            <button className="mobile-register-btn">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
}