import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'change-me';
const EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (userId) => jwt.sign({ userId }, SECRET, { expiresIn: EXPIRES });

export const verifyToken = (token) => jwt.verify(token, SECRET);
