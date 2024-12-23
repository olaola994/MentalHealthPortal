const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const authController = require('./controllers/authController');
const loginController = require('./controllers/loginController');
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

authController(app);
loginController(app);

app.get('/api/specjalisci', async (req, res) => {
    try {
      const query = 'SELECT User.name as imie, user.surname as nazwisko, Specialist.specialization as specjalizacja, Specialist.description as opis, Specialist.photo_path as sciezka FROM User Inner Join Specialist On User.id = Specialist.user_id;';
      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/api/moje-wizyty', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `SELECT * FROM Appointment WHERE patient_user_id = ?`;
        const [appointments] = await db.query(query, [userId]);
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/api/zapisz-na-wizyte', verifyToken, async (req, res) => {
//     const { specialistId, date } = req.body;
//     const userId = req.user.id;

//     try {
//         const query = `INSERT INTO Appointment (patient_user_id, specialist_user_id, date) VALUES (?, ?, ?)`;
//         await db.query(query, [userId, specialistId, date]);

//         res.status(201).json({ message: 'Zapisano na wizytę pomyślnie.' });
//     } catch (error) {
//         console.error('Error saving appointment:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
