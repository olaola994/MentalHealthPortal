import React from 'react';
import '../styles/Home/HomeComponent.css';
import HomeData from '../content/home.json';
import Button from '../components/Button.jsx';

const HomeComponent = () => {
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
