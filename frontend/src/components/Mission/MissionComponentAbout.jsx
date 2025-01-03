import React, { useEffect, useState } from 'react';
import missionData from '../../content/mission.json';
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
                <div className="help-field-photo">
                    <img 
                        src={missionData['mission-about']['photo-url']} 
                        alt={`${missionData['mission-about'].name}`} 
                    />
                </div>
                <div className='mission-component-text'>
                    {missionData['mission-about'].text}
                </div>
            </div>
        </div>
    );
}
export default MissionComponentAbout;