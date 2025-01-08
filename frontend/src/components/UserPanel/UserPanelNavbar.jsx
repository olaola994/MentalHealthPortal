import '../../styles/UserPanel/UserPanelNavbar.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPanelNavbar = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../../content/userInfo-${language}.json`);
                setUserData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []);

    if (!userData) {
        return <></>;
    }

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
                    {userData['user-panel-navbar']['main-page']}
                </button>
                <button className="user-panel-back-button" onClick={goToPanel}>
                    {userData['user-panel-navbar']['back-to-panel']}
                </button>
                <button className="user-panel-logout-button" onClick={handleLogout}>
                    {userData['user-panel-navbar']['log-out']}
                </button>
            </div>
        </nav>
    );
};

export default UserPanelNavbar;
