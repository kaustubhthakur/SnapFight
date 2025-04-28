import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
          S.F.
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Auth Links */}
        <div className={`auth-buttons ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/register" className="register-link">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;