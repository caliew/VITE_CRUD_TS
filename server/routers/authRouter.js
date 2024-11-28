import express from 'express';
import { verifyToken, generateToken } from './auth.js';

const authRouter = express.Router();

// API endpoints for /api/auth/...
authRouter.post('/login', (req, res) => {
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
authRouter.use('/protected', verifyToken, (req, res, next) => {
    next();
});

authRouter.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Hello, authenticated user!' });
});

export default authRouter;