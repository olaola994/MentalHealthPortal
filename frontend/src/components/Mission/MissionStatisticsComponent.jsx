import React, {useEffect, useState} from 'react';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionStatisticsComponent.css';

const MissionStatisticsComponent = () => {

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
    }, []);

    if (!missionData) {
        return <></>;
    }
    return(
        <div className='mission-statistics-component-container'>
            <div className='mission-statistics-component-text'>{missionData['mission-statistics'].text}</div>
            <div className='mission-statistics-component-links'>
                {missionData['mission-statistics'].links.map((link, index) => (
                        <li>
                            <a 
                                key={index} 
                                href={link}
                                className='mission-statistics-link'>
                                {link}
                            </a>
                        </li>
                    ))}
            </div>
        </div>
    );
}
export default MissionStatisticsComponent;