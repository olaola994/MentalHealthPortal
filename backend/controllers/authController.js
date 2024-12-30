const bcrypt = require('bcrypt');
const db = require('../db/db.js');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = (app) => {

    app.post('/api/zarejestruj/pacjent', async (req, res) => {
        const { name, surname, email, password, dateOfBirth, pesel } = req.body;

        if (!name || !surname || !email || !password || !dateOfBirth || !pesel) {
            return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
        }

        if (pesel.length !== 11 || isNaN(pesel)) {
            return res.status(400).json({ message: 'Niepoprawny format PESEL' });
        }

        try {
            const hashedPassword = await hashPassword(password);

            const [existingUser] = await db.query(`SELECT * FROM User WHERE email = ?`, [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Ten uzytkownik posiada juz konto w serwisie' });
            }

            const [existingPesel] = await db.query(`SELECT * FROM Patient WHERE pesel = ?`, [pesel]);
            if (existingPesel.length > 0) {
                return res.status(400).json({ message: 'Istnieje uzytkownik o podanym peselu' });
            }

            const [userResult] = await db.query(
                `INSERT INTO User (address_id, name, surname, email, password) VALUES (?, ?, ?, ?, ?)`,
                [null, name, surname, email, hashedPassword]
            );

            const userId = userResult.insertId;

            await db.query(
                `INSERT INTO Patient (user_id, pesel, date_of_birth) VALUES (?, ?, ?)`,
                [userId, pesel, dateOfBirth]
            );

            res.status(201).json({ message: 'Poprawnie zarejestrowano uzytkownika' });
        } catch (error) {
            console.error('Błąd podczas rejestrowania uytkownika', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
