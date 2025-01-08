import React, {useEffect, useState} from 'react';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionDeserveComponent.css';
import Button from '../Button';

const MissionDeserveComponent = () => {

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
        <div className='mission-deserve-component-container'>
            <div className='mission-component-header'>
                {missionData['mission-what-you-deserve'].header}
            </div>
            <div className='mission-deserve-component-photo-and-text'>
                <div className='mission-about-component-text'>
                    {missionData['mission-what-you-deserve'].text}
                </div>
                <div>
                    <img 
                        src={missionData['mission-what-you-deserve']['photo-url']} 
                    />
                </div>
            </div>
            <div>
                <Button 
                    text={missionData['mission-what-you-deserve'].ctaButton}
                    to='/specjalisci'
                    backgroundColor="#3c74ef"
                    borderColor="#3c74ef"
                    textColor="white"
                    />
            </div>
        </div>
    );
}
export default MissionDeserveComponent;