import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

// All order routes require authentication
router.use(authenticateToken);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

export default router;