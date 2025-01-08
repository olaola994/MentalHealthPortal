import React from 'react';
import missionData from '../../content/mission-pl.json';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionAboutComponent.css';
import Button from '../Button';

const MissionComponentAbout = () => {
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