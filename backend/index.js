const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const authController = require('./controllers/authController');
const loginController = require('./controllers/loginController');
const verifyToken = require('./middleware/verifyToken');
const { sendEmail } = require('./controllers/emailController');
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3001;

require('./cronJobs');

app.use(cors());
app.use(bodyParser.json());

authController(app);
loginController(app);


app.get('/api/specjalisci', async (req, res) => {
    try {
      const query = `SELECT User.id as id, User.name as imie, user.surname as nazwisko, Specialist.specialization as specjalizacja, Specialist.description as opis, Specialist.photo_path as sciezka FROM User Inner Join Specialist On User.id = Specialist.user_id;`;

      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      console.error('Błąd przy pobiernaiu listy specjalistów: ', err.message);
      res.status(500).json({ error: 'Błąd serwera' });
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
        console.error('Błąd przy pobiernaiu danych specjalisty: ', err.message);
        res.status(500).json({ error: 'Błąd serwera' });
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
        console.error('Błąd przy pobiernaiu listy wizyt: ', err.message);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

app.get('/api/dostepne-terminy', async (req, res) => {
  const { specialistId, date } = req.query;

  try {
    const timetableQuery = `SELECT time_from, time_to
        FROM Timetable
        WHERE specialist_user_id = ?
          AND week_day = DAYNAME(?)`;

    const [timetable] = await db.query(timetableQuery, [specialistId, date]);

    if (timetable.length === 0) {
        return res.status(404).json({ message: 'Brak dostępności w tym dniu' });
    }

    const { time_from, time_to } = timetable[0];

    const appointmentsQuery = `SELECT date_time, duration
        FROM Appointment
        WHERE specialist_user_id = ?
          AND DATE(date_time) = ?`;

    const [appointments] = await db.query(appointmentsQuery, [specialistId, date]);


    const availableSlots = [];
    for (const { time_from, time_to } of timetable) {
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
                  nextSlotStart >= appointmentStart && nextSlotStart < appointmentEnd
              );
          });

          if (!isOccupied) {
              availableSlots.push(nextSlotStart.toTimeString().slice(0, 5));
          }

          currentTime.setHours(currentTime.getHours() + 1);
          currentTime.setMinutes(0);
      }
  }

    res.status(200).json(availableSlots);
} catch (err) {
    console.error('Błąd przy pobiernaiu listy dostępnych slotów: ', err.message);
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
    const query = `INSERT INTO Appointment (specialist_user_id, patient_user_id, date_time, duration, Status_id)
        VALUES (?, ?, ?, ?, 1)`;

    await db.query(query, [specialistId, userId, dateTime, duration]);
    res.status(201).json({ message: 'Wizyta została pomyślnie zapisana.' });
  } catch (err) {
      console.error('Błąd przy dodawaniu wizyty:', err.message);
      res.status(500).json({ error: 'Błąd serwera' });
  }

});

app.delete('/api/wizyta/:id', verifyToken, async (req, res) => {
  const appointmentId = req.params.id;
  try{
    const [existingAppointment] = await db.query(`SELECT * FROM Appointment WHERE id = ?`, [appointmentId]);
    if (existingAppointment.length === 0){
      return res.status(404).json({ message: 'Wizyta nie została znaleziona.' });
    }
    await db.query(`DELETE FROM Appointment WHERE id = ?`, [appointmentId]);

    res.status(200).json({ message: 'Wizyta została pomyślnie usunięta.' });
  }catch (err) {
    console.error('Błąd przy usuwaniu wizyty:', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.get('/api/pacjent-info', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
      const query = `SELECT U.id as id, U.name as imie,
      U.surname as nazwisko, U.email as email, P.pesel as pesel,
      P.date_of_birth as data_urodzenia, U.address_id as adres, A.city as miasto,
      A.postal_code as kod_pocztowy, A.street as ulica, A.street_number as numer_budynku,
      A.apartament_number as numer_mieszkania, A.country as kraj
      From User U INNER JOIN Patient P On U.id = P.USER_ID
      LEFT JOIN Address A ON U.address_id = A.id
      WHERE U.id = ?;`

      const [patientInfo] = await db.query(query, [userId]);
      if (patientInfo.length === 0) {
        return res.status(404).json({ message: 'Nie znaleziono danych użytkownika.' });
      }
      res.status(200).json(patientInfo[0]);
  } catch (err) {
      console.error('Błąd przy pobiernaiu informacji o pacjencie: ', err.message);
      res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.get('/api/specjalista-info', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
      const query = `SELECT U.id AS id, U.name AS imie,
      U.surname AS nazwisko, U.email AS email, S.specialization AS specjalizacja, S.license_number AS numer_licencji, S.description AS opis
      FROM User U INNER JOIN Specialist S ON U.id = S.USER_ID
      WHERE U.id = ?;`

      const [specialistInfo] = await db.query(query, [userId]);
      if (specialistInfo.length === 0) {
        return res.status(404).json({ message: 'Nie znaleziono danych użytkownika.' });
      }
      res.status(200).json(specialistInfo[0]);
  } catch (err) {
      console.error('Błąd przy pobiernaiu informacji o specjaliście: ', err.message);
      res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.post('/api/specjalista-dodaj-opis', verifyToken, async (req, res) => {
  const {description} = req.body; 
  const userId = req.user.id;
  if(!description){
    return res.status(400).json( {error: 'Brak opisu'} );
  }

  try {
      await db.query(`UPDATE Specialist SET description = ? WHERE user_id = ?`, [description,userId]);

      return res.status(200).json({ message: 'Opis został zaaktualizowany.' });
  } catch (err) {
      console.error('Błąd przy zapisywaniu opisu: ', err.message);
      res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.post('/api/dodaj-adres', verifyToken, async (req, res) => {
  const { city, postal_code, street, street_number, apartament_number, country } = req.body;
  const userId = req.user.id;

  if (!city || !postal_code || !street || !street_number || !country) {
      return res.status(400).json({ error: 'Brak wymaganych danych adresowych.' });
  }

  try {
      const [user] = await db.query(`SELECT address_id FROM User WHERE id = ?`, [userId]);
      if (!user || user.length === 0) {
          return res.status(404).json({ message: 'Nie znaleziono użytkownika.' });
      }

      const addressId = user[0].address_id;

      if (addressId) {
          await db.query(
              `UPDATE Address SET city = ?, postal_code = ?, street = ?, street_number = ?, apartament_number = ?, country = ? WHERE id = ?`,[city, postal_code, street, street_number, apartament_number || '', country, addressId]);
          return res.status(200).json({ message: 'Adres został zaktualizowany.' });
      } else {
          const [result] = await db.query(
              `INSERT INTO Address (city, postal_code, street, street_number, apartament_number, country) VALUES (?, ?, ?, ?, ?, ?)`,
              [city, postal_code, street, street_number, apartament_number || '', country]
          );
          await db.query(`UPDATE User SET address_id = ? WHERE id = ?`, [result.insertId, userId]);
          return res.status(201).json({ message: 'Adres został dodany.' });
      }
  } catch (err) {
      console.error('Błąd podczas dodawania lub edycji adresu: ', err.message);
      res.status(500).json({ error: 'Błąd serwera' });
  }
});
app.get('/api/admin-pacjenci', verifyToken, async (req, res) => {
  try{
    const query = `SELECT 
        U.id AS user_id,
        U.name AS imie,
        U.surname AS nazwisko,
        U.email AS email,
        P.pesel AS pesel,
        P.date_of_birth AS data_urodzenia
    FROM User U INNER JOIN Patient P ON U.id = P.user_id;`;

    const [patientsInfo] = await db.query(query);
    res.status(200).json(patientsInfo);
  }catch (err) {
    console.error('Błąd przy pobiernaiu listy pacjentów: ', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});
app.get('/api/admin-specjalisci', verifyToken, async (req, res) => {
  try{
    const query = `SELECT 
        U.id AS user_id,
        U.name AS imie,
        U.surname AS nazwisko,
        U.email AS email,
        S.specialization AS specjalizacja,
        S.license_number AS numer_licencji,
        S.photo_path AS zdjecie,
        S.description AS opis
    FROM User U
    INNER JOIN Specialist S ON U.id = S.user_id;`;
    const [specialistsInfo] = await db.query(query);
    res.status(200).json(specialistsInfo);
  }catch (err) {
    console.error('Błąd przy pobiernaiu listy specjalistów: ', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});
app.get('/api/admin-wizyty', verifyToken, async (req, res) => {
  try{
    const query = `SELECT 
    A.id AS appointment_id,
    CONCAT_WS(' ', PUser.name, PUser.surname) AS pacjent_imie,
    CONCAT_WS(' ', SUser.name, SUser.surname) AS specjalista_imie,
    A.date_time AS data_wizyty,
    A.duration AS dlugosc_wizyty,
    St.name AS status
    FROM 
        Appointment A
    JOIN 
        User PUser ON A.patient_user_id = PUser.id
    JOIN 
        User SUser ON A.specialist_user_id = SUser.id
    JOIN 
    Status St ON A.Status_id = St.id
    ORDER BY A.date_time DESC;`;
    const [appointmentsInfo] = await db.query(query);
    res.status(200).json(appointmentsInfo);
  }catch (err) {
    console.error('Błąd przy pobiernaiu listy wizyt: ', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});
app.delete('/api/admin-usun-pacjenta/:id', verifyToken, async (req, res) => {
  const patientId = req.params.id;
  try{
    const [existingPatient] = await db.query(`SELECT * FROM PATIENT WHERE user_id = ?`, [patientId]);
    if(existingPatient.length === 0){
      return res.status(400).json({ message: 'Pacjent nie został znaleziony'});
    }
    const [user] = await db.query('SELECT address_id FROM USER WHERE id = ?', [patientId]);
    const addressId = user[0]?.address_id;

    await db.query(`DELETE FROM Appointment WHERE patient_user_id = ?`, [patientId]);

    await db.query(`DELETE FROM PATIENT WHERE user_id = ?`, [patientId]);

    await db.query(`DELETE FROM USER WHERE id = ?`, [patientId]);

    if (addressId) {
      const [otherUsers] = await db.query(`SELECT * FROM USER WHERE address_id = ?`, [addressId]);
      if (otherUsers.length === 0) {
        await db.query(`DELETE FROM Address WHERE id = ?`, [addressId]);
      }
    }
    res.status(200).json({ message: 'Pacjent, wizyty i powiązany adres zostały pomyślnie usunięte.' });
  }catch(err){
    console.error('Błąd przy usuwaniu pacjenta: ', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.delete('/api/admin-usun-specjaliste/:id', verifyToken, async (req, res) => {
  const specialistId = req.params.id;
  try{
    const [existingSpecialist] = await db.query(`SELECT * FROM Specialist WHERE user_id = ?`, [specialistId]);
    if(existingSpecialist.length === 0){
      return res.status(400).json({ message: 'Specjalista nie został znaleziony'});
    }
    
    await db.query(`DELETE FROM Appointment WHERE specialist_user_id = ?`, [specialistId]);
    await db.query(`DELETE FROM Timetable WHERE specialist_user_id = ?`, [specialistId]);

    await db.query(`DELETE FROM SPECIALIST WHERE user_id = ?`, [specialistId]);

    await db.query(`DELETE FROM USER WHERE id = ?`, [specialistId]);

    res.status(200).json({ message: 'Specjalista, wizyty zostały pomyślnie usunięte.' });
  }catch(err){
    console.error('Błąd przy usuwaniu specjalisty: ', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.get('/api/sprawdz-pacjenta/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const [result] = await db.query(`SELECT 1 FROM Patient WHERE user_id = ?`, [id]);
      res.json({ exists: result.length > 0 });
  } catch (err) {
      console.error('Błąd przy sprawdzaniu pacjenta:', err.message);
      res.status(500).json({ exists: false });
  }
});

app.get('/api/sprawdz-specjaliste/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const [result] = await db.query(`SELECT 1 FROM Specialist WHERE user_id = ?`, [id]);
      res.json({ exists: result.length > 0 });
  } catch (err) {
      console.error('Błąd przy sprawdzaniu specjalisty:', err.message);
      res.status(500).json({ exists: false });
  }
});
app.post('/api/dodaj-specjaliste', verifyToken, async (req, res) => {
  const {address_id, name, surname, email, password, specialization, license_number, photo_path} = req.body;
  if (!name || !surname || !email || !specialization || !license_number) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
  }
  try {
    const tempPassword = `Temp-${Math.random().toString(36).slice(-8)}`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const [userResult] = await db.query(`INSERT INTO USER (name, surname, email, password,must_change_password) VALUES (?,?,?,?,?)`, [name, surname, email, hashedPassword, true]);

    const userId = userResult.insertId;

    await db.query(`INSERT INTO SPECIALIST (user_id, specialization, license_number, photo_path) VALUES (?,?,?,?)`, [userId, specialization, license_number, photo_path]);

    await sendEmail(email, 'Twoje konto w serwisie',`Witaj ${name} ${surname}, Twoje tymczasowe hasło to: ${tempPassword}`);
    res.status(201).json({ message: 'Specjalista został dodany pomyślnie.' });
  }catch (error) {
        console.error('Błąd podczas dodawania specjalisty:', error.message);
        res.status(500).json({ error: 'Błąd serwera' });
  }
});
app.post('/api/zmien-haslo', verifyToken, async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id;
  if (!newPassword) {
    return res.status(400).json({ message: 'Nowe hasło jest wymagane.' });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await db.query(`UPDATE User SET password = ?, must_change_password = false WHERE id = ?`, [hashedPassword, userId]);

    res.status(200).json({ message: 'Hasło zostało zmienione pomyślnie.' });
  } catch (error) {
      console.error('Błąd podczas zmiany hasła:', error.message);
      res.status(500).json({ error: 'Błąd serwera.' });
  }
});
app.get('/api/specjalista-wizyty', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
      const query = `SELECT A.id AS id, U.name AS imie, U.surname AS nazwisko, S.specialization AS specjalizacja,
            A.date_time AS data, A.duration AS czas_trwania, St.name AS status FROM Appointment A
            INNER JOIN Specialist S ON A.specialist_user_id = S.user_id
            INNER JOIN User U ON S.user_id = U.id
            INNER JOIN Status St ON St.id = A.Status_id where A.specialist_user_id = ? ORDER BY data ASC;`
      const [appointments] = await db.query(query, [userId]);
      res.status(200).json(appointments);
  } catch (err) {
      console.error('Błąd przy pobiernaiu listy wizyt: ', err.message);
      res.status(500).json({ error: 'Błąd serwera' });
  }
});
app.get('/api/specjalista-dostepnosc', verifyToken, async (req, res) => {
  const userId = req.user.id;
  try{
    const query = `SELECT T.id as id, T.week_day AS dzien_tygdonia, T.time_from AS od, T.time_to AS do FROM Specialist S INNER JOIN Timetable T ON S.user_id = T.specialist_user_id where S.user_id = ?;`
    const [calendar] = await db.query(query, [userId]);
    res.status(200).json(calendar);
  }catch (err) {
    console.error('Błąd przy pobiernaiu grafiku: ', err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.post('/api/specjalista-dodaj-dostepnosc', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { week_day, time_from, time_to } = req.body;
  console.log('Dane wejściowe:', { week_day, time_from, time_to });

  if (!week_day || !time_from || !time_to) {
    return res.status(400).json({ error: 'Brak wymaganych danych: week_day, time_from, time_to' });
  }
  try{
    const isConflict = `SELECT 1 FROM Timetable WHERE specialist_user_id = ?
        AND week_day = ? AND NOT (time_to <= ? OR time_from >= ?);`;
        
    const [conflicts] = await db.query(isConflict, [userId, week_day, time_from, time_to]);
    console.log('Wynik zapytania:', conflicts);
    if (conflicts.length > 0) {
      return res.status(400).json({ message: 'Istnieje już dostępność w nakładającym się przedziale czasowym.' });
    }

    const addTimetablerecord = `INSERT INTO Timetable (specialist_user_id, week_day, time_from, time_to) 
        VALUES (?, ?, ?, ?);`;
    await db.query(addTimetablerecord, [userId, week_day, time_from, time_to]);
    res.status(201).json({ message: 'Dostępność została pomyślnie dodana.' });
  }catch (err) {
    console.error('Błąd przy dodawaniu dostępności:', err.message)
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

/////////////////////
app.delete('/api/specjalista-usun-dostepnosc/:id', verifyToken, async (req, res) => {
  const timetablerecordId = req.params.id;

  try{
    const [timetableRecord] = await db.query(`SELECT * FROM Timetable WHERE id = ?`, [timetablerecordId]);
    if(timetableRecord.length === 0){
      return res.status(400).json({ message: 'Termin nie został znaleziony'});
    }
    await db.query(`DELETE FROM Timetable WHERE id = ?`, [timetablerecordId]);

    res.status(201).json({ message: 'Dostępność została pomyślnie usunięta.' });
  }catch (err) {
    console.error('Błąd przy usuwaniu dostępności:', err.message)
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
