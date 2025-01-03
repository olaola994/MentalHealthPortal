const db = require('./db/db.js');
const cron = require('node-cron');

// '*/1 * * * *'
cron.schedule('0 0 * * *', async () => {
    console.log('Cron job został uruchomiony o północy.');
    try {
        const now = new Date();
        const [result] = await db.query(
            'UPDATE Appointment SET Status_id = ? WHERE date_time < ? AND Status_id != ?',
            [2, now, 2]
        );
        console.log('Zaktualizowano rekordy:', result.affectedRows);
    } catch (error) {
        console.error('Błąd podczas aktualizacji statusu wizyt:', error.message);
    }
});