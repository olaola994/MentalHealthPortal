import React, { useState } from 'react';
import '../../styles/Login/LoginPanelComponent.css';

const LoginPanelComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', dateOfBirth: '', pesel: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            const today = new Date();
            const selectedDate = new Date(formData.dateOfBirth);

            if (selectedDate > today) {
                setError('Data urodzenia nie może być z przyszłości.');
                return;
            } else {
                setError('');
            }
        }

        try {
            const url = isLogin ? 'http://localhost:3001/api/zaloguj' : 'http://localhost:3001/api/zarejestruj/pacjent';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            if (isLogin && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                if (data.mustChangePassword) {
                    window.location.href = '/zmien-haslo';
                    return;
                }
                if (data.role === 'Admin') {
                    window.location.href = '/admin-panel';
                } else if (data.role === 'Patient') {
                    window.location.href = '/user-panel';
                }else if (data.role === 'Specialist') {
                    window.location.href = '/specialist-panel';
                }
                else {
                    alert('Nieznana rola użytkownika.');
                }
            } else {
                alert(data.message || 'Wystąpił błąd podczas logowania.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-panel-component-container">
            <div className='login-panel-component-info1'>DZIEŃ DOBRY!</div>
            <div className='login-panel-component-info2'>Witaj w panelu Klienta.</div>
            <div className='login-panel-component-info3'>Zaloguj się, aby zarządzać swoimi rezerwacjami.</div>
            <div className="login-panel-component-header">
                {isLogin ? 'ZALOGUJ SIĘ' : 'ZAREJESTRUJ SIĘ'}
            </div>
            <div className="login-panel-component-form">
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                name="name"
                                placeholder="Imię"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                name="surname"
                                placeholder="Nazwisko"
                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            />
                            <input
                                name="dateOfBirth"
                                type="date"
                                placeholder="Data urodzenia"
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            />
                            <input
                                name="pesel"
                                placeholder="PESEL"
                                onChange={(e) => setFormData({ ...formData, pesel: e.target.value })}
                            />
                        </>
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Hasło"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button type="submit">{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</button>
                </form>
                <div className="login-panel-component-switch-form">
                    {isLogin ? (
                        <div className='login-panel-component-switch-form-element-container'>
                            Nie masz konta?
                            <div className='login-panel-component-switch-form-element' onClick={() => setIsLogin(false)}>
                                Załóż je
                            </div>
                        </div>
                    ) : (
                        <div className='login-panel-component-switch-form-element-container'>
                            Masz już konto?{' '}
                            <div className='login-panel-component-switch-form-element' onClick={() => setIsLogin(true)}>
                                Zaloguj się
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPanelComponent;
