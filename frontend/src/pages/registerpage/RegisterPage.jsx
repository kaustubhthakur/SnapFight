import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./RegisterPage.css"
const RegisterPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    
    try {
      setLoading(true);
      
      // Call to backend API
      const response = await fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Handle successful registration
      alert('registerdd')
      setSuccess(true);
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-inner">
        <div className="header-section">
          <h2 className="register-heading">
            Create your account
          </h2>
          <p className="auth-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
        
        {success ? (
          <div className="success-message">
            <div className="message-content">
              <h3>Registration successful!</h3>
              <p>Your account has been created. You can now log in.</p>
              <div className="link-container">
                <Link to="/login" className="success-link">
                  Go to login
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-content">
              {error && (
                <div className="error-message">
                  <div className="error-content">
                    <h3>Error</h3>
                    <p>{error}</p>
                  </div>
                </div>
              )}
              
              <div className="input-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Username"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Email address"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Password"
                />
              </div>
            </div>
            
            <div className="button-container">
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default RegisterPage