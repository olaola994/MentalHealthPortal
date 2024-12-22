import React, { useEffect, useState } from 'react';
import { getSpecialists } from '../services/api';
import '../styles/Specialists/SpecialistsComponent.css';

const SpecialistsComponent = () => {
    const [specialists, setSpecialists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredSpecialists, setFilteredSpecialists] = useState([]);
    const [specializationFilter, setSpecializationFilter] = useState('');

    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const data = await getSpecialists();
                setSpecialists(data);
                setFilteredSpecialists(data);
            } catch (err) {
                console.error('Error fetching specialists:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecialists();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleFilterChange = (event) => {
        const selectedSpecialization = event.target.value;
        setSpecializationFilter(selectedSpecialization);

        if (selectedSpecialization === '') {
            setFilteredSpecialists(specialists);
        } else {
            setFilteredSpecialists(
                specialists.filter(specialist => 
                    specialist.specjalizacja.toLowerCase() === selectedSpecialization.toLowerCase()
                )
            );
        }
    };

    return (
            <div className='specialists-container'>
                <div className='filter-container'>
                <label htmlFor="specializationFilter">Filtruj po specjalizacji:</label>
                <select
                    id="specializationFilter"
                    value={specializationFilter}
                    onChange={handleFilterChange}
                >
                    <option value="">Wszystkie</option>
                    <option value="Psycholog">Psycholog</option>
                    <option value="Psychiatra">Psychiatra</option>
                    <option value="Terapeuta">Terapeuta</option>
                </select>
                </div>

                <ul>
                {filteredSpecialists.map((specialist, index) => (
                    <li key={index}>
                        <img 
                            src={specialist.sciezka} 
                            alt={`${specialist.imie} ${specialist.nazwisko}`} 
                            className="specialist-photo"
                        />
                        <div className='specialist-description-container'>
                            <div className='specialist-name-and-surname'>{specialist.imie} {specialist.nazwisko}</div>
                            <div className='specialist-specialization'>{specialist.specjalizacja}</div>
                            <div className='specialist-description'>{specialist.opis}</div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
    );
};

export default SpecialistsComponent;
