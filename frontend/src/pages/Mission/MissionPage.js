import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MissionComponentAbout from '../../components/Mission/MissionComponentAbout';
import MissionStatisticsComponent from '../../components/Mission/MissionStatisticsComponent';
import MissionChallengesComponent from '../../components/Mission/MissionChallengesComponent';
import MissionUnderstandComponent from '../../components/Mission/MissionUnderstandComponent';
import MissionDeserveComponent from '../../components/Mission/MissionDeserveComponent';

const MissionPage = () => {

    const [missionData, setMissionData] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../../content/mission-${language}.json`);
                setMissionData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    });

    if (!missionData) {
        return <></>;
    }

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
