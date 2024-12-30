const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 's29303@pjwstk.edu.pl', 
        pass: 'dqux yzwm bliv fccf'
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 's29303@pjwstk.edu.pl',
        to,
        subject,
        text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail wysłany:', info.response);
    } catch (err) {
        console.error('Błąd podczas wysyłania e-maila:', err);
    }
};

module.exports = { sendEmail };
