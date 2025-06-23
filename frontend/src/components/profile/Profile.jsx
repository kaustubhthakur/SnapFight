import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Loader2 } from 'lucide-react';
import { useUser } from '../../context/UserContextApi';
import './Profile.css';

const Profile = () => {
  const { user, updateUser, loading: contextLoading } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';

  const fetchUserProfile = async () => {
    if (!user?._id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:9000/users/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setProfileData(userData);
      setEditForm(userData);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user?._id) return;

    try {
      setSaving(true);
      
      const response = await fetch(`${API_BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setProfileData(updatedUser);
      updateUser(updatedUser);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user?._id]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm(profileData);
    }
    setIsEditing(!isEditing);
    setError(null);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (contextLoading || loading) {
    return (
      <div className="profile-container">
        <div className="loading-wrapper">
          <Loader2 className="loading-icon" />
          <span className="loading-text">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="profile-container">
        <div className="error-card">
          <div className="error-content">
            <div className="error-icon-wrapper">
              <X className="error-icon" />
            </div>
            <h2 className="error-title">Error Loading Profile</h2>
            <p className="error-message">{error}</p>
            <button 
              onClick={fetchUserProfile}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="auth-card">
          <div className="auth-content">
            <User className="auth-icon" />
            <h2 className="auth-title">Please Log In</h2>
            <p className="auth-message">You need to be logged in to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User className="avatar-icon" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profileData?.name || user?.name || 'User'}</h1>
            <p className="profile-email">{profileData?.email || user?.email}</p>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="edit-button"
              >
                <Edit2 className="button-icon" />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className="save-button"
                >
                  {saving ? (
                    <Loader2 className="button-icon animate-spin" />
                  ) : (
                    <Save className="button-icon" />
                  )}
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleEditToggle}
                  className="cancel-button"
                >
                  <X className="button-icon" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <p className="error-banner-text">{error}</p>
          </div>
        )}

        <div className="profile-details">
          <div className="detail-item">
            <div className="detail-label">
              <User className="detail-icon" />
              <span>Full Name</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editForm.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="detail-input"
                placeholder="Enter your full name"
              />
            ) : (
              <span className="detail-value">{profileData?.name || 'Not specified'}</span>
            )}
          </div>

          <div className="detail-item">
            <div className="detail-label">
              <Mail className="detail-icon" />
              <span>Email</span>
            </div>
            {isEditing ? (
              <input
                type="email"
                value={editForm.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="detail-input"
                placeholder="Enter your email"
              />
            ) : (
              <span className="detail-value">{profileData?.email || 'Not specified'}</span>
            )}
          </div>

          <div className="detail-item">
            <div className="detail-label">
              <Phone className="detail-icon" />
              <span>Phone</span>
            </div>
            {isEditing ? (
              <input
                type="tel"
                value={editForm.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="detail-input"
                placeholder="Enter your phone number"
              />
            ) : (
              <span className="detail-value">{profileData?.phone || 'Not specified'}</span>
            )}
          </div>

          <div className="detail-item">
            <div className="detail-label">
              <MapPin className="detail-icon" />
              <span>Location</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editForm.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="detail-input"
                placeholder="Enter your location"
              />
            ) : (
              <span className="detail-value">{profileData?.location || 'Not specified'}</span>
            )}
          </div>

          <div className="detail-item">
            <div className="detail-label">
              <Calendar className="detail-icon" />
              <span>Member Since</span>
            </div>
            <span className="detail-value">{formatDate(profileData?.createdAt || profileData?.joinDate)}</span>
          </div>

          <div className="detail-item bio-item">
            <div className="detail-label">
              <span>Bio</span>
            </div>
            {isEditing ? (
              <textarea
                value={editForm.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="detail-textarea"
                placeholder="Tell us about yourself..."
                rows="4"
              />
            ) : (
              <p className="detail-bio">{profileData?.bio || 'No bio available'}</p>
            )}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Profile;