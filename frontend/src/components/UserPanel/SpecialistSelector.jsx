import React, { useState, useEffect } from 'react';

const SpecialistSelector = ({ specialists, onSpecialistSelect, selectedSpecialist }) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../../content/userInfo-${language}.json`);
                setUserData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []);

    if (!userData) {
        return <></>;
    }

    return (
        <div className="specialist-selector">
            <select
                onChange={(e) => onSpecialistSelect(e.target.value)}
                value={selectedSpecialist || ''}
            >

                <option value="" disabled>{userData.texts.chooseSpecialist}</option>
                {specialists.map((specialist) => (
                    <option key={specialist.id} value={specialist.id}>
                        {specialist.imie} {specialist.nazwisko} - {specialist.specjalizacja}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SpecialistSelector;
