import { useState, useEffect } from 'react';
import api from '../api/axios';
import './AdminList.css';

function Reservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/reservations/host');
                setReservations(response.data);
            } catch (error) {
                console.error('Failed to fetch reservations', error);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div className="admin-list-page">
            <h1>Reservations</h1>
            <div className="admin-list">
                {reservations.map((reservation) => (
                    <div className="admin-list-card" key={reservation._id}>
                        <div className="admin-list-card-info">
                            <h2>{reservation.accommodation?.title}</h2>
                            <p>Booked by {reservation.user?.username}</p>
                            <p>{new Date(reservation.checkIn).toLocaleDateString()} — {new Date(reservation.checkOut).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reservations;