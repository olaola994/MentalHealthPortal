import React, {useEffect, useState} from 'react';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionAboutComponent.css';
import '../../styles/Mission/MissionChallengesComponent.css';
import Button from '../Button';

const MissionChallengesComponent = () => {

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
        <div className='mission-component-challenges-container'>
            <div className='mission-component-header'>
                {missionData['mission-challenges'].header}
            </div>
            <div className='mission-challenges-component-text'>
                {missionData['mission-challenges'].text}
            </div>
            <div>
                <Button 
                    text={missionData['mission-challenges'].ctaButton}
                    to='/specjalisci'
                    backgroundColor="#f5b761"
                    borderColor="#f5b761"
                    textColor="#ffffff"
                    />
            </div>
        </div>
    );
}
export default MissionChallengesComponent;