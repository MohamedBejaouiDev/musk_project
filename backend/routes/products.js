import express from 'express';
import { getProducts, getProductById, searchProducts } from '../controllers/productController.js';

const router = express.Router();

// Parameter validation middleware
const validateProductId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  req.params.id = id;
  next();
};

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', validateProductId, getProductById);

export default router;