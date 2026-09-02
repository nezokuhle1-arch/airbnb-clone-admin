import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/users/login', { email, password });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);

            navigate('/listings');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
            {error && <p>{error}</p>}

            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />

            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;