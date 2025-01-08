import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
import footerData from '../content/footer-pl.json';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../content/footer-${language}.json`);
                setFooterData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []);

    if (!footerData) {
        return <div className="loading">Ładowanie danych...</div>;
    }

    return (
        <div className='footer-container'>
            <div className='footer-element'>
                <div className="footer-line"></div>
                <div className="footer-text">{footerData.footer['footer-contact-numbers']}</div>
            </div>
            <div className='footer-element'>
                <div className="footer-line"></div>
                <div className="footer-text">{footerData.footer['footer-bottom-section']}</div>
            </div>
        </div>
    );
}
export default Footer;