import React from 'react';
import missionData from '../../content/mission.json';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionStatisticsComponent.css';

const MissionStatisticsComponent = () => {
    return(
        <div className='mission-statistics-component-container'>
            <div className='mission-statistics-component-text'>{missionData['mission-statistics'].text}</div>
            <div className='mission-statistics-component-links'>
                {missionData['mission-statistics'].links.map((link, index) => (
                        <li>
                            <a 
                                key={index} 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
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