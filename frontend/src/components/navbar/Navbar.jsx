import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('user');
      const storedUsername = localStorage.getItem('username');
      setIsLoggedIn(!!token);
      setUsername(storedUsername || '');
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    checkAuth();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9000/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      setIsLoggedIn(false);
      setUsername('');
      window.location.href = '/login';
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">S.F.</Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`auth-buttons ${isMenuOpen ? 'active' : ''}`}>
          {isLoggedIn ? (
            <>
              <span className="username">Welcome, {username}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
              <Link to='/profile'> profile</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="register-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;