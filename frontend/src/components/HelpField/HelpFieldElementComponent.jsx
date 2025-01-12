import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Header from '../Header';
import '../../styles/HelpField/HelpFieldElementComponent.css';
import Footer from '../Footer';


const HelpFieldElementComponent = () => {
    const [helpFieldsData, setHelpFieldsData] = useState(null);
    const { path } = useParams();

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../../content/helpFields-${language}.json`);
                setHelpFieldsData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []);

    if (!helpFieldsData) {
        return <></>;
    }


    const field = helpFieldsData.fields.find((field) => field.path === path);

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
                {/* <div className="help-field-photo">
                <img 
                    src={field['photo-url']}
                    className="obszarPomocy"
                />
                </div> */}
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
        <Footer/>
        </>
    );
};

export default HelpFieldElementComponent;
