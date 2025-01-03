import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home/HomePage.css';
import HomeComponent from '../components/HomeComponent';
import HelpFieldsGeneralComponent from '../components/HelpField/HelpFieldsGeneralComponent';
import PromotionComponent from '../components/PromotionComponent';
import Footer from '../components/Footer';

function HomePage() {
    return (
        <>
        <div className='home-section'>
            <Navbar />
            <HomeComponent/>
        </div>
        <HelpFieldsGeneralComponent/>
        <PromotionComponent/>
        <Footer/>
        </>
    );
}

export default HomePage;
