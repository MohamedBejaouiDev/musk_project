import Joi from 'joi';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Validation schemas
export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().min(5).max(200).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const productSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  brand: Joi.string().min(2).max(50).required(),
  category_id: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).max(100).default(0),
  stock: Joi.number().integer().min(0).required(),
  description: Joi.string().min(10).max(1000).required(),
  images: Joi.array().items(Joi.string().uri()).min(1).max(5).required(),
  specs: Joi.object({
    topNotes: Joi.array().items(Joi.string()).required(),
    heartNotes: Joi.array().items(Joi.string()).required(),
    baseNotes: Joi.array().items(Joi.string()).required(),
    sizeMl: Joi.number().positive().required(),
    concentration: Joi.string().required()
  }).required()
});

// Cart schemas
export const cartAddSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().min(1).default(1)
});

export const cartUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required()
});