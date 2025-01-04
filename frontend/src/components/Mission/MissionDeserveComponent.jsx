import React from 'react';
import missionData from '../../content/mission.json';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionDeserveComponent.css';
import Button from '../Button';

const MissionDeserveComponent = () => {
    return(
        <div className='mission-deserve-component-container'>
            <div className='mission-component-header'>
                {missionData['mission-about'].header}
            </div>
            <div className='mission-deserve-component-photo-and-text'>
                <div className='mission-about-component-text'>
                    {missionData['mission-about'].text}
                </div>
                <div>
                    <img 
                        src={missionData['mission-what-you-deserve']['photo-url']} 
                        alt={`${missionData['mission-about'].name}`} 
                    />
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
export default MissionDeserveComponent;