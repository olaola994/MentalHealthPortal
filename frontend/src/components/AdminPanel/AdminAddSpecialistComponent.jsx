import React, { useState } from 'react';
import { addSpecialist } from '../../services/api';
import '../../styles/AdminPanel/AdminAddSpecialistComponent.css';

const AdminAddSpecialistComponent = () => {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        specialization: '',
        license_number: '',
        photo_path: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addSpecialist(formData);
            setSuccessMessage('Specjalista został dodany pomyślnie.');
            setErrorMessage('');
            setFormData({
                name: '',
                surname: '',
                email: '',
                specialization: '',
                license_number: '',
                photo_path: '',
            });
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };
    return(
        <div className='admin-add-specialist-container'>
            <div className='admin-add-specialist-header '>Dodaj nowego specjalistę</div>
            <form className='admin-add-specialist-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Imię"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Nazwisko"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="specialization"
                    placeholder="Specjalizacja"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="license_number"
                    placeholder="Numer licencji"
                    value={formData.license_number}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="photo_path"
                    placeholder="Ścieżka zdjęcia"
                    value={formData.photo_path}
                    onChange={handleChange}
                />
                <button className='submit-button' type="submit">Dodaj specjalistę</button>
            </form>
            {successMessage && <div className='admin-add-specialist-success-message'> {successMessage}</div>}
            {errorMessage && <div className='admin-add-specialist-error-message'> {errorMessage}</div>}
        </div>
    );
};

export default AdminAddSpecialistComponent;