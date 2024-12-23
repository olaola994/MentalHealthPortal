import '../../styles/UserPanel/UserPanelNavbar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserPanelNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Wylogowano pomyślnie');
        navigate('/');
    };
    const goToPanel = () => {
        navigate('/panel');
    };

    return (
        <nav className="user-panel-navbar">
            <div className="user-panel-links">
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
