# MUSK.MH - Secure Luxury Perfume Shop

Concise guide for the MUSK.MH e-commerce stack with a focus on how we secure data, users, and operations.

---

## Overview
- React 18 frontends (main shop + admin) built with Vite and Tailwind.
- Express API backed by Supabase (PostgreSQL) for products, orders, and users.
- JWT authentication, bcrypt password hashing, input validation, and CORS hardening.

---

## Structure
```
perfume-shop/
 frontends/
    main/        # Customer site 
    admin/       # Admin panel 
 backends/
    api/         # Express API (auth, products, orders, users)
 public/          # Static assets
 .github/         # Project instructions
```

Key files:
- `backends/api/server.js`  CORS, JSON limits, routing.
- `backends/api/middleware/auth.js`  JWT verification + admin guard.
- `backends/api/middleware/validation.js`  Joi schemas for strict input.
- `backends/api/utils/jwt.js`  Token generation/verification (HS256, exp).
- `backends/api/utils/password.js`  bcrypt hashing/compare (12 rounds by default).
- `frontends/main/src/services/auth.js`  Client auth flow + storage.
- `frontends/main/src/services/storage.js`  Safe localStorage wrapper.

---

## Security at a Glance (What We Use)
- **Authentication**: JWT (HS256) with expiration (`JWT_EXPIRES_IN`, default 1h). Token is verified on every protected route.
- **Authorization**: Role-based; admin detected server-side (`email === 'admin@admin.com'`) and enforced with `requireAdmin` middleware. No client-side bypass.
- **Password Security**: bcryptjs hashing with configurable rounds (`BCRYPT_ROUNDS`, default 12). Plaintext is never stored or returned.
- **Input Validation**: Joi schemas for auth and product/order payloads; rejects malformed or out-of-range data before controllers run.
- **CORS**: Allowlist (`FRONTEND_URL`, `ADMIN_PANEL_URL`, fallback 5175). Unknown origins are rejected and logged.
- **Request Limits**: `express.json({ limit: '10mb' })` to block oversized payloads.
- **Storage**: Only JWT and non-sensitive user/cart data in localStorage; passwords and secrets are never stored client-side.
- **Error Hygiene**: Generic API errors to clients; detailed errors only in server logs to avoid leakage.
- **Database Safety**: Supabase parameterized queries; no raw SQL interpolation.

### Deep Dive: How Each Control Secures the App
- **JWT + HS256 signature**: Any tampering with payload (e.g., flipping `isAdmin`) breaks the HMAC signature, so the server rejects the token. Expiry enforces re-auth.
- **Server-side RBAC**: Admin determination happens on the backend (strict email check) and is enforced by `requireAdmin`; client cannot bypass by changing UI or local data.
- **bcrypt (12 rounds)**: Passwords are one-way hashed with salt and 4096 iterations, making brute force extremely costly; plaintext never stored or returned.
- **Joi validation**: Whitelist approach—only expected fields/types/lengths pass. Blocks injection attempts, malformed JSON, and unexpected payload shapes before controllers run.
- **CORS allowlist**: Only known origins can make browser calls; others are blocked and logged, mitigating CSRF/cross-origin abuse for credentialed requests.
- **10 MB body cap**: Prevents oversized payload DoS and large upload abuse.
- **LocalStorage discipline**: Store only JWT + lightweight user/cart data; never store passwords/keys. Logout clears sensitive items.
- **Generic errors**: Clients get minimal info; detailed errors stay in server logs, reducing information leakage for attackers.
- **Parameterized queries**: Supabase query builder ensures values are bound, neutralizing SQL injection vectors.

### Security Flow (Auth + Role)
1) User authenticates → backend hashes/compares with bcrypt → issues signed JWT.
2) Client stores JWT (localStorage) and sends `Authorization: Bearer <token>` for protected requests.
3) `authenticateToken` verifies signature/expiry and fetches user to ensure account still exists.
4) `requireAdmin` gates admin routes (products/users/orders management); regular users are blocked with `403`.
5) Controllers run only after Joi validation and auth/role checks pass.

Security flow:
1) Client sends `Authorization: Bearer <token>`.
2) `authenticateToken` verifies signature/expiry and ensures user exists.
3) `requireAdmin` gates admin-only routes (products/users/orders management).
4) Joi schemas validate request bodies; invalid input gets `400` with details.

---

## Setup
Prereqs: Node.js 18+, npm 9+, Supabase project.

### Install
```bash
git clone <repo>
cd perfume-shop
cd frontends/main   && npm install && cd ../..
cd frontends/admin  && npm install && cd ../..
cd backends/api     && npm install && cd ../..
```

### Environment
`backends/api/.env`
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
JWT_SECRET=your-32-char-secret
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
PORT=6060
```

`frontends/main/.env`
```
VITE_API_URL=http://localhost:6060
```

`frontends/admin/.env`
```
VITE_ADMIN_API_URL=http://localhost:6060
```

---

## Data & Persistence
- **Data source**: Static JSON for products/categories on frontend; Supabase (PostgreSQL) for users and orders.
- **Cart state**: Context API + localStorage (no server dependency for cart).
- **Orders**: Persisted via `/orders/create`; includes user ID/email, items, totals.
- **User data**: Passwords hashed; tokens never stored in DB.

---

## Core Security Controls by Area
- **Auth endpoints** (`/auth/register`, `/auth/login`): Joi validation -> bcrypt hash/compare -> JWT issue -> generic errors on failure.
- **Protected data** (`/products` mutations, `/orders`, `/users`): `authenticateToken` + `requireAdmin` where needed; rejects missing/invalid/expired tokens.
- **CORS**: Only configured origins pass; blocked origins are logged.
- **Orders/Products payloads**: Strict Joi schemas (types, ranges, URLs for images, min/max lengths).
- **Storage discipline**: Tokens/users stored in localStorage; logout removes them; no sensitive secrets in the browser.

### Threats & Mitigations
- **Token tampering / privilege escalation**: JWT signature check + admin role enforced server-side.
- **Credential theft**: bcrypt hashing (12 rounds), no plaintext storage, generic login errors.
- **SQL injection**: Supabase query builder (parameterized) + strict Joi validation.
- **XSS / malicious payloads**: React auto-escaping + URL/type/length validation on inputs.
- **CORS abuse / CSRF**: Origin allowlist and `Authorization` header-based auth (no cookies required).
- **Large payload / DoS attempts**: JSON body capped at 10 MB.
- **Information leakage**: Generic API errors; detailed context only in server logs.

### Security Playbook (How to keep it tight)
- Set a strong `JWT_SECRET` (32+ random chars) and keep it out of the repo; rotate if leaked.
- Keep `BCRYPT_ROUNDS` at 12+; increase over time as hardware improves.
- Lock CORS to your deployed origins (`FRONTEND_URL`, `ADMIN_PANEL_URL`); reject everything else.
- Enforce Joi validation on every mutating route (auth, products, orders, users).
- Never log sensitive fields (passwords, tokens); keep client errors generic.
- Use HTTPS in all environments that handle real users; redirect HTTP to HTTPS.
- Add rate limiting on auth routes in production to slow brute force.
- Monitor logs for repeated CORS blocks or auth failures as early-warning signals.

---

## Quick Security Checklist
- Strong `JWT_SECRET` (32+ chars) and `BCRYPT_ROUNDS` >= 12.
- Validate all inputs (Joi) before hitting controllers.
- Keep CORS allowlist tight; verify origins after deploy.
- Never log or return passwords/tokens; errors stay generic.
- Use HTTPS in production; rotate secrets if leaked.

---

## Testing the API with Postman

### Base URL
```
http://localhost:6060
```

### 1. Health Check (No Auth Required)
- **Method:** `GET`
- **URL:** `http://localhost:6060/`
- **Expected Response:**
```json
{
  "name": "Product CRUD Service",
  "status": "OK",
  "port": 6060,
  "timestamp": "2025-12-06T..."
}
```

### 2. Register Admin User (First Step)
- **Method:** `POST`
- **URL:** `http://localhost:6060/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@admin.com",
  "password": "123456789"
}
```
- **Response:** Returns `{ "token": "...", "user": {...} }`
- **Note:** Email must be `admin@admin.com` for admin privileges

### 3. Login to Get Token
- **Method:** `POST`
- **URL:** `http://localhost:6060/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "admin@admin.com",
  "password": "123456789"
}
```
- **Response:** `{ "token": "eyJhbGc...", "user": {...} }`
- **⚠️ Important:** Copy the `token` value for use in protected routes

### 4. List Products (Public - No Auth)
- **Method:** `GET`
- **URL:** `http://localhost:6060/products`
- **Optional Query Params:**
  - `limit=10` - Number of products to return
  - `search=dior` - Search in title/brand
  - `category=1` - Filter by category ID
  - `minPrice=50&maxPrice=200` - Price range
- **Example:** `http://localhost:6060/products?limit=10&search=dior`

### 5. Get Single Product (Public - No Auth)
- **Method:** `GET`
- **URL:** `http://localhost:6060/products/1`
- **Response:** Full product details including specs and ratings

### 6. Create Product (Admin Only - Auth Required)
- **Method:** `POST`
- **URL:** `http://localhost:6060/products`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE` ← Paste token from login
- **Body (raw JSON):**
```json
{
  "title": "Test Perfume",
  "brand": "Test Brand",
  "category_id": 1,
  "price": 99.99,
  "stock": 50,
  "discount": 0,
  "badge": "New",
  "images": ["https://example.com/image1.jpg"],
  "description": "This is a test perfume description with at least 10 characters",
  "specs": {
    "topNotes": ["Bergamot", "Lemon"],
    "heartNotes": ["Jasmine"],
    "baseNotes": ["Musk"],
    "sizeMl": 100,
    "concentration": "EDP"
  }
}
```
- **Validation Rules:**
  - `title`: 2-200 chars
  - `description`: 10-2000 chars
  - `price`: Must be positive number
  - `stock`: Integer >= 0
  - `discount`: 0-100
  - `images`: Array with at least 1 URL
  - `category_id`: Positive integer (1-6)

### 7. Update Product (Admin Only - Auth Required)
- **Method:** `PUT`
- **URL:** `http://localhost:6060/products/1`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- **Body:** Same structure as create, but all fields are optional
- **Example (partial update):**
```json
{
  "price": 89.99,
  "stock": 25,
  "discount": 15
}
```

### 8. Delete Product (Admin Only - Auth Required)
- **Method:** `DELETE`
- **URL:** `http://localhost:6060/products/1`
- **Headers:** `Authorization: Bearer YOUR_TOKEN_HERE`
- **Response:** `{ "message": "Deleted" }`

### 9. Set Product Promotion (Admin Only - Auth Required)
- **Method:** `POST`
- **URL:** `http://localhost:6060/products/1/promo`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- **Body:**
```json
{
  "badge": "Hot Deal",
  "discount": 25
}
```

### Quick Start Testing Flow
1. **Register** an admin account → Get token from response
2. **Copy the token** and add to Authorization header: `Bearer <token>`
3. **Test public routes** (GET /products) without auth
4. **Test protected routes** (POST/PUT/DELETE) with Authorization header
5. **Check validation** by sending invalid data (e.g., negative price)

### Common Error Responses
- **400 Bad Request:** Validation error (check `details` array in response)
- **401 Unauthorized:** Missing or invalid token
- **403 Forbidden:** Not an admin user
- **404 Not Found:** Resource doesn't exist
- **500 Internal Server Error:** Server/database issue (check backend logs)

### Postman Collection Tips
- Create environment variables: `baseUrl`, `token`
- Use `{{baseUrl}}` in requests: `{{baseUrl}}/products`
- Save token from login response: `pm.environment.set("token", pm.response.json().token)`
- Auto-add header: `Authorization: Bearer {{token}}`

---

## API Documentation with Swagger UI

### Access Interactive Swagger Docs
Once the API server is running, open your browser and navigate to:

```
http://localhost:6060/api-docs
```

You'll see an interactive OpenAPI/Swagger interface where you can:
- **Browse all endpoints** organized by tags (Authentication, Products, Users, Orders)
- **Try endpoints directly** with the "Try it out" button
- **See real-time responses** and response codes
- **View request/response schemas** with all validation rules
- **Auto-fill Bearer token** for auth-protected routes

### Swagger Features
- **Schema definitions**: See exact data structures expected/returned
- **Authorization**: Click "Authorize" to paste your JWT token for protected routes
- **Parameter validation**: Visual guidance on required fields, types, and constraints
- **Error responses**: All HTTP status codes (200, 400, 401, 403, 404, 500) documented

### Example: Testing Create Product via Swagger
1. Open `http://localhost:6060/api-docs`
2. Find **POST /products** under the Products section
3. Click "Try it out"
4. Click "Authorize" and paste your JWT token from login
5. Fill in the request body with product details
6. Click "Execute" to see the response

### Swagger Files
- **Spec**: `backends/api/swagger.js` — OpenAPI definition (info, servers, schemas)
- **Routes**: `backends/api/routes/*.js` — JSDoc comments for each endpoint
- **UI**: Persists authorization token and lists endpoints in expanded view

This provides a **self-documenting API** that developers can use to understand and test all endpoints without external tools.

---

Your site ships with defense-in-depth: hashed credentials, signed tokens, strict validation, locked-down origins, and minimal data exposure.
