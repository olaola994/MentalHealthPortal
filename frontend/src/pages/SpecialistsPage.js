import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SpecialistsComponent from '../components/SpecialistsComponent';
import Footer from '../components/Footer';

const SpecialistsPage = () => {

    const [header, setHeader] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../content/headers-${language}.json`);
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
            <Navbar/>
            <Header text={header.specialists}/>
            <SpecialistsComponent />
            <Footer/>
        </div>
    );
};

export default SpecialistsPage;
