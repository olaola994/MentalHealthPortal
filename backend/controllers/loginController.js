const bcrypt = require('bcrypt');
const db = require('../db/db.js');

async function comparePassword(password, hash) {
    if (!password || !hash) {
        throw new Error('Password and hash are required for comparison');
    }
    return await bcrypt.compare(password, hash);
}

module.exports = (app) => {
    app.post('/api/zaloguj', async (req, res) => {
        const { email, password } = req.body;

        try {
            const query = `SELECT * FROM User WHERE email = ?`;
            const [results] = await db.query(query, [email]);

            const user = results[0];
            if (!user) {
                return res.status(401).json({ message: 'Nieprawidłowe dane' });
            }

            const passwordMatches = await comparePassword(password, user.password);
            if (!passwordMatches) {
                return res.status(401).json({ message: 'Nieprawidłowe dane' });
            }

            if (user.must_change_password) {
                return res.status(200).json({ message: 'Change password required', mustChangePassword: true });
            }

            let role = null;
            const [isSpecialist] = await db.query(`SELECT * FROM Specialist WHERE user_id = ?`, [user.id]);
            const [isPatient] = await db.query(`SELECT * FROM Patient WHERE user_id = ?`, [user.id]);

            if (isSpecialist.length > 0) {
                role = 'Specialist';
            } else if (isPatient.length > 0) {
                role = 'Patient';
            } else {
                role = 'Admin';
            }

            res.status(200).json({ message: 'Zalogowanano pomyślnie', role, mustChangePassword: false });
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
