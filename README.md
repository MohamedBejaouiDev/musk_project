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
    main/        # Customer site (React, Tailwind v4)
    admin/       # Admin panel (React, Tailwind v3)
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
- **Authentication**: JWT (HS256) with expiration (`JWT_EXPIRES_IN`, default 7d). Token is verified on every protected route.
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

Your site ships with defense-in-depth: hashed credentials, signed tokens, strict validation, locked-down origins, and minimal data exposure.
