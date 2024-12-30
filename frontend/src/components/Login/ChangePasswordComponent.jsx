import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/api';
import '../../styles/Login/ChangePasswordComponent.css';

const ChangePasswordComponent = () => {
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await changePassword({ newPassword });
            setMessage('Hasło zostało zmienione pomyślnie.');
            setErrorMessage('');

            localStorage.removeItem('token');
            localStorage.removeItem('role');

            setTimeout(() => {
                navigate('/zarejestruj');
            }, 2000);

        } catch (error) {
            setErrorMessage(error.message);
            setMessage('');
        }
    }
    return(
        <div className="change-password-container">
            <h2>Zmień hasło</h2>
            <form onSubmit={handleSubmit} className="change-password-form">
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Nowe hasło"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="change-password-input"
                />
                <button type="submit" className="change-password-button">Zmień hasło</button>
            </form>
            {message && <div className="change-password-success">{message}</div>}
            {errorMessage && <div className="change-password-error">{errorMessage}</div>}
        </div>
    );

}

export default ChangePasswordComponent;