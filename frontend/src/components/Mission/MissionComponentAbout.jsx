import React, {useEffect, useState} from 'react';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionAboutComponent.css';
import Button from '../Button';

const MissionComponentAbout = () => {

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
        <div className='mission-component-about-container'>
            <div className='mission-component-header'>
                {missionData['mission-about'].header}
            </div>
            <div className='mission-component-about-photo-and-text'>
                <div>
                    <img 
                        src={missionData['mission-about']['photo-url']} 
                        alt={`${missionData['mission-about'].name}`} 
                    />
                </div>
                <div className='mission-about-component-text'>
                    {missionData['mission-about'].text}
                </div>
            </div>
            <div>
                <Button 
                    text={missionData['mission-about'].ctaButton}
                    to='/specjalisci'
                    backgroundColor="#3c74ef"
                    borderColor="#3c74ef"
                    textColor="white"
                    />
            </div>
        </div>
    );
}
export default MissionComponentAbout;