import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MUSK.MH Perfume Shop API',
      version: '1.0.0',
      description: 'Secure luxury perfume shop API with JWT authentication, product management, and order handling.',
      contact: {
        name: 'MUSK.MH Support',
        url: 'https://musk.mh'
      }
    },
    servers: [
      {
        url: 'http://localhost:6060',
        description: 'Development server'
      },
      {
        url: 'https://api.musk.mh',
        description: 'Production server (example)'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using Bearer token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'User ID' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Product: {
          type: 'object',
          required: ['title', 'brand', 'category_id', 'price', 'stock', 'images', 'description'],
          properties: {
            id: { type: 'integer', description: 'Product ID' },
            title: { type: 'string', minLength: 2, maxLength: 200, description: 'Product name' },
            brand: { type: 'string', minLength: 2, maxLength: 100 },
            category_id: { type: 'integer', minimum: 1, description: 'Category ID' },
            price: { type: 'number', minimum: 0, description: 'Price in currency units' },
            stock: { type: 'integer', minimum: 0, description: 'Stock quantity' },
            discount: { type: 'integer', minimum: 0, maximum: 100, default: 0, description: 'Discount percentage' },
            badge: { type: 'string', description: 'Badge text (e.g., "Best Seller", "New")' },
            images: {
              type: 'array',
              items: { type: 'string', format: 'uri' },
              minItems: 1,
              maxItems: 10,
              description: 'Product image URLs'
            },
            description: { type: 'string', minLength: 10, maxLength: 2000 },
            specs: {
              type: 'object',
              properties: {
                topNotes: { type: 'array', items: { type: 'string' } },
                heartNotes: { type: 'array', items: { type: 'string' } },
                baseNotes: { type: 'array', items: { type: 'string' } },
                sizeMl: { type: 'number', minimum: 1 },
                concentration: { type: 'string' }
              }
            },
            rating_average: { type: 'number', minimum: 0, maximum: 5, default: 0 },
            rating_count: { type: 'integer', minimum: 0, default: 0 },
            popularity: { type: 'integer', minimum: 0, default: 0 },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT token' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Error message' },
            details: {
              type: 'array',
              items: { type: 'string' },
              description: 'Validation error details'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);
