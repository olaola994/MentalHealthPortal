import React, { useState, useEffect } from 'react';
import {getAdminPatients} from '../../services/api';
import '../../styles/AdminPanel/AdminMenagePatientsComponent.css';

const AdminMenagePatientsComponent = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getAdminPatients();
                console.log('Otrzymane dane pacjentów:', data);
                setPatients(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Błąd pobierania listy uzytkowników:', error.message);
                setError('Nie udało się pobrać listy pacjentów.');
            }finally {
                setLoading(false);
              }
        };
        fetchPatients();
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('pl-PL', options);
    };

    if (loading) {
        return <div>Ładowanie danych...</div>;
      }
    
    if (error) {
        return <div>{error}</div>;
    }
    

    return (
        <div>
          <div className='admin-patients-header'>Lista Pacjentów</div>
          {patients.length === 0 ? (
            <p>Brak pacjentów do wyświetlenia.</p>
          ) : (
            <ul className="admin-patients-list">
              {patients.map((patient, index) => (
                <li key={index} className="admin-patient-item">
                  <div className="admin-patient-id">Numer pacjenta: {patient.user_id}</div>
                  <div className="admin-patient-surname">Nazwisko: {patient.nazwisko}</div>
                  <div className="admin-patient-name">Imię: {patient.imie}</div>
                  <div className="admin-patient-pesel">PESEL: {patient.pesel}</div>
                  <div className="admin-patient-email">E-mail: {patient.email}</div>
                  <div className="admin-patient-birth-date">
                    Data urodzenia: {formatDate(patient.data_urodzenia)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
    );
};
    
export default AdminMenagePatientsComponent;