import React, {useState, useEffect} from 'react';
import '../styles/Home/HomeComponent.css';
import Button from '../components/Button.jsx';

const HomeComponent = () => {

    const [HomeData, setHomeData] = useState(null);
    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../content/home-${language}.json`);
                setHomeData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []);

    if (!HomeData) {
        return <></>;
    }

    return (
        <div className='home-component-container'>
            <div className='home-component-main-header'>
                {HomeData['main-header'].text}
            </div>
            <div className='home-component-sub-header'>
                {HomeData['sub-header'].text}
            </div>
            <div className='home-component-btn-and-second-sub-header'>
                <Button 
                text={HomeData.ctaButton.text}
                to='/specjalisci'
                backgroundColor="white" 
                borderColor="white" 
                textColor="#0a0a5c"
                />
                <div className='home-component-second-sub-header'>
                    {HomeData['second-sub-header'].text}
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
