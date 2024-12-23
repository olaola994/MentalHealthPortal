const bcrypt = require('bcrypt');
const db = require('../db/db.js');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = (app) => {
    app.post('/api/register', async (req, res) => {
        const { name, surname, email, password } = req.body;

        try {
            const hashedPassword = await hashPassword(password);
            const query = `INSERT INTO User (address_id, name, surname, email, password) VALUES (?, ?, ?, ?, ?)`;
            await db.query(query, [1, name, surname, email, hashedPassword]);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
