import jwt from 'jsonwebtoken';
import { AppConfig } from '../../config.js';
const secretKey = AppConfig.SECRET_KEY || 'your-secret-key';

export const generateToken = (user) => {
  const payload = { userId: user.id, username: user.username, phase: AppConfig.PHASE };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (req, res, next) => {
    let token = req.header('Authorization');
    token = token.replace(/^Bearer\s+/, '');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.phase !== process.env.PHASE) {
        return res.status(401).send('Invalid token.');
      }
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
};

export default { generateToken, verifyToken }