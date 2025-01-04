import React from 'react';
import missionData from '../../content/mission.json';
import '../../styles/Mission/MissionGeneralComponent.css';
import '../../styles/Mission/MissionAboutComponent.css';
import '../../styles/Mission/MissionChallengesComponent.css';
import Button from '../Button';

const MissionChallengesComponent = () => {
    return(
        <div className='mission-component-challenges-container'>
            <div className='mission-component-header'>
                {missionData['mission-challenges'].header}
            </div>
            <div className='mission-challenges-component-text'>
                {missionData['mission-about'].text}
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