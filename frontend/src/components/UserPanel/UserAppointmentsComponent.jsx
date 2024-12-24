import React, { useState, useEffect } from 'react';
import '../../styles/UserPanel/UserAppointmentsComponent.css';
import { useNavigate } from 'react-router-dom';
import { getUserAppointments } from '../../services/api';
import Button from '../Button';


const UserAppointmentsComponent = () => {
    const [appointments, setAppointments]= useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchAppointments = async () => {
            try{
                const data = await getUserAppointments();
                setAppointments(data);
            }catch(err){
                console.error('Error fetching appointments:', err)
            }finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    },[]);

    if (loading) {
        return <div>Ładowanie wizyt...</div>;
    }
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pl-PL', options);
    };

    return (
        <div className='user-appointments-component-container'>
            <div className='user-appointment-component-header'>Moje Wizyty</div>
            <div className='user-appointment-component-booking-button'>
                <Button 
                text='Umów się na wizytę'
                to='/umow-wizyte'
                backgroundColor="#3c74ef"
                borderColor="#3c74ef"
                textColor="white"
                />
            </div>
            <ul className="appointments-list">
                {appointments.map((appointment, index)=>(
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
                    </li>
                ))}
                
            </ul>
        </div>
    );
};

export default UserAppointmentsComponent;
