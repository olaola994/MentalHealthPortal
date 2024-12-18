const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/appointments', async (req, res) => {
  try {
    const query = 'SELECT id FROM Appointment';
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
