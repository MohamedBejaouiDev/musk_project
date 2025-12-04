# Product CRUD Service (Fragrances) - Admin API

This secure Express microservice provides JWT authentication and admin-only product CRUD operations for fragrances. It uses Supabase for data storage and includes comprehensive input validation and role-based access control.

## Security Features

- **JWT Authentication** - All protected routes require valid Bearer token
- **Admin Role Check** - Users with email ending in `@admin.com` get admin privileges
- **Input Validation** - Joi schemas validate all request bodies
- **Rate Limiting** - Auth endpoints limited to 20 requests per 15 minutes
- **CORS Protection** - Configurable origin whitelist

## Quick Start

1. **Setup environment**
   ```powershell
   cd product-crud-service
   cp .env.example .env
   # Edit .env with your Supabase credentials and JWT secret
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Run in development**
   ```powershell
   npm run dev
   ```
   Service runs on port 6000 by default.

## API Endpoints

### Authentication
- `POST /auth/register` - Register user (returns JWT + isAdmin flag)
  - Body: `{ firstName, lastName, email, password }`
  - Admin access: register with email ending in `@admin.com`
  
- `POST /auth/login` - Login (returns JWT + isAdmin flag)
  - Body: `{ email, password }`

### Products (Public)
- `GET /products` - List products
  - Query params: `page, limit, search, category, minPrice, maxPrice`
  
- `GET /products/:id` - Get single product

### Products (Admin Only)
All require `Authorization: Bearer <token>` header with admin token.

- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `POST /products/:id/promo` - Set promo badge/discount

## Admin Dashboard

Navigate to `/admin` in the frontend to access the admin dashboard. You must be logged in with an admin account (email ending in `@admin.com`).

Features:
- View all products in a table
- Search/filter products
- Create new products
- Edit existing products
- Delete products
- Set promotional badges and discounts

## Creating an Admin User

Register with an email ending in `@admin.com`:

```bash
curl -X POST http://localhost:6000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@admin.com",
    "password": "securepassword123"
  }'
```

Then login in the frontend at `/login` and navigate to `/admin`.

## Security Notes

- **Never expose JWT_SECRET** - Keep it secret and rotate regularly
- **HTTPS in production** - Always use HTTPS for API calls in production
- **Admin role** - Current implementation checks email suffix; for production, add a dedicated `role` column in the `users` table
- **Input validation** - All endpoints validate inputs; adjust schemas in `middleware/validation.js` as needed
- **Rate limiting** - Adjust limits in `routes/auth.js` for your needs
