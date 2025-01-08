import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/HelpField/HelpFieldsComponent.css';
import Button from '../Button';

const HelpFieldsComponent = () => {
    const navigate = useNavigate();

    const [helpFieldsData, setHelpFieldsData] = useState(null);

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

    const handleReadMore = (path) => {
        navigate(`/obszaryPomocy/${path}`);
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
                            text={helpFieldsData.readMoreButton}
                            onClick={() => handleReadMore(field.path)}
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
