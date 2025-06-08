import React, { createContext, useContext, useState, useEffect } from 'react';

// User Context
const UserContext = createContext();

// Custom hook to use User Context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// User Context Provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get current logged-in user
  const getCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get token from localStorage or sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:3001/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      console.error('Error fetching current user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get user by ID (for admin purposes)
  const getUserById = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
    setError(null);
    setIsAuthenticated(false);
  };

  const clearUser = () => {
    setUser(null);
    setError(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      loading,
      error,
      isAuthenticated,
      getCurrentUser,
      getUserById,
      logout,
      clearUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Profile Component
const Profile = () => {
  const { user, loading, error, isAuthenticated, getCurrentUser, getUserById, logout, clearUser } = useUser();
  const [userId, setUserId] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Load current user on component mount
  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleGetUserById = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      getUserById(userId.trim());
    }
  };

  const handleGetCurrentUser = () => {
    getCurrentUser();
    setShowAdminPanel(false);
  };

  const handleClear = () => {
    clearUser();
    setUserId('');
  };

  const handleLogout = () => {
    logout();
    setShowAdminPanel(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">User Profile</h1>
          <p className="text-gray-600">
            {isAuthenticated ? 'Your profile information' : 'Please login to view your profile'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleGetCurrentUser}
              disabled={loading}
              className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Get My Profile'}
            </button>
            
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="bg-purple-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              {showAdminPanel ? 'Hide Admin' : 'Admin Panel'}
            </button>

            {user && (
              <button
                onClick={handleClear}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Admin Panel - Search by User ID */}
        {showAdminPanel && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Panel - Get User by ID</h3>
            <div className="space-y-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter user ID (e.g., 507f1f77bcf86cd799439011)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  disabled={loading}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleGetUserById(e);
                    }
                  }}
                />
              </div>
              <button
                onClick={handleGetUserById}
                disabled={loading || !userId.trim()}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : 'Get User Profile'}
              </button>
            </div>
          </div>
        )}

        {/* Authentication Status */}
        {!isAuthenticated && !loading && !user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Authentication Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Please login to access your profile. Make sure you have a valid token stored.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Fetching user profile...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Display */}
        {user && !loading && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-white">
                    {user.name || user.username || 'Unknown User'}
                  </h2>
                  {user.email && (
                    <p className="text-blue-100 mt-1">{user.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(user).map(([key, value]) => {
                  if (key === '_id' || key === '__v') return null;
                  
                  return (
                    <div key={key} className="border-b border-gray-100 pb-3">
                      <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {typeof value === 'object' && value !== null
                          ? JSON.stringify(value, null, 2)
                          : value?.toString() || 'N/A'
                        }
                      </dd>
                    </div>
                  );
                })}
              </div>

              {/* User ID Display */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500 mb-1">User ID</dt>
                  <dd className="text-sm font-mono text-gray-900 break-all">{user._id}</dd>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!user && !loading && !error && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">How to use:</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Click "Get My Profile" to fetch your logged-in user data</li>
              <li>• Use "Admin Panel" to search for other users by ID</li>
              <li>• Make sure your backend server is running on localhost:3001</li>
              <li>• Required API endpoints:</li>
              <li className="ml-4">- GET /api/auth/me (for current user)</li>
              <li className="ml-4">- GET /api/users/:id (for user by ID)</li>
              <li>• Authentication token should be stored in localStorage or sessionStorage</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}