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
        backgroundColor: backgroundColor || 'white',
        borderColor: borderColor || '#007bff',
        color: textColor || '#fff',
    };

    return (
        <button onClick={handleClick} style={buttonStyle} className="custom-button">
            {text}
        </button>
    );
}
export default Button;