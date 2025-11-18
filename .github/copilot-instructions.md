# Copilot Instructions for musk_project (perfume-shop)

## Big Picture Architecture
- **Frontend**: React 18 (Vite, Tailwind CSS v4), organized by features/components, with Context API for cart state and localStorage for persistence. All product and category data is static JSON in `src/data/`.
- **Backend**: Node.js/Express (in `backend/`), but the main app is front-end only; backend is for future expansion or local development.
- **No real API**: All data flows are local (JSON, localStorage). No external DB or REST API is required for core features.

## Developer Workflows
- **Start frontend**: `npm run dev` (from project root)
- **Build frontend**: `npm run build`
- **Preview production build**: `npm run preview`
- **Backend (if used)**: `node backend/server.js` (from `backend/`)
- **Lint**: `npx eslint .`
- **Deploy**: Drag-and-drop to Netlify or use `netlify.toml` config

## Project-Specific Patterns
- **State**: Cart state via Context API (`src/state/CartContext.jsx`), reducer actions for add/remove/update/clear, always validate stock before updating cart.
- **Data**: Products and categories are loaded from static JSON (`src/data/products.json`, `src/data/categories.json`).
- **Persistence**: Use `services/storage.js` abstraction for all localStorage access.
- **Auth**: Simulated with localStorage; user structure and session logic in `services/auth.js`.
- **Notifications**: Use `utils/toastEmitter.js` and `components/Toast.jsx` for all user feedback.
- **Design**: Tailwind utility classes, Montserrat font, luxury gold color palette. Responsive layouts via Tailwind breakpoints.
- **Animations**: Use Framer Motion for transitions and interactive elements.

## Integration Points
- **No external API**: If you see code referencing Supabase or other APIs, it's likely legacy or placeholder—remove or refactor to use local data.
- **Backend**: Only used for local development or future features. All current features work without it.
- **Static assets**: Images/logos in `public/images/` and `src/assets/`.

## Conventions & Examples
- **Component structure**: Feature components in `src/components/`, layout in `src/components/layout/`, pages in `src/pages/`.
- **Service layer**: All localStorage/data logic in `src/services/`.
- **Cart logic**: Always check stock before adding/updating cart items.
- **User logic**: Auth/signup is local only; validate email uniqueness and password match.
- **Toast notifications**: Use emitter for all success/error feedback.

## Key Files
- `src/data/products.json`, `src/data/categories.json`: Product/category data
- `src/services/storage.js`: LocalStorage abstraction
- `src/state/CartContext.jsx`: Cart state/reducer
- `src/components/Toast.jsx`, `src/utils/toastEmitter.js`: Notification system
- `src/components/layout/AppLayout.jsx`, `Header.jsx`, `Footer.jsx`: Layout
- `src/pages/Home.jsx`, `ShopPage.jsx`, `ProductDetailPage.jsx`, `CartPage.jsx`, `LoginPage.jsx`, `SignUpPage.jsx`: Main pages

## Example: Cart Add Flow
1. User clicks "Add to Cart" → dispatches `ADD_ITEM` action in CartContext
2. CartContext checks stock, updates state
3. State syncs to localStorage via `storage.set()`
4. Toast notification emitted for success/error

---

**If you see references to Supabase or external APIs, refactor to use local data.**

---

For questions or unclear patterns, review `README.md` or ask for clarification.
