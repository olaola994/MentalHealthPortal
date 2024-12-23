const bcrypt = require('bcrypt');
const db = require('../db/db.js');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = (app) => {

    app.post('/api/zarejestruj/patient', async (req, res) => {
        const { name, surname, email, password } = req.body;

        if (!name || !surname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const hashedPassword = await hashPassword(password);

            const [userResult] = await db.query(
                `INSERT INTO User (address_id, name, surname, email, password) VALUES (?, ?, ?, ?, ?)`,
                [1, name, surname, email, hashedPassword]
            );

            const userId = userResult.insertId;
            await db.query(`INSERT INTO Patient (user_id) VALUES (?)`, [userId]);

            res.status(201).json({ message: 'Patient registered successfully' });
        } catch (error) {
            console.error('Error during patient registration:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/api/admin/create-doctor', async (req, res) => {
        const { name, surname, email, specialization, licenseNumber } = req.body;

        if (!name || !surname || !email || !specialization || !licenseNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        try {
            const tempPassword = 'TempPassword123';
            const hashedPassword = await hashPassword(tempPassword);

            const [userResult] = await db.query(
                `INSERT INTO User (address_id, name, surname, email, password, must_change_password) VALUES (?, ?, ?, ?, ?, ?)`,
                [1, name, surname, email, hashedPassword, true]
            );

            const userId = userResult.insertId;
            await db.query(
                `INSERT INTO Specialist (user_id, specialization, license_number) VALUES (?, ?, ?)`,
                [userId, specialization, licenseNumber]
            );

            res.status(201).json({ message: 'Doctor account created successfully with temporary password' });
        } catch (error) {
            console.error('Error during doctor creation:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // app.post('/api/change-password', async (req, res) => {
    //     const { userId, newPassword } = req.body;

    //     try {
    //         const hashedPassword = await hashPassword(newPassword);
    //         await db.query(
    //             `UPDATE User SET password = ?, must_change_password = FALSE WHERE id = ?`,
    //             [hashedPassword, userId]
    //         );
    //         res.status(200).json({ message: 'Password updated successfully' });
    //     } catch (error) {
    //         console.error('Error updating password:', error.message);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // });
};
