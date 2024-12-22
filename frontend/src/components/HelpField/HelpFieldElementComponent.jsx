import React from 'react';
import { useParams } from 'react-router-dom';
import helpFieldsData from '../../content/helpFields.json';
import Navbar from '../../components/Navbar';
import Header from '../Header';
import '../../styles/HelpField/HelpFieldElementComponent.css';


const HelpFieldElementComponent = () => {
    const { name } = useParams();

    const field = helpFieldsData.fields.find((field) => field.name === name);

    if (!field) {
        return <p>Nie znaleziono danych dla tego tematu.</p>;
    }

    return (
        <>
        <Navbar/>
        <Header text={field['description-header']} subText={field.description}/>
        <div className="help-field-detail-container">
            <div className="help-field-section1">
                <div className="help-field-question1">{field.question1}</div>
                <div className="help-field-answer1">{field.answer1}</div>
            </div>
            <div className="help-field-section2">
                <div className="help-field-photo">
                <img 
                    src={field['photo-url']} 
                    alt={`${field.name}`} 
                    className="obszarPomocy"
                />
                </div>
                <div className="help-field-question2-and-answer2">
                    <div className="help-field-question2">{field.question2}</div>
                    <div className="help-field-answer2">{field.answer2}</div>
                </div>
            </div>
            <div className="help-field-section3">
                <div className="help-field-question3">{field.question3}</div>
                <div className="help-field-answer3">{field.answer3}</div>
            </div>
        </div>
        </>
    );
};

export default HelpFieldElementComponent;
