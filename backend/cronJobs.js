const db = require('./db/db.js');
const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        await db.query(
            'UPDATE Appointment SET Status_id = ? WHERE date_time < ? AND Status_id != ?',
            [2, now, 2]
        );
    } catch (error) {
        console.error('Błąd podczas aktualizacji statusu wizyt:', error.message);
    }
});