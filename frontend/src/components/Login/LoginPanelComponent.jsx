import React, { useState, useEffect } from 'react';
import '../../styles/Login/LoginPanelComponent.css';

const LoginPanelComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', dateOfBirth: '', pesel: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [loginPanelData, setLoginPanelData] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl';
            try {
                const data = await import(`../../content/loginPanel-${language}.json`);
                setLoginPanelData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []); 

    if (!loginPanelData) {
        return <></>;
    }

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

            if (!isLogin) {
                setSuccessMessage('Poprawnie zarejestrowano użytkownika. Możesz się teraz zalogować.');
                setTimeout(() => setIsLogin(true), 3000);
            }
            else if (isLogin && data.token) {
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
            <div className='login-panel-component-info1'>{loginPanelData.info1}</div>
            <div className='login-panel-component-info2'>{loginPanelData.info2}</div>
            <div className='login-panel-component-info3'>{loginPanelData.info3}</div>
            <div className="login-panel-component-header">
                {isLogin ? loginPanelData.login.toUpperCase() : loginPanelData.register.toUpperCase()}
            </div>
            <div className="login-panel-component-form">
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                name="name"
                                placeholder={loginPanelData.placeholders.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                name="surname"
                                placeholder={loginPanelData.placeholders.surname}
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
                        placeholder={loginPanelData.placeholders.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    {errorMessage && <div className="login-error">{errorMessage}</div>}
                    {successMessage && <div className="login-success">{successMessage}</div>}
                    <button type="submit">{isLogin ? loginPanelData.login : loginPanelData.register}</button>
                </form>
                <div className="login-panel-component-switch-form">
                    {isLogin ? (
                        <div className='login-panel-component-switch-form-element-container'>
                            {loginPanelData['dont-have-password']}
                            <div className='login-panel-component-switch-form-element' onClick={() => setIsLogin(false)}>
                                {loginPanelData['dont-have-password-register']}
                            </div>
                        </div>
                    ) : (
                        <div className='login-panel-component-switch-form-element-container'>
                            {loginPanelData['have-password']}
                            <div className='login-panel-component-switch-form-element' onClick={() => setIsLogin(true)}>
                                {loginPanelData.login}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPanelComponent;
