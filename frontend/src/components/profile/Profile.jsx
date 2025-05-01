import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('user');
        const userId = localStorage.getItem('userId'); // Make sure to store user ID during login
        
        if (!token || !userId) {
          navigate('/');
          return;
        }

        const response = await axios.get(`http://localhost:9000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        {userData && (
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">{userData.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;