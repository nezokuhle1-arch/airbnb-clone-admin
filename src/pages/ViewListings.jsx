import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import './AdminList.css';

function ViewListings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await api.get('/accommodations');
                setListings(response.data);
            } catch (error) {
                console.error('Failed to fetch listings', error)
            }
        }
        fetchListings();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this listing?');
        if (!confirmed) return;

        try {
            await api.delete(`/accommodations/${id}`);
            setListings(listings.filter((listing) => listing._id !== id));
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete listing');
        }
    };

    return (
        <div className="admin-list-page">
            <h1>Listings</h1>
            <div className="admin-list">
                {listings.map((listing) => (
                    <div className="admin-list-card" key={listing._id}>
                        <div className="admin-list-card-info">
                            <h2>{listing.title}</h2>
                            <p>{listing.location} — R{listing.price}</p>
                        </div>
                        <div className="admin-list-card-actions">
                            <Link className="admin-btn-secondary" to={`/update-listings/${listing._id}`}>Edit</Link>
                            <button className="admin-btn-danger" onClick={() => handleDelete(listing._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewListings;