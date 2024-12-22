import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SpecialistsComponent from '../components/SpecialistsComponent';

const SpecialistsPage = () => {
    return (
        <div>
            <Navbar/>
            <Header text="Nasi Specjalisci"/>
            <SpecialistsComponent />
        </div>
    );
};

export default SpecialistsPage;
