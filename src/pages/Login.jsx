import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation before calling the server
        if (!email.trim() || !password) {
            setError('Please enter your email and password');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/users/login', { email: email.trim(), password });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);

            navigate('/listings');
        } catch (err) {
            if (err.response) {
                // The server answered: show its message (e.g. Invalid credentials)
                setError(err.response.data?.message || 'Login failed');
            } else {
                // No answer at all: server asleep or unreachable
                setError('Cannot reach the server. It may be waking up, so please try again in a minute.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <form className="admin-login-card" onSubmit={handleSubmit}>
                <h1>Admin login</h1>
                <p className="admin-login-subtitle">Sign in to manage listings and reservations</p>

                {error && <p className="admin-login-error">{error}</p>}

                <label className="admin-login-field">
                    <span>Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </label>

                <label className="admin-login-field">
                    <span>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </label>

                <button type="submit" className="admin-login-button" disabled={loading}>
                    {loading ? 'Logging in…' : 'Login'}
                </button>

                {loading && (
                    <p className="admin-login-hint">
                        The first login can take up to a minute while the server wakes up.
                    </p>
                )}
            </form>
        </div>
    );
}

export default Login;