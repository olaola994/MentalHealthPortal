import React, { useState, useEffect } from 'react';
import { getSpecialistInfo, addSpecialistDescription} from '../../services/api';
import '../../styles/UserPanel/UserAccountInfo/UserAccountInfoComponent.css';

const SpecialistAccountInfoComponent = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [descriptionFormVisible, setDescriptionFormVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchInfo = async () =>{
            try{
                const data = await getSpecialistInfo();

                setInfo(data);
                if (data.opis) {
                    setDescription(data.opis);
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

    const handleInputChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDescriptionSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await addSpecialistDescription(description);
            setMessage(response.message || 'Opis został zapisany.');
            setDescriptionFormVisible(false);

            const updatedInfo = await getSpecialistInfo();
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
            {!descriptionFormVisible ? (
            <button className="add-user-address-button" onClick={()=> setDescriptionFormVisible(true)}>{info.opis ? 'Edytuj opis' : 'Dodaj opis'}</button>
        ):(
            <form className="address-form" onSubmit={handleDescriptionSubmit}>
                <div className='address-form-header'>{info.miasto ? 'Edytuj' : 'Dodaj'} opis</div>
                <div className='address-form-item'>
                    <label>Opis</label>
                    <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <button type="submit" className="submit-address-button">Zapisz</button>
                <button className="cancel-address-button" onClick={() => setDescrptionFormVisible(false)}>Anuluj</button>
            </form>
        )
        }
        </div>
    );
};

export default SpecialistAccountInfoComponent;
