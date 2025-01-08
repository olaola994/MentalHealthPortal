import React, { useState, useEffect } from 'react';
import { getPatientInfo, addUserAddress } from '../../../services/api';
import '../../../styles/UserPanel/UserAccountInfo/UserAccountInfoComponent.css';
import userInfoData from '../../../content/userInfo-pl.json'

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
                <li className='user-info-item'>{userInfoData.info.name}: {info.imie}</li>
                <li className='user-info-item'>{userInfoData.info.surname}: {info.nazwisko}</li>
                <li className='user-info-item'>{userInfoData.info.pesel}: {info.pesel}</li>
                <li className='user-info-item'>{userInfoData.info['birth-date']}: urodzenia {formatDate(info.data_urodzenia)}</li>
                <li className='user-info-item'>{userInfoData.info.email}: {info.email}</li>
            </ul>
            )}
            {info.miasto ? (
            <ul className="address-info-list">
                <li className='address-info-item'>{userInfoData.info.city}: {info.miasto}</li>
                <li className='address-info-item'>{userInfoData.info['postal-code']}: {info.kod_pocztowy}</li>
                <li className='address-info-item'>{userInfoData.info.street}: {info.ulica}</li>
                <li className='address-info-item'>{userInfoData.info['building-number']}: {info.numer_budynku}</li>
                {info.numer_mieszkania && (
                    <li className='address-info-item'>{userInfoData.info['apartment-number']}: {info.numer_mieszkania}</li>
                )}
                <li className='address-info-item'>{userInfoData.info.country}: {info.kraj}</li>
            </ul>
        ) : (
            <div className='address-info-no-address-data'>{userInfoData['no-address']}</div>
        )}
        {!addressFormVisible ? (
            <button className="add-user-address-button" onClick={()=> setAddressFormVisible(true)}>{info.miasto ? 'Edytuj adres' : 'Dodaj adres'}</button>
        ):(
            <form className="address-form" onSubmit={handleAddressSubmit}>
                <div className='address-form-header'>{info.miasto ? userInfoData.edit : userInfoData.add} {userInfoData['address-data']}</div>
                <div className="address-form-item">
                        <label>{userInfoData.info.city}</label>
                        <input
                            type="text"
                            name="city"
                            value={addressData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>{userInfoData.info['postal-code']}</label>
                        <input
                            type="text"
                            name="postal_code"
                            value={addressData.postal_code}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>{userInfoData.info.street}</label>
                        <input
                            type="text"
                            name="street"
                            value={addressData.street}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>{userInfoData.info['building-number']}</label>
                        <input
                            type="text"
                            name="street_number"
                            value={addressData.street_number}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="address-form-item">
                        <label>{userInfoData.info['apartment-number']} (opcjonalny)</label>
                        <input
                            type="text"
                            name="apartament_number"
                            value={addressData.apartament_number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="address-form-item">
                        <label>{userInfoData.info.country}</label>
                        <input
                            type="text"
                            name="country"
                            value={addressData.country}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-address-button">{userInfoData.save}</button>
                    <button className="cancel-address-button" onClick={() => setAddressFormVisible(false)}>{userInfoData.cancel}</button>
            </form>
        )}
        </div>
    );
};

export default UserAccountInfoComponent;
