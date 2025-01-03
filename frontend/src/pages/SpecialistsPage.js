import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SpecialistsComponent from '../components/SpecialistsComponent';
import Footer from '../components/Footer';

const SpecialistsPage = () => {
    return (
        <div>
            <Navbar/>
            <Header text="Nasi Specjaliści"/>
            <SpecialistsComponent />
            <Footer/>
        </div>
    );
};

export default SpecialistsPage;
