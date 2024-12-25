const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const authController = require('./controllers/authController');
const loginController = require('./controllers/loginController');
const verifyToken = require('./middleware/verifyToken');


const app = express();
const PORT = 3001;

require('./cronJobs');

app.use(cors());
app.use(bodyParser.json());

authController(app);
loginController(app);

app.get('/api/specjalisci', async (req, res) => {
    try {
      const query = 'SELECT User.id as id, User.name as imie, user.surname as nazwisko, Specialist.specialization as specjalizacja, Specialist.description as opis, Specialist.photo_path as sciezka FROM User Inner Join Specialist On User.id = Specialist.user_id;';
      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get('/api/specjalisci/:id', async (req, res) => {
    const specialistId = req.params.id;

    try {
        const query = `SELECT U.name as imie, U.surname as nazwisko, S.specialization as specjalizacja, S.description as opis, S.photo_path as sciezka, T.week_day as dzien_tygodnia, DATE_FORMAT(T.time_from, '%H:%i') as godzina_od, DATE_FORMAT(T.time_to, '%H:%i') as godzina_do FROM Specialist S INNER JOIN  User U ON S.user_id = U.id LEFT JOIN  Timetable T ON S.user_id = T.specialist_user_id WHERE  S.user_id = ?;`;
        const [results] = await db.query(query, [specialistId]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Specjalista nie został znaleziony.' });
        }

        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching specialist details:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/moje-wizyty', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `SELECT A.id as id, U.name as imie, U.surname as nazwisko, S.specialization as specjalizacja,
              A.date_time as data, A.duration as czas_trwania, St.name as status FROM Appointment A
              Inner Join Specialist S on A.specialist_user_id = S.user_id
              Inner Join User U on S.user_id = U.id
              Inner Join Status St on St.id = A.Status_id where A.patient_user_id = ? ORDER BY data ASC;`
        const [appointments] = await db.query(query, [userId]);
        res.status(200).json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/dostepne-terminy', async (req, res) => {
  const { specialistId, date } = req.query;

  try {
    const timetableQuery = `
        SELECT time_from, time_to
        FROM Timetable
        WHERE specialist_user_id = ?
          AND week_day = DAYNAME(?)
    `;
    const [timetable] = await db.query(timetableQuery, [specialistId, date]);

    if (timetable.length === 0) {
        return res.status(404).json({ message: 'Brak dostępności w tym dniu' });
    }

    const { time_from, time_to } = timetable[0];

    const appointmentsQuery = `
        SELECT date_time, duration
        FROM Appointment
        WHERE specialist_user_id = ?
          AND DATE(date_time) = ?
    `;
    const [appointments] = await db.query(appointmentsQuery, [specialistId, date]);


    const availableSlots = [];
    let currentTime = new Date(`${date} ${time_from}`);
    const endTime = new Date(`${date} ${time_to}`);

    while (currentTime < endTime) {
        const nextSlotStart = new Date(currentTime);

        const isOccupied = appointments.some((appointment) => {
            const appointmentStart = new Date(appointment.date_time);
            const appointmentEnd = new Date(
                appointmentStart.getTime() + appointment.duration * 60000
            );

            return (
                (nextSlotStart >= appointmentStart && nextSlotStart < appointmentEnd)
            );
        });

        if (!isOccupied) {
            availableSlots.push(nextSlotStart.toTimeString().slice(0, 5));
        }

        currentTime.setHours(currentTime.getHours() + 1);
        currentTime.setMinutes(0);
    }

    res.status(200).json(availableSlots);
} catch (err) {
    console.error('Error fetching available slots:', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
}
});


app.post('/api/umow-wizyte', verifyToken, async (req, res) => {
  const { specialistId, dateTime, duration } = req.body;

  const userId = req.user.id;

  const currentDateTime = new Date();
  const requestedDateTime = new Date(dateTime);

  if (requestedDateTime <= currentDateTime) {
    return res.status(400).json({ message: 'Nie można zarezerwować wizyty w przeszłości.' });
  }

  if (!specialistId || !dateTime || !duration) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
  }
  try {
    const query = `
        INSERT INTO Appointment (specialist_user_id, patient_user_id, date_time, duration, Status_id)
        VALUES (?, ?, ?, ?, 1)`;
    await db.query(query, [specialistId, userId, dateTime, duration]);
    res.status(201).json({ message: 'Wizyta została pomyślnie zapisana.' });
  } catch (err) {
      console.error('Błąd przy dodawaniu wizyty:', err.message);
      res.status(500).json({ error: 'Wystąpił problem podczas zapisywania wizyty.' });
  }

});

app.delete('/api/wizyta/:id', verifyToken, async (req, res) => {
  const appointmentId = req.params.id;
  try{
    const [existingAppointment] = await db.query('SELECT * FROM Appointment WHERE id = ?', [appointmentId]);
    if (existingAppointment.length === 0){
      return res.status(404).json({ message: 'Wizyta nie została znaleziona.' });
    }
    await db.query('DELETE FROM Appointment WHERE id = ?', [appointmentId]);

    res.status(200).json({ message: 'Wizyta została pomyślnie usunięta.' });
  }catch (err) {
    console.error('Błąd przy usuwaniu wizyty:', err.message);
    res.status(500).json({ error: 'Wystąpił problem podczas usuwania wizyty.' });
  }
});

app.get('/api/pacjent-info', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
      const query = `SELECT U.id as id, U.name as imie, U.surname as nazwisko, U.email as email, P.pesel as pesel, P.date_of_birth as data_urodzenia From User U INNER JOIN Patient P On U.id = P.USER_ID WHERE U.id = ?;`
      const [patientInfo] = await db.query(query, [userId]);
      if (patientInfo.length === 0) {
        return res.status(404).json({ message: 'Nie znaleziono danych użytkownika.' });
      }
      res.status(200).json(patientInfo);
  } catch (err) {
      console.error('Error fetching appointments:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
