import React, { useState, useEffect } from 'react';


const SpecialistsAvailabilityComponent = () => {
    const [specialists, setSpecialists] = useState([]);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/specjalisci');
                const data = await response.json();
                setSpecialists(data);
            } catch (error) {
                console.error('Error fetching specialists:', error);
            }
        };
        fetchSpecialists();
    }, []);

    const handleSpecialistSelect = async (specialistId) => {
        setSelectedSpecialist(specialistId);
        try {
            const response = await fetch(`http://localhost:3001/api/specjalisci/${specialistId}/availability`);
            const data = await response.json();
            setAvailability(data);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    return (
        <div className='specialists-availability-component'>
            <h2>Zarezerwuj nowy termin sesji</h2>
            <p>Wybierz specjalistę z listy poniżej oraz dogodny termin sesji.</p>
            
            <div className="specialists-container">
                <select
                    onChange={(e) => handleSpecialistSelect(e.target.value)}
                    value={selectedSpecialist || ''}
                >
                    <option value="" disabled>Wybierz specjalistę</option>
                    {specialists.map((specialist) => (
                        <option key={specialist.id} value={specialist.id}>
                            {specialist.name} {specialist.surname} - {specialist.specialization}
                        </option>
                    ))}
                </select>

                {selectedSpecialist && (
                    <div className="availability-container">
                        <h3>Dostępność</h3>
                        <ul>
                            {availability.map((slot, index) => (
                                <li key={index}>
                                    {slot.date} - {slot.time_from} do {slot.time_to} 
                                    <button>Zarezerwuj</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecialistsAvailabilityComponent;
