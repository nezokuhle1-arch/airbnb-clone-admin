import { useState, useEffect } from 'react';
import api from '../api/axios';

function Reservations() {
    const [ reservations, setReservations ] = useState([]);

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
        <div>
            <h1>Reservations Page</h1>
            {reservations.map((reservation) => (
                <div key={reservation._id}>
                    <p>{reservation.accommodation?.title} - booked by {reservation.user?.username}</p>
                    <p>{new Date(reservation.checkIn).toLocaleString()} to {new Date(reservation.checkOut).toLocaleString()}</p>
                </div>
            ))}
        </div>
      
    );
  }
  
export default Reservations;