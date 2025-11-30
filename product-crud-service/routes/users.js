import express from 'express';
import { listUsers, getUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticateToken, requireAdmin);

router.get('/', listUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
