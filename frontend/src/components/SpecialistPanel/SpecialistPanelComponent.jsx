import React from 'react';
import '../../styles/SpecialistPanel/SpecialistPanelComponent.css';
import { useNavigate } from 'react-router-dom';
import specialistPanelElementsData from '../../content/specialistPanel.json'
import { getUserAppointments} from '../../services/api';

const SpecialistPanelComponent = () => {

    const navigate = useNavigate();
    const handleNavigation = (url) => {
        navigate(url);
    };

    return (
        <div className='user-panel-header-and-container'>
            <div className='user-panel-header'>Witaj w panelu Specjalisty</div>
            <div className='user-panel-component-container'>
                <div className='user-panel-elements-container'>
                    {specialistPanelElementsData['specialist-panel-elements'].map((element,index)=>(
                        <div key={index} className='user-panel-element' onClick={() => handleNavigation(element.url)}>
                            <div className='user-panel-title'>{element.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <img src="/images/user-panel-photo.png"></img>
        </div>
    );
};

export default SpecialistPanelComponent;
