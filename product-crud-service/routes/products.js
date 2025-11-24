import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, setPromo } from '../controllers/productController.js';

const router = express.Router();

// Public list and view
router.get('/', listProducts);
router.get('/:id', getProduct);

// Protected CRUD
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

// Promo endpoint
router.post('/:id/promo', authenticateToken, setPromo);

export default router;
