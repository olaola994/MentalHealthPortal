import React, { useState, useEffect } from 'react';
import { getSpecialists, getSpecialistAvailableSlots } from '../../services/api';
import SpecialistSelector from './SpecialistSelector';
import '../../styles/UserPanel/SpecialistsAvailabilityComponent.css';
import { bookAppointment } from '../../services/api';


const SpecialistsAvailabilityComponent = () => {
    const [specialists, setSpecialists] = useState([]);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [appointmentDuration, setAppointmentDuration] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const data = await getSpecialists();
                setSpecialists(data);
            } catch (error) {
                console.error('Błąd pobierania listy specjalistów:', error.message);
            }
        };
        fetchSpecialists();
    }, []);

    const fetchAvailableSlots = async (specialistId, date) => {
        console.log('specialistId:', specialistId, 'date:', date); 
        try {
            const slots = await getSpecialistAvailableSlots(specialistId, date);
            if (slots.length === 0) {
                console.log('Brak dostępnych terminów dla tego specjalisty w tym dniu.');
                setAvailableSlots([]);
            } else {
                setAvailableSlots(slots);
            }
        } catch (error) {
            console.error('Błąd pobierania dostępnych terminów:', error.message);
            setAvailableSlots([]);
        }
    };

    const handleSpecialistSelect = async (specialistId) => {
        setSelectedSpecialist(specialistId);
        if (selectedDate) {
            await fetchAvailableSlots(specialistId, selectedDate);
        }
    };

    const handleDateChange = async (date) => {
        
        setSelectedDate(date);
        if (selectedSpecialist) {
            await fetchAvailableSlots(selectedSpecialist, date);
        }
    };
    const handleSlotSelect = (slot) =>{
        setSelectedSlot(slot);
    }
    const handleBookAppointment = async () => {
        if (!selectedSlot || !appointmentDuration) {
            setMessage('Proszę wybrać termin oraz długość wizyty.');
            return;
        }

        const currentDateTime = new Date();
        const selectedDateTime = new Date(`${selectedDate}T${selectedSlot}:00`);
        if (selectedDateTime <= currentDateTime) {
            setMessage('Nie można zarezerwować wizyty w przeszłości.');
            return;
        }
    
        try {
            const response = await bookAppointment({
                specialistId: selectedSpecialist,
                dateTime: `${selectedDate}T${selectedSlot}:00`,
                duration: appointmentDuration,
            });
            setMessage(response.message);
            await fetchAvailableSlots(selectedSpecialist, selectedDate);

            setSelectedSlot('');
            setAppointmentDuration('');
        } catch (error) {
            setMessage('Wystąpił błąd podczas rezerwacji.');
        }
    };

    
    return (
        <div className='specialists-availability-component'>
            <div className='specialists-availability-component-header'>Zarezerwuj nowy termin sesji</div>
            <div className='specialists-availability-component-sub-header'>Wybierz specjalistę oraz datę, aby zobaczyć dostępne terminy.</div>
            
            <div className="selector-and-availability-container">
                <SpecialistSelector 
                    specialists={specialists} 
                    onSpecialistSelect={handleSpecialistSelect} 
                    selectedSpecialist={selectedSpecialist}/>
                <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(e.target.value)}/>

                {availableSlots.length > 0 ? (
                    <div className="available-booking-container">
                        <div className='available-booking-container-header'>Dostępne terminy</div>
                        <ul>
                            {availableSlots.map((slot, index) => (
                                <li key={index}>
                                    <button onClick={() => handleSlotSelect(slot)}>{slot}</button>
                                </li>
                            ))}
                        </ul>
                        {selectedSlot && (
                            <div>
                                <p>Wybrany termin: {selectedSlot}</p>
                                <label>Długość wizyty: </label>
                                <select
                                    onChange={(e) => setAppointmentDuration(e.target.value)}
                                    value={appointmentDuration}>
                                    <option value="">Wybierz</option>
                                    <option value="30">30 minut</option>
                                    <option value="45">45 minut</option>
                                    <option value="60">60 minut</option>
                                </select>
                                <button onClick={handleBookAppointment}>Zarezerwuj</button>
                            </div>
                        )}
                    </div>
                ) : (
                    selectedDate && (
                        <div className='not-available-booking-container-header'>Brak dostępnych terminów dla tego specjalisty w wybranym dniu.</div>
                    )
                )}
            </div>
        </div>
    );
};

export default SpecialistsAvailabilityComponent;
