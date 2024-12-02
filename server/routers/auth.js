import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY || "your-secret-key";

export const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    phase: process.env.PHASE,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  token = token.replace(/^Bearer\s+/, "");
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.phase !== process.env.PHASE) {
      return res.status(401).send("Invalid token.");
    }
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default { generateToken, verifyToken };
