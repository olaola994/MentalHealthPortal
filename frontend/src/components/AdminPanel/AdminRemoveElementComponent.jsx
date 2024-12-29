import React, { useState } from 'react';
import '../../styles/AdminPanel/AdminMenagePage.css';
import { removePatient, removeSpecialist, checkUserExists} from '../../services/api';

const AdminRemoveElementComponent = ({ userType, onRemoveSuccess}) => {
    const [showForm, setShowForm] = useState(false);
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    

    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };
    const toggleForm = () => {
        setShowForm((prev) => !prev);
        setError('');
        setUserId('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            if (!userId) {
                setError('Pole ID jest wymagane.');
                return;
            }

            const userExists = await checkUserExists(userId, userType);
            if (!userExists) {
                setError('Użytkownik o tym numerze nie istnieje.');
                return;
            }

            if (!window.confirm(`Czy na pewno chcesz usunąć tego ${userType === 'patient' ? 'pacjenta' : 'specjalistę'}?`)) {
                return;
            }

            if (userType === 'patient') {
                await removePatient(userId);
            } else if (userType === 'specialist') {
                await removeSpecialist(userId);
            }
            setError('');
            if (onRemoveSuccess) {
                onRemoveSuccess(Number(userId));
            }
            setUserId('');
            setShowForm(false);
        }catch(err){
            console.error(`Błąd przy usuwaniu ${userType}:`, error);
        }
    }
    return (
        <div className='admin-remove-element-button-container'>
            <button className='admin-remove-element-button' onClick={toggleForm}>
            {showForm ? 'Anuluj' : `Usuń ${userType === 'patient' ? 'pacjenta' : 'specjalistę'}`}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="admin-remove-element-form">
                    <div>
                        <label>Numer {userType === 'patient' ? 'pacjenta' : 'specjalistę'}</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={handleInputChange}
                            placeholder="Podaj numer użytkownika" 
                        />
                    </div>
                    {error && <div className="admin-remove-element-error-message">{error}</div>}
                    <button type="submit" className="submit-button">
                        Usuń
                    </button>
                </form>
            )}
        </div>
    );
};

export default AdminRemoveElementComponent;
