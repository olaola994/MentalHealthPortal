import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import navbarData from '../content/navbar-pl.json';
import data from '../content/loginPanel-pl.json';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'pl');
    

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(localStorage.getItem('token') ? true : false);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
        window.location.reload();
    };


    const goToProfile = () => {
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
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/zarejestruj');
        }
    };

    return (
        <nav className="navbar">
            <a href={navbarData.name.url}>
                <div className="navbar-logo">{navbarData.name["brand-name"]}</div>
            </a>
            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                {navbarData.links.map((link, index) => (
                    <li key={index}>
                        <Link to={link.url}>{link.text}</Link>
                    </li>
                ))}
                <li>
                    {isLoggedIn ? (
                        <button onClick={goToProfile} className="navbar-profile-button">
                            Profil
                        </button>
                    ) : (
                        <div className='login-and-language-container'>
                            <Link to="/zarejestruj">{data.login}</Link>
                            <select 
                            className='language-select' 
                            onChange={handleLanguageChange}
                            value={language}> 
                                <option value='pl'>PL</option>
                                <option value='en'>EN</option>
                            </select>
                        </div>
                    )}
                </li>
            </ul>
            <div
                className={`navbar-toggle ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;
