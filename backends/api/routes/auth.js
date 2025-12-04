import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validation.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

router.post('/register', authLimiter, validateRequest(registerSchema), register);
router.post('/login', authLimiter, validateRequest(loginSchema), login);

export default router;
