import React, { useEffect, useState } from 'react';
import '../styles/Promotion/PromotionComponent.css';
import Button from './Button';

const PromotionComponent = () => {
    const [promotionData, setPromotionData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../content/promotion-${language}.json`);
                setPromotionData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []);

    useEffect(() => {
        if (promotionData?.['animated-text']?.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionData['animated-text'].length);
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [promotionData]);

    if (!promotionData) {
        return <div className="loading">Ładowanie promocji...</div>;
    }

    const animatedTexts = promotionData['animated-text'] || [];

    return (
        <div className='promotion-component-container'>
            <div className='promotion-comoponent-header'>
                {promotionData['promotion-header']}
            </div>
            <div className='promotion-comoponent-sub-header'>
                {promotionData['promotion-sub-header']}
            </div>
            <div className='promotion-photo-and-text-container'>
                {promotionData['promotion-elements'].map((element, index) => (
                    <div key={index} className='promotion-photo-and-text-item'>
                        <img
                            src={element['photo-url']}
                            alt={element['text-header']}
                            className='promotion-photo'
                        />
                        <div className='promotion-text'>
                            <div className='promotion-text-header'>{element['text-header']}</div>
                            <div className='promotion-text-description'>{element['text']}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="line"></div>
            <div className="animated-text-container">
                {animatedTexts.length > 0 && (
                    <>
                        <div className="animated-text">
                            <span className="text active">{animatedTexts[currentIndex]?.mainText}</span>
                        </div>
                        <div className="sub-text">{animatedTexts[currentIndex]?.subText}</div>
                    </>
                )}
            </div>
            <Button 
                text={promotionData.ctaButton}
                to='/specjalisci'
                backgroundColor="#3c74ef"
                borderColor="#3c74ef"
                textColor="white"
            />
        </div>
    );
};

export default PromotionComponent;
