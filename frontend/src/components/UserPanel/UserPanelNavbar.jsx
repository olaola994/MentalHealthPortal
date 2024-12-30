import '../../styles/UserPanel/UserPanelNavbar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserPanelNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Wylogowano pomyślnie');
        navigate('/');
    };
    const goToPanel = () => {
        const role = localStorage.getItem('role');
        if (role === 'Admin') {
            navigate('/admin-panel');
        } else if (role === 'Patient') {
            navigate('/user-panel');
        } else if (role === 'Specialist') {
            navigate('/specialist-panel');
        }
        else {
            alert('Nieznana rola. Zaloguj się ponownie.');
            handleLogout();
        }
    };
    const goToMainPage = () =>{
        navigate('/');
    }

    return (
        <nav className="user-panel-navbar">
            <div className="user-panel-links">
                <button className="user-panel-main-page-button" onClick={goToMainPage}>
                    Strona główna
                </button>
                <button className="user-panel-back-button" onClick={goToPanel}>
                    Powrót do panelu
                </button>
                <button className="user-panel-logout-button" onClick={handleLogout}>
                    Wyloguj się
                </button>
            </div>
        </nav>
    );
};

export default UserPanelNavbar;
