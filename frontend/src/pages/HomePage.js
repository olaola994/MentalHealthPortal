import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home/HomePage.css';
import HomeComponent from '../components/HomeComponent';

function HomePage() {
    return (
        <div className='home-section'>
            <Navbar />
            <HomeComponent/>
        </div>
    );
}

export default HomePage;
