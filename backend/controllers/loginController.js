const bcrypt = require('bcrypt');
const db = require('../db/db.js');

async function comparePassword(password, hash) {
    if (!password || !hash) {
        throw new Error('Password and hash are required for comparison');
    }
    return await bcrypt.compare(password, hash);
}

module.exports = (app) => {
    app.post('/api/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const query = `SELECT * FROM User WHERE email = ?`;
            const [results] = await db.query(query, [email]);

            const user = results[0];
            console.log('Fetched user:', user);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            if (!user.password) {
                console.error('No password found for user:', email);
                return res.status(500).json({ message: 'Server error' });
            }

            const passwordMatches = await comparePassword(password, user.password);
            if (!passwordMatches) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
