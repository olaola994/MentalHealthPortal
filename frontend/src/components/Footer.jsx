import React from 'react';
import '../styles/Footer.css';
import FooterData from '../content/footer.json';

const Footer = () => {

    return (
        <div className='footer-container'>
            <div className='footer-element'>
                <div className="footer-line"></div>
                <div className="footer-text">{FooterData.footer['footer-contact-numbers']}</div>
            </div>
            <div className='footer-element'>
                <div className="footer-line"></div>
                <div className="footer-text">{FooterData.footer['footer-bottom-section']}</div>
            </div>
        </div>
    );
}
export default Footer;