import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validation.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account. Use email 'admin@admin.com' for admin access.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Admin"
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "User"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@admin.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 100
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Too many requests (rate limited)
 */
router.post('/register', authLimiter, validateRequest(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate with email and password to get a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@admin.com"
 *               password:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Login successful, token returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid email or password
 *       429:
 *         description: Too many login attempts (rate limited)
 */
router.post('/login', authLimiter, validateRequest(loginSchema), login);

export default router;
