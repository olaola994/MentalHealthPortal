import React, { useState } from 'react';
import '../styles/Header.css';

const Header = ({ text, subText }) => {

    return (
        <div className='header-container'>
            <div className='header-text'>{text}</div>
            <div className='header-sub-text'>{subText}</div>
            
        </div>
    );
}
export default Header;