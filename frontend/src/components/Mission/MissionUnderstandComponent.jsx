import React from 'react';
import missionData from '../../content/mission-pl.json';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionUnderstandComponent.css';
import Button from '../Button';

const MissionUnderstandComponent = () => {
    return(
        <div className='mission-understand-component-container'>
            <div className="help-field-photo">
                <img 
                    src={missionData['mission-understand']['photo-url']} 
                    alt={`${missionData['mission-understand'].name}`} 
                />
                </div>
            <div className='mission-component-header'>
                {missionData['mission-understand'].header}
            </div>
            <div className='mission-understand-component-text'>
                {missionData['mission-what-you-deserve'].text}
            </div>
            <div>
                <Button 
                    text={missionData['mission-understand'].ctaButton}
                    to='/specjalisci'
                    backgroundColor="#3c74ef"
                    borderColor="#3c74ef"
                    textColor="white"
                    />
            </div>
        </div>
    );
}
export default MissionUnderstandComponent;