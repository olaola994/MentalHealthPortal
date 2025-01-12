import React, { useEffect, useState } from 'react';
import { getSpecialists } from '../services/api';
import '../styles/Specialists/SpecialistsComponent.css';

const SpecialistsComponent = () => {
    const [specialists, setSpecialists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredSpecialists, setFilteredSpecialists] = useState([]);
    const [specializationFilter, setSpecializationFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const specialistsPerPage = 6;

    const [data, setData] = useState(null);

    useEffect(() => {
        const loadLanguageData = async () => {
            const language = localStorage.getItem('language') || 'pl'; 
            try {
                const data = await import(`../content/specialists-${language}.json`);
                setData(data);
            } catch (error) {
                console.error('Error loading language file:', error);
            }
        };
        loadLanguageData();
    }, []);


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

    if (!data) {
        return <></>;
    }

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
        setCurrentPage(1);
    };
    const totalSpecialists = filteredSpecialists.length;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let totalPages = Math.floor(totalSpecialists / specialistsPerPage);
    if (totalSpecialists % specialistsPerPage !== 0) {
        totalPages += 1;
    }

    // paginacja
    const lastIndexOnPage = currentPage * specialistsPerPage;
    const firstIndexOnPage = lastIndexOnPage - specialistsPerPage;

    const currentSpecialists = filteredSpecialists.slice(firstIndexOnPage, lastIndexOnPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button key={i} className={`pagination-button ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>
        );
    }

    return (
            <div className='specialists-container'>
                <div className='filter-container'>
                <label htmlFor="specializationFilter">{data['specialization-filter']}:</label>
                <select
                    id="specializationFilter"
                    value={specializationFilter}
                    onChange={handleFilterChange}
                >
                    <option value="">{data['all-specializations-filter']}</option>
                    <option value="Psycholog">{data['psychologist-filter']}</option>
                    <option value="Psychiatra">{data['psychiatric-filter']}</option>
                    <option value="Terapeuta">{data['therapist-filter']}</option>
                </select>
                </div>

                <ul>
                {currentSpecialists.map((specialist, index) => (
                    <li key={index}>
                        <img 
                            src={specialist.sciezka} 
                            alt={`${specialist.imie} ${specialist.nazwisko}`} 
                            className="specialist-photo"
                        />
                        <div className='specialist-description-container'>
                            <div className='specialist-name-and-surname'>{specialist.imie} {specialist.nazwisko}</div>
                            <div className='specialist-specialization'>                            
                                {localStorage.getItem('language') === 'en' ? specialist.specjalizacjaEN : specialist.specjalizacja}
                            </div>
                            <div className='specialist-description'>
                            {localStorage.getItem('language') === 'en' ? specialist.opisEN : specialist.opis}
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
                <div className="pagination-container">
                    {pages}
                </div>
            </div>
    );
};

export default SpecialistsComponent;
