import React, { useState, useEffect } from 'react';
import '../../styles/SpecialistPanel/SpecialistCalendarComponent.css';
import { addTimetableRecord, getSpecialistCalendar } from '../../services/api';

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
    
    const handleAddTimetableRecordSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await addTimetableRecord(timetableRecordData);

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
                            value={timetableRecordData.time_from}
                            onChange={handleInputChange}
                            required/>
                    </label>
                    <label>
                        Godzina do:
                        <input
                            type="time"
                            name="time_to"
                            value={timetableRecordData.time_to}
                            onChange={handleInputChange}
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
                    {dayItem.records.map((record, recordIndex) => (
                        <div key={recordIndex} className='appointment-time'>
                            <div className='appointment-time-from'>
                                od: {record.od}
                            </div>
                            <div className='appointment-time-to'>
                                do: {record.do}
                            </div>
                        </div>
                    ))}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default SpecialistCalendarComponent;
