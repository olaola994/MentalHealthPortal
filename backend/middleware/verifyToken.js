const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Brak tokenu. Dostęp zabroniony.' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Nieprawidłowy token.' });
    }
};

module.exports = verifyToken;
