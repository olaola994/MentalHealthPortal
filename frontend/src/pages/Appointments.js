import React, { useEffect, useState } from 'react';
import { getAppointments } from '../services/api';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAppointments();
                console.log('Fetched appointments:', data);
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Appointments</h1>
            <ul>
                {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                        <li key={index}>{appointment.name}</li>
                    ))
                ) : (
                    <p>No appointments available or loading...</p>
                )}
            </ul>
        </div>
    );
}

export default Appointments;
