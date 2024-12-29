import React, { useState, useEffect } from 'react';
import {getAdminAppointments} from '../../services/api';
import '../../styles/AdminPanel/AdminMenageAppointmentsComponent.css';

const AdminMenageAppointmentsComponent = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAdminAppointments();
                console.log('Otrzymane dane wizyt:', data);
                setAppointments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Błąd pobierania listy wizyt:', error.message);
                setError('Nie udało się pobrać listy wizyt.');
            }finally {
                setLoading(false);
              }
        };
        fetchAppointments();
    }, []);

    if (loading) {
        return <div>Ładowanie danych...</div>;
      }
    
    if (error) {
        return <div>{error}</div>;
    }
    
    const formatDate = (date) => {
        if (!date) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('pl-PL', options);
    };

    return (
        <div>
          <div className='admin-appointments-header'>Lista Wizyt</div>
          {appointments.length === 0 ? (
            <div className='admin-no-rocords-displayed'>Brak wizyt do wyświetlenia.</div>
          ) : (
            <ul className="admin-appointments-list">
              {appointments.map((appointment, index) => (
                <li key={index} className="admin-appointment-item">
                  <div className="admin-appointment-id">Numer wizyty: {appointment.appointment_id}</div>
                  <div className="admin-appointment-pacjent-imie">Dane pacjenta: {appointment.pacjent_imie}</div>
                  <div className="admin-appointment-specjalista-imie">Dane specjalisty: {appointment.specjalista_imie}</div>
                  <div className="admin-appointment-data">Data wizyty: {formatDate(appointment.data_wizyty)}</div>
                  <div className="admin-appointment-dlugosc">Długość wizyty: {appointment.dlugosc_wizyty} minut</div>
                  <div className="admin-appointment-status">Status: {appointment.status}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
    );
};
    
export default AdminMenageAppointmentsComponent;