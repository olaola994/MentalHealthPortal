import React, {useState, useEffect} from 'react';
import '../../styles/HelpField/HelpFieldsGeneralComponent.css';
import Button from '../Button';

const HelpFieldsGeneralComponent = () => {

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

    return (
        <div className='help-fields-general-component-container'>
            <div className='help-fields-general-header'>{helpFieldsData['general-header']}</div>
            <div className='help-fields-general-sub-header'>{helpFieldsData['general-sub-header']}</div>
            <div className='help-fields-general-elements-container'>
                {helpFieldsData.fields.map((field, index) => (
                    <div key={index}>
                        <Button
                            text={field.name}
                            to={`/obszaryPomocy/${field.path}`}
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
