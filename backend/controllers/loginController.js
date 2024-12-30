const jwt = require('jsonwebtoken');
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

            let role = null;
            const [isSpecialist] = await db.query(`SELECT * FROM Specialist WHERE user_id = ?`, [user.id]);
            const [isPatient] = await db.query(`SELECT * FROM Patient WHERE user_id = ?`, [user.id]);
            const [isAdmin] = await db.query(`SELECT * FROM Admin WHERE user_id = ?`, [user.id]);

            if (isSpecialist.length > 0) {
                role = 'Specialist';
            } else if (isPatient.length > 0) {
                role = 'Patient';
            } else if (isAdmin.length > 0){
                role = 'Admin';
            }
            
            if (user.must_change_password) {
                const limitedToken = jwt.sign(
                    { id: user.id, role, limitedAccess: true },
                    'SECRET_KEY',
                    { expiresIn: '30m' } 
                );
                return res.status(200).json({
                    message: 'Wymagana zmiana hasła',
                    token: limitedToken,
                    mustChangePassword: true,
                });
            }
            const token = jwt.sign({ id: user.id, role }, 'SECRET_KEY', { expiresIn: '2h' });
            res.status(200).json({ message: 'Zalogowanano pomyślnie',token, role, mustChangePassword: false });
        } catch (error) {
            console.error('Bląd logowania:', error.message);
            res.status(500).json({ error: 'Błąd serwera' });
        }
    });
};
