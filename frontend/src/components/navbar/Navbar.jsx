import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
           SnapFight
          </Link>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="auth-buttons">
          <Link to="/login" className="auth-link login-link">
            Login
          </Link>
          <Link to="/register" className="auth-link register-link">
            Register
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-active' : ''}`}>
          <div className="mobile-auth-buttons">
            <Link to="/login" className="mobile-auth-link login-link" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/register" className="mobile-auth-link register-link" onClick={closeMenu}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;