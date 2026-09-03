import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function CreateListings () {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        type: '',
        price: '',
        guests: '',
        bedrooms: '',
        bathrooms: '',
        amenities: '',
        images: '',
        weeklyDiscount: '',
        cleaningFee: '',
        serviceFee: '',
        occupancyTaxes: '',
        enhancedCleaning: false,
        selfCheckin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await api.post('/accommodations', {
                ...formData,
                amenities: formData.amenities.split(',').map(item => item.trim()),
                images: formData.images.split(',').map(item => item.trim()),
            });
            navigate('/listings');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create listing');
        }

    };

    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Listings </h1>
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
                type="file"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="Image URLs, comma-separated"
            />
            <button type="submit">Create Listing</button>
        </form>
    );
}

export default CreateListings;