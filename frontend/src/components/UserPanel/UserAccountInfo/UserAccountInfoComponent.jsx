import React, { useState, useEffect } from 'react';
import { getPatientInfo, addUserAddress } from '../../../services/api';
import '../../../styles/UserPanel/UserAccountInfo/UserAccountInfoComponent.css';

const UserAccountInfoComponent = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [addressFormVisible, setAddressFormVisible] = useState(false);
    const [addressData, setAddressData] = useState({
        city: '',
        postal_code: '',
        street: '',
        street_number: '',
        apartament_number: '',
        country: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchInfo = async () =>{
            try{
                const data = await getPatientInfo();
                setInfo(data);

                if (data.miasto) {
                    setAddressData({
                        city: data.miasto,
                        postal_code: data.kod_pocztowy,
                        street: data.ulica,
                        street_number: data.numer_budynku,
                        apartament_number: data.numer_mieszkania || '',
                        country: data.kraj,
                    });
                }
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
                <li className='user-info-item'>PESEL: {info.pesel}</li>
                <li className='user-info-item'>Data: urodzenia {formatDate(info.data_urodzenia)}</li>
                <li className='user-info-item'>Email: {info.email}</li>
            </ul>
            )}
            {info.miasto ? (
            <ul className="address-info-list">
                <li className='address-info-item'>Miasto: {info.miasto}</li>
                <li className='address-info-item'>Kod pocztowy: {info.kod_pocztowy}</li>
                <li className='address-info-item'>Ulica: {info.ulica}</li>
                <li className='address-info-item'>Numer budynku: {info.numer_budynku}</li>
                {info.numer_mieszkania && (
                    <li className='address-info-item'>Numer mieszkania: {info.numer_mieszkania}</li>
                )}
                <li className='address-info-item'>Kraj: {info.kraj}</li>
            </ul>
        ) : (
            <div className='address-info-no-address-data'>Brak danych adresowych. Dodaj adres.</div>
        )}
        {!addressFormVisible ? (
            <button className="add-user-address-button" onClick={()=> setAddressFormVisible(true)}>{info.miasto ? 'Edytuj adres' : 'Dodaj adres'}</button>
        ):(
            <form className="address-form" onSubmit={handleAddressSubmit}>
                <div className='address-form-header'>{info.miasto ? 'Edytuj' : 'Dodaj'} dane adresowe</div>
                <div className="address-form-item">
                        <label>Miasto</label>
                        <input
                            type="text"
                            name="city"
                            value={addressData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>Kod pocztowy</label>
                        <input
                            type="text"
                            name="postal_code"
                            value={addressData.postal_code}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>Ulica</label>
                        <input
                            type="text"
                            name="street"
                            value={addressData.street}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>Numer budynku</label>
                        <input
                            type="text"
                            name="street_number"
                            value={addressData.street_number}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>Numer mieszkania (opcjonalny)</label>
                        <input
                            type="text"
                            name="apartament_number"
                            value={addressData.apartament_number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="address-form-item">
                        <label>Kraj</label>
                        <input
                            type="text"
                            name="country"
                            value={addressData.country}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-address-button">Zapisz</button>
                    <button className="cancel-address-button" onClick={() => setAddressFormVisible(false)}>Anuluj</button>
            </form>
        )}
        </div>
    );
};

export default UserAccountInfoComponent;
