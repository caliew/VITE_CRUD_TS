const express = require('express');
const router = express.Router();
const { verifyToken, generateToken } = require('./auth');

// API endpoints for /api/auth/...
router.post('/login', (req, res) => {
    const { accessCode } = req.body;
    if (accessCode === 'admin') {
        const user = { id: 1, username: 'admin' };
        const token = generateToken(user);
        res.json({ token, accessCode });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Protected routes
router.use('/protected', verifyToken, (req, res, next) => {
    next();
});

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Hello, authenticated user!' });
});

module.exports = router;