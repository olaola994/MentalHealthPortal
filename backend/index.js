const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Własny plik konfiguracyjny bazy

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend działa poprawnie');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
    console.log(`Serwer działa na porcie ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Połączenie z bazą danych MySQL udane.');
    } catch (error) {
        console.error('Błąd połączenia z bazą danych:', error);
    }
});
