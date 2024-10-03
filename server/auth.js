const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'your-secret-key';

const generateToken = (user) => {
  const payload = { userId: user.id, username: user.username, phase: 'special' };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('...VERIFTYING TOKEN...',token);
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.phase !== 'special') {
        return res.status(401).send('Invalid token.');
      }
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
};

module.exports = { generateToken, verifyToken };