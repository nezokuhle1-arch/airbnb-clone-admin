import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/');
    };
    
    
    return (
        <header className="admin-header">
            <div className="admin-header-inner container">
                <Link to="/" className="admin-logo">
                    airbnb <span className="admin-logo-admin">admin</span>
                </Link>

                {username && (
                    <nav className="admin-header-nav">
                        <Link to="/listings">Listings</Link>
                        <Link to="/create-listings">Create Listing</Link>
                    </nav>
                )}

                {username ? (
                <div className="admin-user-menu">
                    <button className="admin-user-button" onClick={() => setShowDropdown(!showDropdown)}>
                    Hi, {username}
                    </button>
                    {showDropdown && (
                    <div className="admin-dropdown">
                        <Link to="/reservations">View Reservations</Link>
                        <button className="dropdown-logout" onClick={handleLogout}>Log Out</button>
                    </div>
                    )}
                </div>
                ) : (
                <Link to="/" className="admin-become-host-link">Become a Host</Link>
                        )}
                    </div>
        </header>
    );
};

export default Header;