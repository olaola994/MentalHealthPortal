import React, { useState, useEffect } from 'react';
import { getSpecialistInfo} from '../../services/api';
import '../../styles/UserPanel/UserAccountInfo/UserAccountInfoComponent.css';

const SpecialistAccountInfoComponent = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [addressFormVisible, setAddressFormVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchInfo = async () =>{
            try{
                const data = await getSpecialistInfo();
                setInfo(data);
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

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAddressData({ ...addressData, [name]: value });
    };

    const handleAddressSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await addUserAddress(addressData);
            setMessage(response.message || 'Dane adresowe zostały zapisane.');
            setAddressFormVisible(false);

            const updatedInfo = await getPatientInfo();
            setInfo(updatedInfo);
        }catch (err) {
            console.error('Błąd podczas zapisywania danych adresowych:', err.message);
            setMessage('Nie udało się zapisać danych adresowych.');
        }
    }

    return (
        <div className='user-account-info-component-container'>
            <div className='user-account-info-component-container-header'>Twoje konto</div>
            {info && (
            <ul className="user-info-list">
                <li className='user-info-item'>Imię: {info.imie}</li>
                <li className='user-info-item'>Nazwisko: {info.nazwisko}</li>
                <li className='user-info-item'>Email: {info.email}</li>
                <li className='user-info-item'>Specjalizacja: {info.specjalizacja}</li>
                <li className='user-info-item'>Numer licencji: {info.numer_licencji}</li>
                <li className='user-info-item'>Opis: {info.opis}</li>
            </ul>
            )}
        </div>
    );
};

export default SpecialistAccountInfoComponent;
