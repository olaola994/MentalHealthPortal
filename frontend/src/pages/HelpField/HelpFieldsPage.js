import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import HelpFieldsComponent from '../../components/HelpField/HelpFieldsComponent';
import Footer from '../../components/Footer';

const HelpFieldsPage = () => {

    const [header, setHeader] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../../content/helpFields-${language}.json`);
                setHeader(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    });

    if (!header) {
        return <></>;
    }
    return (
        <div>
            <Navbar />
            <Header text={header.header}/>
            <HelpFieldsComponent/>
            <Footer/>
        </div>
    );
};

export default HelpFieldsPage;
