import React, { useState, useEffect } from 'react';
import { getPatientInfo } from '../../../services/api';
import '../../../styles/UserPanel/UserAccountInfo/UserAccountInfoComponent.css';

const UserAccountInfoComponent = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInfo = async () =>{
            try{
                const data = await getPatientInfo();
                console.log('Pobrane dane użytkownika:', data);
                setInfo(data[0]);
            }catch(err){
                console.error('Błąd podczas pobierania danych użytkownika:', err.message);
                setError('Nie udało się załadować danych użytkownika.');
            }finally{
                setLoading(false);
            }
        }
        fetchInfo();
    },[]);

    if (loading) {
        return <div className='loading'>Ładowanie danych użytkownika...</div>;
    }

    if (error) {
        return <div className='error'>{error}</div>;
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pl-PL', options);
    };

    return (
        <div className='user-account-info-component-container'>
            <div className='user-account-info-component-container-header'>Twoje konto</div>
            {info && (
            <ul className="user-info-list">
                <li className='user-info-item'>Imię: {info.imie}</li>
                <li className='user-info-item'>Nazwisko: {info.nazwisko}</li>
                <li className='user-info-item'>PESEL: {info.pesel}</li>
                <li className='user-info-item'>Data: urodzenia {formatDate(info.data_urodzenia)}</li>
                <li className='user-info-item'>Email: {info.email}</li>
            </ul>
            )}
        </div>
    );
};

export default UserAccountInfoComponent;
