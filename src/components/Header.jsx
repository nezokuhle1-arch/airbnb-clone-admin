import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
        <header>
            <Link to="/">Airbnb Admin</Link>

            <nav>
                <Link to="/listings">Listings</Link>
                <Link to="/create-listings">Create Listings</Link>
            </nav>

            {username ? (
                <div>
                <button onClick={() => setShowDropdown(!showDropdown)}>
                    Hi, {username}
                </button>
                {showDropdown && (
                    <div>
                        <Link to="/reservations">View Reservations</Link>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
                </div>
            ) : (
                <Link to="/">Become a Host</Link>
            )}
        </header>
    );
}

export default Header;