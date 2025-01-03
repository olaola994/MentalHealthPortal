import React from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import missionData from '../../content/mission.json';
import Footer from '../../components/Footer';
import MissionComponentAbout from '../../components/Mission/MissionComponentAbout';

const MissionPage = () => {
    return (
        <div>
            <Navbar />
            <Header text={missionData['mission-header'].text}/>
            <MissionComponentAbout/>
            <Footer/>
        </div>
    );
};

export default MissionPage;
