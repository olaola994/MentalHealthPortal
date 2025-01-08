import React, { useState, useEffect } from 'react';
import '../../styles/UserPanel/UserPanelComponent.css';
import { useNavigate } from 'react-router-dom';

const UserPanelComponent = () => {
    const [userData, setUserData] = useState(null);
    const [userPanelElementsData, setUserPanelElementsData] = useState(null);

    const navigate = useNavigate();

    const loadLanguageFile = async (fileName) => {
        const language = localStorage.getItem('language') || 'pl';
        try {
            const data = await import(`../../content/${fileName}-${language}.json`);
            return data;
        } catch (error) {
            console.error(`Error loading ${fileName} language file:`, error);
            return null;
        }
    };

    useEffect(() => {
        const loadLanguageData = async () => {
            const userData = await loadLanguageFile('userInfo');
            const panelElementsData = await loadLanguageFile('userPanel');
            setUserData(userData);
            setUserPanelElementsData(panelElementsData);
        };
        loadLanguageData();
    }, []);

    if (!userData || !userPanelElementsData) {
        return <></>;
    }

    const handleNavigation = (url) => {
        navigate(url);
    };

    return (
        <div className="user-panel-header-and-container">
            <div className="user-panel-header">{userData['welcome-to-patient-panel']}</div>
            <div className="user-panel-component-container">
                <div className="user-panel-elements-container">
                    {userPanelElementsData['user-panel-elements'].map((element, index) => (
                        <div
                            key={index}
                            className="user-panel-element"
                            onClick={() => handleNavigation(element.url)}
                        >
                            <div className="user-panel-title">{element.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <img src="/images/user-panel-photo.png" alt="User panel" />
        </div>
    );
};

export default UserPanelComponent;
