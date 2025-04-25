import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './ProfilePage.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    createdAt: '',
    // Add any other user fields you want to display
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Get user ID from localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          throw new Error('User information not found');
        }

        const { _id } = JSON.parse(storedUser);
        
        // Fetch user data from backend
        const response = await fetch(`http://localhost:9000/users/${_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile data');
        }
        
        // Update state with user data
        setUserData(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching your profile');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="loading-spinner">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="profile-content">
          <div className="profile-avatar">
            {/* Display first letter of username as avatar */}
            <div className="avatar-circle">
              {userData.username ? userData.username.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          
          <div className="profile-details">
            <div className="profile-item">
              <span className="profile-label">Username:</span>
              <span className="profile-value">{userData.username}</span>
            </div>
            
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{userData.email}</span>
            </div>
            
            <div className="profile-item">
              <span className="profile-label">Member Since:</span>
              <span className="profile-value">{formatDate(userData.createdAt)}</span>
            </div>
            
            {/* Add additional profile fields as needed */}
          </div>
        </div>
        
        <div className="profile-actions">
          <button 
            onClick={() => navigate('/edit-profile')} 
            className="edit-profile-button"
          >
            Edit Profile
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="back-button"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;