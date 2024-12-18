import React, { useState } from 'react';
import '../styles/Navbar.css';
import navbarData from '../content/navbar.json';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <a href={navbarData.name.url}>
                <div className="navbar-logo">{navbarData.name["brand-name"]}</div>
            </a>
            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                {navbarData.links.map((link, index) => (
                    <li key={index}>
                        <a href={link.url}>{link.text}</a>
                    </li>
                ))}
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