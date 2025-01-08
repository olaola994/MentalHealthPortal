import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import HelpFieldsComponent from '../../components/HelpField/HelpFieldsComponent';
import helpFieldsData from '../../content/helpFields-pl.json';
import Footer from '../../components/Footer';

const HelpFieldsPage = () => {
    return (
        <div>
            <Navbar />
            <Header text={helpFieldsData.header}/>
            <HelpFieldsComponent/>
            <Footer/>
        </div>
    );
};

export default HelpFieldsPage;
