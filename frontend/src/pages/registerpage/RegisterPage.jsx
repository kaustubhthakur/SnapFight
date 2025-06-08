import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import "./RegisterPage.css"
const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await fetch('http://localhost:9000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Registration successful!');
                alert('registered...')
                navigate('/login');
            } else {
                toast.error(data.message || 'Registration failed!');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-card">
                <h2 className="register-title">RegisterPage</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username (e.g., Jondo99)"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.username}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Loading...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
                
                <p className="login-link-container">
                    Already have an account?{' '}
                    <Link to="/login" className="login-link">
                        Login
                    </Link>
                </p>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default RegisterPage;