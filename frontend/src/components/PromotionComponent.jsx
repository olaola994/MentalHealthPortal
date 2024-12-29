import React, { useEffect, useState } from 'react';
import promotionData from '../content/promotion.json';
import '../styles/Promotion/PromotionComponent.css';
import Button from './Button';

const PromotionComponent = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const animatedTexts = promotionData['animated-text'];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % animatedTexts.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [animatedTexts.length]);

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
                <div className="animated-text">
                    <span className="text active">{animatedTexts[currentIndex].mainText}</span>
                </div>
                <div className="sub-text">{animatedTexts[currentIndex].subText}</div>
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
