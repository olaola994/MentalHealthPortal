import React, { useState, useEffect } from 'react';
import '../../styles/UserPanel/UserAppointmentsComponent.css';
import { getSpecialistAppointments, cancelAppointment} from '../../services/api';

const SpecialistAppointmentsComponent = () => {
    const [appointments, setAppointments]= useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(()=> {
        const fetchAppointments = async () => {
            try{
                const data = await getSpecialistAppointments();
                setAppointments(data);
            }catch(err){
                console.error('Błąd podczas pobierania danych wizyt:', err)
            }finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    },[]);

    if (loading) {
        return <div>Ładowanie danych...</div>;
    }
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pl-PL', options);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const filteredAppointments = appointments.filter((appointment) => 
        selectedStatus === '' || appointment.status === selectedStatus
    );

    const handleCancelAppointment = async (appointmentId) => {
        console.log('Usuwanie wizyty o ID:', appointmentId); 
        if (!window.confirm(`Czy na pewno chcesz odwołać tą wizytę?`)) {
            return;
        }
        try{
            await cancelAppointment(appointmentId);
            console.log('Wizyta została pomyślnie anulowana.'); 
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId)
            );
        }catch (err) {
            console.log('Nie udało się anulować wizyty.');
        }
    }
    

    return (
        <div className='user-appointments-component-container'>
            <div className='user-appointment-component-header'>Moje Wizyty</div>
            <div className="filter-container">
                <label htmlFor="status-filter">Status:</label>
                <select
                    id="status-filter"
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}>
                    <option value="">Wszystkie</option>
                    <option value="Zaplanowana">Zaplanowane</option>
                    <option value="Zakończona">Zakończone</option>
                </select>
            </div>

            {filteredAppointments.length > 0 ? (
            <ul className="appointments-list">
                {filteredAppointments.map((appointment, index) => (
                    <li key={index} className='appointment-item'>
                        <div className='appointment-date'>
                            data: {formatDate(appointment.data)}
                        </div>
                        <div className='appointment-specialist-name'>
                            imie: {appointment.imie}
                        </div>
                        <div className='appointment-specialist-surname'>
                            nazwisko: {appointment.nazwisko}
                        </div>
                        <div className='appointment-specialist-specialization'>
                            specjalizacja: {appointment.specjalizacja}
                        </div>
                        <div className='appointment-duration'>
                            czas trwania: {appointment.czas_trwania} minut
                        </div>
                        <div className='appointment-status'>
                            status: {appointment.status}
                        </div>
                        {appointment.status !== 'Zakończona' && (
                        <button className='cancel-booking-button' onClick={() => handleCancelAppointment(appointment.id)}>Odwołaj wizytę</button>
                        )}
                    </li>
                ))}
            </ul>
        ) : (
            <div className="no-appointments">
                Nie masz jeszcze wizyt.
            </div>
        )}
        </div>
    );
};

export default SpecialistAppointmentsComponent;
