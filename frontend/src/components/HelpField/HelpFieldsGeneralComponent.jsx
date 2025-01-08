import React from 'react';
import helpFieldsData from '../../content/helpFields-pl.json';
import { useNavigate } from 'react-router-dom';
import '../../styles/HelpField/HelpFieldsGeneralComponent.css';
import Button from '../Button';

const HelpFieldsGeneralComponent = () => {
    return (
        <div className='help-fields-general-component-container'>
            <div className='help-fields-general-header'>{helpFieldsData['general-header']}</div>
            <div className='help-fields-general-sub-header'>{helpFieldsData['general-sub-header']}</div>
            <div className='help-fields-general-elements-container'>
                {helpFieldsData.fields.map((field, index) => (
                    <div key={index}>
                        <Button
                            text={field.name}
                            to={`/obszaryPomocy/${field.name}`}
                            backgroundColor="#fffaf3"
                            borderColor="#f5b761"
                            textColor="#f5b761"
                        />
                    </div>
                ))}
            </div>
            <div className='help-fields-general-component-more-button'>
            <Button text={helpFieldsData.ctaButton}
                to={`/obszaryPomocy`}
                backgroundColor="#3c74ef"
                borderColor="#3c74ef"
                textColor="white"
            />
            </div>
        </div>
    );
};

export default HelpFieldsGeneralComponent;
