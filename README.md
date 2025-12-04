# MUSK.MH - Luxury Perfume E-Commerce Platform

A modern, full-stack e-commerce platform for luxury perfumes with a React frontend, Node.js backend, and real-time analytics.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Database Setup](#-database-setup)
- [Deployment](#-deployment)

---

## 🎯 Project Overview

MUSK.MH is a complete e-commerce solution featuring:
- 🛍️ **Main Website**: Product browsing, cart management, checkout, and user authentication
- 🔧 **Admin Panel**: Product management, user management, and real-time sales analytics
- 📊 **Analytics Dashboard**: Real-time charts showing revenue, orders, and top products
- 🗄️ **Backend API**: Express.js server with Supabase for data persistence

---

## 🛠 Tech Stack

### Frontend (Main Website)
- **React 18** - UI framework with hooks
- **Vite** - Build tool with HMR
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Admin Panel
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS v3** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Router** - Navigation

### Backend
- **Node.js & Express** - Server framework
- **Supabase** - PostgreSQL database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
perfume-shop/
├── frontends/                    # All frontend applications
│   ├── main/                    # Main website (React)
│   │   ├── src/                # Components, pages, services
│   │   ├── public/             # Static assets
│   │   ├── package.json        
│   │   ├── vite.config.js      
│   │   └── index.html
│   │
│   └── admin/                   # Admin Panel (React)
│       ├── src/                # Pages, components, services
│       ├── public/             # Static assets
│       ├── package.json
│       ├── vite.config.js
│       └── index.html
│
├── backends/                     # All backend applications
│   └── api/                     # Backend API (Express)
│       ├── server.js           # Main entry point
│       ├── controllers/        # Business logic
│       ├── routes/             # API endpoints
│       ├── middleware/         # Auth, validation
│       ├── database/           # SQL schemas
│       └── package.json
│
├── .github/                     # GitHub configs & instructions
├── README.md                    # Project documentation
└── netlify.toml                # Deployment config
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm v8+
- Supabase Account (free tier)

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd perfume-shop

# 2. Install main website dependencies
cd frontends/main
npm install
cd ../..

# 3. Install admin-panel dependencies
cd frontends/admin
npm install
cd ../..

# 4. Install backend dependencies
cd backends/api
npm install
cd ../..
```

### Environment Setup

**backends/api/.env:**
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
PORT=6060
```

**frontends/admin/.env:**
```
VITE_ADMIN_API_URL=http://localhost:6060
```

### Running Development Servers

Open 3 terminals:

**Terminal 1 - Main Website (port 5173):**
```bash
cd frontends/main
npm run dev
```

**Terminal 2 - Admin Panel (port 5174):**
```bash
cd frontends/admin
npm run dev
```

**Terminal 3 - Backend API (port 6060):**
```bash
cd backends/api
npm run dev
```

---

## ✨ Features

### 📱 Main Website
- ✅ Product catalog with search & filtering
- ✅ Advanced filtering (category, price, rating)
- ✅ Shopping cart with localStorage persistence
- ✅ User authentication (signup/login)
- ✅ Checkout & order placement
- ✅ Order tracking
- ✅ Responsive design

### 🔧 Admin Panel
- ✅ **Dashboard**: Add/edit/delete products with multiple images
- ✅ **Users**: View and manage user accounts with search
- ✅ **Analytics**: Real-time revenue charts, order trends, top products
- ✅ **Settings**: Update admin credentials and password

### 📊 Analytics Dashboard
- ✅ Total revenue & number of orders
- ✅ Unique customer count
- ✅ Daily revenue trends (line chart)
- ✅ Orders over time (bar chart)
- ✅ Top 10 products by revenue
- ✅ Customizable date range filters

---

## 🗄️ Database Setup

### Create Tables in Supabase

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run this query:

```sql
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255),
  user_name VARCHAR(255),
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  shipping_address TEXT,
  payment_method VARCHAR(50) DEFAULT 'card',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

### Verify Tables
- Check **Table Editor** in Supabase
- You should see `orders` and `order_items` tables

---

## 🚀 Build & Deploy

### Frontend (Netlify)
```bash
cd frontends/main
npm run build
# Deploy dist/ folder to Netlify
```

### Admin Panel (Netlify)
```bash
cd frontends/admin
npm run build
# Deploy dist/ folder to Netlify
```

### Backend (Heroku/Railway/Render)
```bash
cd backends/api
# Push to hosting platform with .env variables set
```

---

## 📝 Key Files & Components

### Main Website
- **CartPage.jsx**: Shopping cart & checkout with order creation
- **ProductDetailPage.jsx**: Product details with gallery
- **ShopPage.jsx**: Catalog with filters & search
- **LoginPage.jsx / SignUpPage.jsx**: Authentication
- **CartContext.jsx**: Global cart state management

### Admin Panel
- **Dashboard.jsx**: Product management interface
- **Users.jsx**: User management with search
- **Analytics.jsx**: Real-time sales charts with Recharts
- **Settings.jsx**: Admin profile management

### Backend
- **orderController.js**: Order logic & analytics
- **productController.js**: Product CRUD operations
- **authMiddleware.js**: JWT authentication
- **routes/**: API endpoints

---

## 🔐 Authentication

- **Main Site**: localStorage-based (signup/login)
- **Admin Panel**: JWT tokens + admin role verification
- **Password Security**: bcryptjs hashing
- **Session**: Persisted in localStorage

---

## 💡 Key Technical Details

### Orders & Analytics
- Orders saved to Supabase on checkout
- Analytics computed from order_items (revenue = sum(price × quantity))
- User orders filtered by user_id
- All dates stored in UTC

### State Management
- Cart: React Context API + useReducer
- Admin: Fetch API with JWT headers
- Persistence: localStorage for cart & auth

### API Endpoints
```
POST   /orders/create              # Create order
GET    /orders/user/:id            # Get user orders
GET    /orders/analytics (admin)   # Get analytics data
GET    /orders/:id (admin)         # Get order details
PATCH  /orders/:id/status (admin)  # Update order status
```

---

## 📧 Support

Refer to `.github/copilot-instructions.md` for development guidelines.

---

**Happy Coding! 🚀**
