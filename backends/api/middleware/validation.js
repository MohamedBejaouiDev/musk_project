import Joi from 'joi';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(d => d.message)
      });
    }
    next();
  };
};

// Auth schemas
export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Product schemas
export const createProductSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  brand: Joi.string().min(2).max(100).required(),
  category_id: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).max(100).default(0),
  badge: Joi.string().max(50).allow(null, ''),
  stock: Joi.number().integer().min(0).required(),
  images: Joi.array().items(Joi.string().uri()).min(1).max(10).required(),
  description: Joi.string().min(10).max(2000).required(),
  specs: Joi.object({
    topNotes: Joi.array().items(Joi.string()).required(),
    heartNotes: Joi.array().items(Joi.string()).required(),
    baseNotes: Joi.array().items(Joi.string()).required(),
    sizeMl: Joi.number().positive().required(),
    concentration: Joi.string().required()
  }).required(),
  rating_average: Joi.number().min(0).max(5).default(0),
  rating_count: Joi.number().integer().min(0).default(0),
  popularity: Joi.number().integer().min(0).default(0)
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(2).max(200),
  brand: Joi.string().min(2).max(100),
  category_id: Joi.number().integer().positive(),
  price: Joi.number().positive(),
  discount: Joi.number().min(0).max(100),
  badge: Joi.string().max(50).allow(null, ''),
  stock: Joi.number().integer().min(0),
  images: Joi.array().items(Joi.string().uri()).min(1).max(10),
  description: Joi.string().min(10).max(2000),
  specs: Joi.object({
    topNotes: Joi.array().items(Joi.string()),
    heartNotes: Joi.array().items(Joi.string()),
    baseNotes: Joi.array().items(Joi.string()),
    sizeMl: Joi.number().positive(),
    concentration: Joi.string()
  }),
  rating_average: Joi.number().min(0).max(5),
  rating_count: Joi.number().integer().min(0),
  popularity: Joi.number().integer().min(0)
}).min(1);

export const promoSchema = Joi.object({
  badge: Joi.string().max(50).allow(null, ''),
  discount: Joi.number().min(0).max(100)
}).min(1);
