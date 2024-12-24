const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Brak tokenu. Dostęp zabroniony.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Nieprawidłowy token.' });
    }
};

module.exports = verifyToken;

