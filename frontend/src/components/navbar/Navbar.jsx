import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContextApi';
import toast from 'react-hot-toast';
import './Navbar.css';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9000/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        updateUser(null);
        localStorage.removeItem("userData");
        navigate('/login');
        
        // Close mobile menu after logout
        setOpen(false);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={handleLinkClick}>snapfight</Link>
      </div>
      
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      
      <div className={`navbar-links ${open ? 'active' : ''}`}>
        {user ? (
          // User is logged in - show logout, profile, create post
          <>
            <Link to="/profile" className="nav-link" onClick={handleLinkClick}>
              Profile
            </Link>
            <Link to="/create-post" className="nav-link" onClick={handleLinkClick}>
              Create Post
            </Link>
            <button 
              onClick={handleLogout} 
              className="nav-link logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          // User is not logged in - show login, register
          <>
            <Link to="/login" className="nav-link" onClick={handleLinkClick}>
              Login
            </Link>
            <Link to="/register" className="nav-link" onClick={handleLinkClick}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;