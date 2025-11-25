import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateRequest, createProductSchema, updateProductSchema, promoSchema } from '../middleware/validation.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, setPromo } from '../controllers/productController.js';

const router = express.Router();

// Public list and view
router.get('/', listProducts);
router.get('/:id', getProduct);

// Admin-only CRUD
router.post('/', authenticateToken, requireAdmin, validateRequest(createProductSchema), createProduct);
router.put('/:id', authenticateToken, requireAdmin, validateRequest(updateProductSchema), updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, deleteProduct);

// Promo endpoint (admin-only)
router.post('/:id/promo', authenticateToken, requireAdmin, validateRequest(promoSchema), setPromo);

export default router;
