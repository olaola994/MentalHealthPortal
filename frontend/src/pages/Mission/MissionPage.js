import React from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import missionData from '../../content/mission-pl.json';
import Footer from '../../components/Footer';
import MissionComponentAbout from '../../components/Mission/MissionComponentAbout';
import MissionStatisticsComponent from '../../components/Mission/MissionStatisticsComponent';
import MissionChallengesComponent from '../../components/Mission/MissionChallengesComponent';
import MissionUnderstandComponent from '../../components/Mission/MissionUnderstandComponent';
import MissionDeserveComponent from '../../components/Mission/MissionDeserveComponent';

const MissionPage = () => {
    return (
        <div>
            <Navbar />
            <Header text={missionData['mission-header'].text}/>
            <MissionComponentAbout/>
            <MissionStatisticsComponent/>
            <MissionChallengesComponent/>
            <MissionUnderstandComponent/>
            <MissionDeserveComponent/>
            <Footer/>
        </div>
    );
};

export default MissionPage;
