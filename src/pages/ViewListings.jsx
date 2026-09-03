import { useState, useEffect } from 'react';
import api from '../api/axios';

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
            alert(error.response ?.data?.message || 'Failed to delete listing');
        }
    };

    return (
        <div>
            <h1>Listings</h1>
            {listings.map((listing) => (
                <div key={listing.id}>
                    <h2>{listing.title}</h2>
                    <p>{listing.location} — R{listing.price}</p>
                    <button onClick={() => handleDelete(listing._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ViewListings;