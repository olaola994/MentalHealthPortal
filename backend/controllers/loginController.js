const bcrypt = require('bcrypt');
const db = require('../db/db.js');

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = (app) => {
    app.post('/api/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const query = `SELECT * FROM User WHERE email = ?`;
            const [user] = await db.query(query, [email]);

            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const passwordMatches = await comparePassword(password, user.password);
            if (!passwordMatches) return res.status(401).json({ message: 'Invalid credentials' });

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
