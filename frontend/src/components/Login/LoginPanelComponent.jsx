import React, { useState } from 'react';
import '../../styles/Login/LoginPanelComponent.css';

const LoginPanelComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', dateOfBirth: '', pesel: '' });
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            const today = new Date();
            const birthDate = new Date(formData.dateOfBirth);
            const age = today.getFullYear() - birthDate.getFullYear();
            const isBeforeBirthday = today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

            if (!formData.dateOfBirth || age < 18 || (age === 18 && isBeforeBirthday)) {
                setErrorMessage('Aby zalozyć konto nalezy mieć conajmniej 18lat.');
                return;
            }

            if (formData.pesel.length !== 11) {
                setErrorMessage('PESEL musi zawierać dokładnie 11 cyfr.');
                return;
            }
        }
        setErrorMessage('');

        try {
            const url = isLogin ? 'http://localhost:3001/api/zaloguj' : 'http://localhost:3001/api/zarejestruj/pacjent';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || 'Wystąpił błąd podczas logowania.');
                return;
            }

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
                                required
                            />
                            <input
                                name="surname"
                                placeholder="Nazwisko"
                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                required
                            />
                            <input
                                name="dateOfBirth"
                                type="date"
                                placeholder="Data urodzenia"
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                required
                            />
                            <input
                                name="pesel"
                                placeholder="PESEL"
                                onChange={(e) => setFormData({ ...formData, pesel: e.target.value })}
                                required
                            />
                        </>
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Hasło"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    {errorMessage && <div className="login-error">{errorMessage}</div>}
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
