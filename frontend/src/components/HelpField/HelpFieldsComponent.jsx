import React from 'react';
import helpFieldsData from '../../content/helpFields.json';
import { useNavigate } from 'react-router-dom';
import '../../styles/HelpField/HelpFieldsComponent.css';
import Button from '../Button';

const HelpFieldsComponent = () => {
    const navigate = useNavigate();

    const handleReadMore = (name) => {
        navigate(`/obszaryPomocy/${name}`);
    }

    return (
        <div className='help-fields-component-container'>
            <div className='help-fields-sub-header'>{helpFieldsData['sub-header']}</div>
            <div className='help-fields-elements-container'>
                {helpFieldsData.fields.map((field, index) => (
                    <div key={index} className="help-field">
                        
                        <div className="help-field-title">{field.name}</div>
                        <div className="help-field-description">
                            {field.description.substring(0, 400)}...
                        </div>
                        
                        <Button
                            text="Czytaj więcej"
                            onClick={() => handleReadMore(field.name)}
                            backgroundColor='#f5b761'
                            borderColor="#f5b761"
                            textColor="white"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpFieldsComponent;
