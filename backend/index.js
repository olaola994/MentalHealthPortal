const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());


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
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
