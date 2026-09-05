import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function UpdateListings() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchListing = async () => {
        try {
            const response = await api.get(`/accommodations/${id}`);
            setFormData({
                ...response.data,
                amenities: response.data.amenities.join(', '),
                images: response.data.images.join(', '),
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch listing data');
        }

        };
        fetchListing();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/accommodations/${id}`, {
                ...formData,
                amenities: formData.amenities.split(',').map(item => item.trim()),
                images: formData.images.split(',').map(item => item.trim()),
            });
            navigate('/listings');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update listing');
        }
    };
    
    if (!formData) return <p>Loading...</p>;
    return (
        <form onSubmit={handleSubmit}>
        <h1>Update Listings</h1>
        {error && <p>{error}</p>}

        <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"

            />

            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price per night"
                required
            />
            
            <label>
                <input
                type="checkbox"
                name="enhancedCleaning"
                checked={formData.enhancedCleaning}
                onChange={handleChange}
                />
                Enhanced Cleaning
            </label>

            <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />

            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
            />

            <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
                required
            />

            <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Guests"
            />

            <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Bedrooms"
            />

            <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Bathrooms"
            />

            <input
                type="number"
                name="weeklyDiscount"
                value={formData.weeklyDiscount}
                onChange={handleChange}
                placeholder="Weekly Discount"
            />

            <input
                type="number"
                name="cleaningFee"
                value={formData.cleaningFee}
                onChange={handleChange}
                placeholder="Cleaning Fee"
            />

            <input
                type="number"
                name="serviceFee"
                value={formData.serviceFee}
                onChange={handleChange}
                placeholder="Service Fee"
            />

            <input
                type="number"
                name="occupancyTaxes"
                value={formData.occupancyTaxes}
                onChange={handleChange}
                placeholder="Occupancy Taxes"
            />

            <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Amenities"
            />

            <label>
                <input
                type="checkbox"
                name="selfCheckin"
                checked={formData.selfCheckin}
                onChange={handleChange}
                />
                Self Check-in
            </label>

            <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="Image URLs, comma-separated"
            />

            <button type="submit">Update Listing</button>
        </form>
    );
}

export default UpdateListings;