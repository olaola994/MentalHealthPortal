import React, { useState, useEffect } from 'react';
import '../../styles/SpecialistPanel/SpecialistCalendarComponent.css';
import { addTimetableRecord, getSpecialistCalendar, deleteTimetableRecord } from '../../services/api';

const SpecialistCalendarComponent = () => {
    const [calendar, setCalendar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timetableRecordFormVisible, setTimetableRecordFormVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [timetableRecordData, setTimetableRecordData] = useState({
        week_day: '',
        time_from: '',
        time_to: '',
    });

    const daysInPolish = {
        Monday: "Poniedziałek",
        Tuesday: "Wtorek",
        Wednesday: "Środa",
        Thursday: "Czwartek",
        Friday: "Piątek",
        Saturday: "Sobota",
        Sunday: "Niedziela"
    };
    const groupAndSortCalendar = (data) => {
        const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const grouped = {};

        for (const item of data) {
            if (!grouped[item.dzien_tygdonia]) {
                grouped[item.dzien_tygdonia] = [];
            }
            grouped[item.dzien_tygdonia].push(item);
        }
    
        return daysOrder.map(day => ({ day, records: grouped[day] || [] }));
    };

    useEffect(()=> {
        const fetchCalendar = async () => {
            try{
                const data = await getSpecialistCalendar();
                console.log(data)
                const sortedAndGroupedData = groupAndSortCalendar(data);
                setCalendar(sortedAndGroupedData);
            }catch(err){
                console.error('Błąd podczas pobierania kalendarza:', err)
            }finally {
                setLoading(false);
            }
        };
        fetchCalendar();
    },[]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    const handleInputChange = (e) => {
        setTimetableRecordData({ ...timetableRecordData, [e.target.name]: e.target.value });
    };
    const handleInputTimeChange = (e) => {
        const { name, value } = e.target;
    
        const [hours, minutes] = value.split(':');
        const correctedValue = `${hours}:00`;
    
        if (minutes !== '00') {
            alert('Dostępne są tylko pełne godziny.');
        }
    
        setTimetableRecordData({ ...timetableRecordData, [name]: correctedValue });
    };
    
    
    const handleAddTimetableRecordSubmit = async (e) => {
        e.preventDefault();

        try{
            await addTimetableRecord(timetableRecordData);

            setMessage('Dodano rekord do kalendarza.');
            setTimetableRecordFormVisible(false);

            const updatedTimetable = await getSpecialistCalendar();
            const sortedAndGroupedData = groupAndSortCalendar(updatedTimetable);
            setCalendar(sortedAndGroupedData);
        }catch (err) {
            console.error('Błąd podczas dodawania terminu do kalendarza:', err.message);
            setMessage('Nie udało się dodać terminu do kalendarza. Konflikt godzin w kalendarzu');
        }
    }
    const handleDeleteTimetableRecord = async (timetableRecordId) => {
        console.log('Usuwanie terminu o ID:', timetableRecordId);
        if (!window.confirm(`Czy na pewno chcesz usunąć termin dostępności z kalendarza?`)) {
            return;
        }
        try{
            await deleteTimetableRecord(timetableRecordId);
            console.log('Termin dostępności został usunięty.'); 
            const updatedTimetable = await getSpecialistCalendar();
            const sortedAndGroupedData = groupAndSortCalendar(updatedTimetable);
            setCalendar(sortedAndGroupedData);
        }catch (err) {
            console.log('Nie udało się anulować wizyty.');
        }
    }

    return (
        <div className='specialist-calendar-component-container'>
            <button onClick={() => setTimetableRecordFormVisible(!timetableRecordFormVisible)}>
                {timetableRecordFormVisible ? 'Anuluj' : 'Dodaj termin'}
            </button>
            {timetableRecordFormVisible && (
                <form onSubmit={handleAddTimetableRecordSubmit} className="timetable-form">
                    <label>
                        Dzień tygodnia:
                        <select
                            name="week_day"
                            value={timetableRecordData.week_day}
                            onChange={handleInputChange}
                            required>
                            <option value="">Wybierz dzień</option>
                            {Object.entries(daysInPolish).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Godzina od:
                        <input
                            type="time"
                            name="time_from"
                            step="3600"
                            value={timetableRecordData.time_from}
                            onChange={handleInputTimeChange}
                            required/>
                    </label>
                    <label>
                        Godzina do:
                        <input
                            type="time"
                            name="time_to"
                            step="3600"
                            value={timetableRecordData.time_to}
                            onChange={handleInputTimeChange}
                            required/>
                    </label>
                    <button type="submit">Dodaj termin</button>
                </form>
            )}
            {message && <div className="message">{message}</div>}

             <ul className="calendar-list">
                {calendar.map((dayItem, index) => (
                <li key={index} className='calendar-item'>
                    <div className='appointment-week-day'>
                        {daysInPolish[dayItem.day] || dayItem.day}
                    </div>
                    {dayItem.records.map((subItem, subItemIndex) => (
                        <div key={subItemIndex} className='appointment-time'>
                            <div className='appointment-time-from'>
                                od: {subItem.od}
                            </div>
                            <div className='appointment-time-to'>
                                do: {subItem.do}
                            </div>
                            <button
                            onClick={() => handleDeleteTimetableRecord(subItem.id)}
                            >
                                Usuń
                            </button>
                        </div>
                    ))}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default SpecialistCalendarComponent;
