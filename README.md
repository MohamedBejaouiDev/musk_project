# MUSK.MH - Luxury Perfume E-Commerce

A modern e-commerce platform for luxury perfumes built with React, Vite, and Tailwind CSS.


---

## 📁 Project Structure

```
perfume-shop/
├── src/
│   ├── assets/              # Images (logos, blog images)
│   ├── components/          # React components
│   │   ├── layout/          # Header, Footer, AppLayout
│   │   ├── CartPage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   └── ...
│   ├── data/                # Static JSON files
│   │   ├── products.json    # 20 perfumes
│   │   └── categories.json  # 6 categories
│   ├── pages/               # Page components
│   │   └── Home.jsx
│   ├── state/               # State management
│   │   └── CartContext.jsx  # Shopping cart
│   ├── utils/               # Helper utilities
│   │   └── toastEmitter.js
│   └── App.jsx              # Routes & main app
├── tailwind.config.js
└── package.json
```

---

## 📂 Folder Explanation

### `/components`
Contains all reusable UI components:
- **layout/** - Header, Footer, and main layout wrapper
- **Pages** - CartPage, ShopPage, ProductDetailPage, LoginPage, SignUpPage
- **Sections** - HeroSection, FeaturedProducts, BlogSection, AboutUs, GetInTouch
- **UI** - Toast notifications, BrandBar

### `/data`
Static JSON files with product and category data:
- **products.json** - 20 luxury perfumes with details (price, stock, images, specs)
- **categories.json** - 6 fragrance categories (Floral, Woody, Fresh, etc.)

### `/state`
Global state management:
- **CartContext.jsx** - Shopping cart state (add, remove, update items)

### `/utils`
Helper utilities:
- **toastEmitter.js** - Event emitter for toast notifications

---

## 📚 Libraries Used

### Core
- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router DOM** - Page routing

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Animations

### UI
- **Lucide React** - Icons

### State
- **React Context API** - Global state management

---

## 💾 Storage System (localStorage)

### Why localStorage?
We use **localStorage** instead of a backend database for this demo project because:
- ✅ No server required (offline-first)
- ✅ Data persists across page refreshes
- ✅ Simple to implement
- ✅ Perfect for prototypes and demos

### What We Store

#### 1. **User Authentication**
```javascript
// localStorage.users - All registered users
[
  {
    id: 1234567890,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password123",
    createdAt: "2024-01-15T10:30:00Z"
  }
]

// localStorage.currentUser - Currently logged-in user
{
  id: 1234567890,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com"
}
```

#### 2. **Shopping Cart**
```javascript
// localStorage.cart - Cart items
[
  {
    id: 1,
    title: "Sauvage",
    brand: "Dior",
    price: 135.00,
    quantity: 2,
    image: "url",
    stock: 25
  }
]
```

### How It Works

**Sign Up:**
1. User fills form → Validate email → Save to `localStorage.users`
2. Set `localStorage.currentUser` → Dispatch `authChange` event
3. Header listens to event → Updates UI to show user name

**Login:**
1. User enters credentials → Check against `localStorage.users`
2. If valid → Set `localStorage.currentUser` → Dispatch event
3. Header updates automatically

**Shopping Cart:**
1. User adds product → CartContext updates state
2. State automatically syncs to `localStorage.cart`
3. On page refresh → Cart loads from localStorage
4. Header badge shows total items from CartContext

**Logout:**
1. Remove `localStorage.currentUser` → Dispatch event
2. Header updates to show login/signup buttons

---

## 🔄 How Data Flows

### Product Data
```
products.json → Import in component → Transform data → Display
```

### Authentication
```
Form submit → Validate → localStorage → Dispatch event → Header updates
```

### Shopping Cart
```
Add to cart → CartContext → localStorage → Header badge updates
```

### Notifications
```
Action → toastEmitter.emit() → Toast component → Auto-dismiss
```

---

## 🎯 Key Features

- ✅ User authentication (signup/login)
- ✅ Product browsing with search & filters
- ✅ Shopping cart with stock validation
- ✅ Checkout simulation
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Toast notifications

---

## 🚦 Routes

```
/           → Home page
/shop       → Product listing
/product/:id → Product details
/cart       → Shopping cart
/login      → User login
/signup     → User registration
```

---



