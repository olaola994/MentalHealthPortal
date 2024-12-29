import React from 'react';
import '../../styles/UserPanel/UserPanelComponent.css';
import { useNavigate } from 'react-router-dom';
import adminPanelElementsData from '../../content/adminPanel.json'

const AdminPanelComponent = () => {

    const navigate = useNavigate();
    const handleNavigation = (url) => {
        navigate(url);
    };

    return (
        <div className='user-panel-header-and-container'>
            <div className='user-panel-header'>Witaj w panelu Admina</div>
            <div className='user-panel-component-container'>
                <div className='user-panel-elements-container'>
                    {adminPanelElementsData['admin-panel-elements'].map((element,index)=>(
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

export default AdminPanelComponent;
