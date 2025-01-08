import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'pl');
    const [navbarData, setNavbarData] = useState(null);
    const [loginPanelData, setLoginPanelData] = useState(null);

    const navigate = useNavigate();

    const loadLanguageFile = async (fileName) => {
        try {
            const data = await import(`../content/${fileName}-${language}.json`);
            return data;
        } catch (error) {
            console.error(`Error loading ${fileName} language file:`, error);
            return null;
        }
    };

    useEffect(() => {
        const loadLanguageData = async () => {
            const navbarData = await loadLanguageFile('navbar');
            const loginPanelData = await loadLanguageFile('loginPanel');
            setNavbarData(navbarData);
            setLoginPanelData(loginPanelData);
        };
        loadLanguageData();
    }, [language]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = async (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);

        const navbarData = await loadLanguageFile('navbar');
        const loginPanelData = await loadLanguageFile('loginPanel');
        setNavbarData(navbarData);
        setLoginPanelData(loginPanelData);
    };

    const goToProfile = () => {
        const role = localStorage.getItem('role');
        if (role === 'Admin') {
            navigate('/admin-panel');
        } else if (role === 'Patient') {
            navigate('/user-panel');
        } else if (role === 'Specialist') {
            navigate('/specialist-panel');
        } else {
            alert('Nieznana rola. Zaloguj się ponownie.');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/zarejestruj');
        }
    };

    if (!navbarData || !loginPanelData) {
        return <div>Ładowanie danych...</div>;
    }

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
                        <div className="login-and-language-container">
                            <Link to="/zarejestruj">{loginPanelData.login}</Link>
                            <select
                                className="language-select"
                                onChange={handleLanguageChange}
                                value={language}>
                                <option value="pl">PL</option>
                                <option value="en">EN</option>
                            </select>
                        </div>
                    )}
                </li>
            </ul>
            <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;
