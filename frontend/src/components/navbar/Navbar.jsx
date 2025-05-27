import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>snapfight</h2>
        </div>

        <div className="nav-auth">
          <button className="auth-btn login-btn">Login</button>
          <button className="auth-btn register-btn">Register</button>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-auth">
          <button className="auth-btn login-btn" onClick={toggleMenu}>
            Login
          </button>
          <button className="auth-btn register-btn" onClick={toggleMenu}>
            Register
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
        }

        .nav-logo h2 {
          color: #2563eb;
          margin: 0;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .nav-auth {
          display: flex;
          gap: 1rem;
        }

        .auth-btn {
          padding: 0.5rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn {
          background-color: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .login-btn:hover {
          background-color: #f3f4f6;
        }

        .register-btn {
          background-color: #2563eb;
          color: white;
        }

        .register-btn:hover {
          background-color: #1d4ed8;
        }

        .hamburger {
          display: none;
          cursor: pointer;
          color: #374151;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          background-color: #ffffff;
          border-top: 1px solid #e5e7eb;
          padding: 1rem 2rem;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .mobile-menu.active {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-link {
          color: #374151;
          text-decoration: none;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
          font-weight: 500;
        }

        .mobile-link:hover {
          color: #2563eb;
        }

        .mobile-auth {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .mobile-auth .auth-btn {
          width: 100%;
          padding: 0.75rem;
        }

        /* Media Queries */
        @media (max-width: 768px) {
          .nav-menu,
          .nav-auth {
            display: none;
          }

          .hamburger {
            display: block;
          }

          .mobile-menu {
            display: flex;
          }

          .nav-container {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .nav-logo h2 {
            font-size: 1.25rem;
          }

          .nav-container {
            padding: 0.75rem;
          }

          .mobile-menu {
            padding: 1rem;
          }
        }

        /* Add body padding to prevent content from hiding behind fixed navbar */
        body {
          padding-top: 80px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
