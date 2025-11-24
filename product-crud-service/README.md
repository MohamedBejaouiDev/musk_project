# Product CRUD Service (Fragrances)

This small Express service provides authentication (JWT) and full product CRUD operations for fragrances. It uses Supabase as the backing database (re-uses the `products` and `users` tables).

Quick start

1. Copy `.env.example` to `.env` and fill values (you can reuse credentials from your main backend `.env`).

2. Install dependencies:

```powershell
cd product-crud-service
npm install
```

3. Run in development:

```powershell
npm run dev
```

API endpoints

- `GET /health` - health
- `POST /auth/register` - register user (body: `firstName,lastName,email,password`)
- `POST /auth/login` - login (body: `email,password`) -> returns JWT

- `GET /products` - list products (query: `page,limit,search,category,minPrice,maxPrice`)
- `GET /products/:id` - get product
- `POST /products` - create product (protected)
- `PUT /products/:id` - update product (protected)
- `DELETE /products/:id` - delete product (protected)
- `POST /products/:id/promo` - set promo badge/discount (protected)

Notes

- Protected routes require `Authorization: Bearer <token>` header returned from login/register.
- This is a small scaffold intended to be extended or integrated into your main backend.
