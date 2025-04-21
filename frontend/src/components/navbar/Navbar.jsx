import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './navbar.css'; // Make sure to import the CSS file

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div>
        <div>
          {/* Logo */}
          <div className="flex-shrink-0 flex">
          SnapFight
          </div>

          {/* Desktop menu */}
          <div className="desktop-menu">
            <button className="login-button">
              Login
            </button>
            <button className="register-button">
              Register
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={toggleMenu}
              className="menu-toggle-button"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="icon" aria-hidden="true" />
              ) : (
                <Menu className="icon" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <button className="mobile-login-button">
            Login
          </button>
          <button className="mobile-register-button">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}