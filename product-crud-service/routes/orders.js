import express from 'express';
import { listOrders, getAnalytics, getOrder, updateOrderStatus, createOrder, getUserOrders } from '../controllers/orderController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/create', createOrder);
router.get('/user/:email', getUserOrders);

// Admin routes (require authentication)
router.get('/', authenticateToken, requireAdmin, listOrders);
router.get('/analytics', authenticateToken, requireAdmin, getAnalytics);
router.get('/:id', authenticateToken, requireAdmin, getOrder);
router.patch('/:id/status', authenticateToken, requireAdmin, updateOrderStatus);

export default router;
