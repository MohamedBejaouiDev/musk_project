import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, cartAddSchema, cartUpdateSchema } from '../middleware/validation.js';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController.js';

const router = express.Router();

// All cart routes require authentication
router.use(authenticateToken);

router.get('/', getCart);
router.post('/add', validateRequest(cartAddSchema), addToCart);
router.put('/update/:itemId', validateRequest(cartUpdateSchema), updateCartItem);
router.delete('/remove/:itemId', removeFromCart);
router.delete('/clear', clearCart);

export default router;