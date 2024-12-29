import React, { useState, useEffect } from 'react';
import {getAdminSpecialists} from '../../services/api';
import '../../styles/AdminPanel/AdminMenageSpecialistsComponent.css';

const AdminMenageSpecialistsComponent = () => {
    const [specialists, setSpecialists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const data = await getAdminSpecialists();
                console.log('Otrzymane dane specjalistów:', data);
                setSpecialists(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Błąd pobierania listy specjalistów:', error.message);
                setError('Nie udało się pobrać listy pacjentów.');
            }finally {
                setLoading(false);
              }
        };
        fetchSpecialists();
    }, []);

    if (loading) {
        return <div>Ładowanie danych...</div>;
      }
    
    if (error) {
        return <div>{error}</div>;
    }
    

    return (
        <div>
          <div className='admin-specialists-header'>Lista Specjalistów</div>
          {specialists.length === 0 ? (
            <p>Brak specjalistów do wyświetlenia.</p>
          ) : (
            <ul className="admin-specialists-list">
              {specialists.map((specialist, index) => (
                <li key={index} className="admin-specialist-item">
                  <div className="admin-specialist-id">Numer specjalisty: {specialist.user_id}</div>
                  <div className="admin-specialist-surname">Nazwisko: {specialist.nazwisko}</div>
                  <div className="admin-specialist-name">Imię: {specialist.imie}</div>
                  <div className="admin-specialist-email">E-mail: {specialist.email}</div>
                  <div className="admin-specialist-specialization">Specjalizacja: {specialist.specjalizacja}</div>
                  <div className="admin-specialist-license-number">Numer licencji: {specialist.numer_licencji}</div>
                  <div className="admin-specialist-photo-path">Ściezka zdjęcia: {specialist.zdjecie}</div>
                  <div className="admin-specialist-description">Opis: {specialist.opis}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
    );
};
    
export default AdminMenageSpecialistsComponent;