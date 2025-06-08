// LoginPage.jsx
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContextApi';
import './LoginPage.css'; // 👈 Import the CSS

const LoginPage = () => {
    const { updateUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:9000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Login successful!');
                updateUser(data);
                const date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                document.cookie = `jwt=${data.token}; path=/; expires=${date.toUTCString()}`;
                alert('logged in')
                navigate('/');
            } else {
                toast.error(data.message || 'Login failed!');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title"></h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-input-group">
                        <FaUser className="login-icon" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="login-input"
                            onChange={handleChange}
                            value={formData.username}
                            required
                        />
                    </div>
                    <div className="login-input-group">
                        <FaLock className="login-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="login-input"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <p className="login-footer-text">
                    Don't have an account?{' '}
                    <Link to="/register" className="login-register-link">Register</Link>
                </p>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default LoginPage;
