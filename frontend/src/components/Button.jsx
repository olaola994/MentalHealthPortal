import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Button.css';

const Button = ({ text, to, onClick, backgroundColor, borderColor, textColor }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
        if (onClick) {
            onClick();
        }
    };

    const buttonStyle = {
        backgroundColor: backgroundColor || 'white', // Domyślny kolor tła
        borderColor: borderColor || '#007bff', // Domyślny kolor obramowania
        color: textColor || '#fff', // Domyślny kolor tekstu
    };

    return (
        <button onClick={handleClick} style={buttonStyle} className="custom-button">
            {text}
        </button>
    );
}
export default Button;