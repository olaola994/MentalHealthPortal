import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home/HomePage.css';
import HomeComponent from '../components/HomeComponent';
import HelpFieldsGeneralComponent from '../components/HelpField/HelpFieldsGeneralComponent';
import PromotionComponent from '../components/PromotionComponent';

function HomePage() {
    return (
        <>
        <div className='home-section'>
            <Navbar />
            <HomeComponent/>
        </div>
        <HelpFieldsGeneralComponent/>
        <PromotionComponent/>
        </>
    );
}

export default HomePage;
