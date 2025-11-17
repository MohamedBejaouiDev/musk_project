import express from 'express';
import { authLimiter } from '../middleware/security.js';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { register, login, getProfile } from '../controllers/authController.js';

const router = express.Router();

// Apply auth rate limiting to all routes
router.use(authLimiter);

// Public routes
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

export default router;