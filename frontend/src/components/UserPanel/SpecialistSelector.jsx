import React from 'react';
import userData from '../../content/userInfo-pl.json'

const SpecialistSelector = ({ specialists, onSpecialistSelect, selectedSpecialist }) => {
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
