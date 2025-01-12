const bcrypt = require('bcrypt');
const db = require('./db/db.js');

//komenda do hashowania haseł w bazie node hashPasswords.js

async function hashExistingPasswords() {
    try {
        const [users] = await db.query('SELECT id, password FROM User');

        for (const user of users) {
            if (!user.password.startsWith('$2b$')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await db.query('UPDATE User SET password = ? WHERE id = ?', [hashedPassword, user.id]);
                console.log(`Hashed password for user ID: ${user.id}`);
            }
        }
    } catch (error) {
        console.error('Error hashing passwords:', error.message);
    }
}

hashExistingPasswords();
