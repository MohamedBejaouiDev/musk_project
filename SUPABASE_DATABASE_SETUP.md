# Supabase Database Setup Guide

## Overview
This guide will walk you through creating all required database tables in Supabase for the perfume-shop project.

## Prerequisites
- Supabase account active at: https://qsoqjizothbraidzzdzy.supabase.co
- Valid ANON_KEY configured in `.env` files (already done)
- Backend API running on port 6060

## Step-by-Step Setup

### Step 1: Access Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Login to your account
3. Select your project (perfume-shop)
4. Click on **"SQL Editor"** in the left sidebar
5. Click **"New Query"** button

### Step 2: Create Products Table

Copy and paste the following SQL in the SQL Editor:

```sql
-- Create products table for perfume-shop
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  category_id INT,
  price DECIMAL(10, 2) NOT NULL,
  discount INT DEFAULT 0,
  badge VARCHAR(50),
  stock INT DEFAULT 0,
  description TEXT,
  concentration VARCHAR(100),
  size_ml INT,
  top_notes TEXT,
  heart_notes TEXT,
  base_notes TEXT,
  rating DECIMAL(3, 1) DEFAULT 0,
  rating_count INT DEFAULT 0,
  popularity INT DEFAULT 0,
  images TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Click **"Run"** button and wait for success.

### Step 3: Create Categories Table

Create a new query and copy:

```sql
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Click **"Run"**.

### Step 4: Create Users Table

Create a new query and copy:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Click **"Run"**.

### Step 5: Create Orders Table

Create a new query and copy:

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
```

Click **"Run"**.

### Step 6: Create Order Items Table

Create a new query and copy:

```sql
-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Click **"Run"**.

### Step 7: Create Indexes (Performance)

Create a new query and copy:

```sql
-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
```

Click **"Run"**.

### Step 8: Insert Sample Categories

Create a new query and copy:

```sql
-- Insert sample categories
INSERT INTO categories (name, slug) VALUES 
  ('Floral', 'floral'),
  ('Oriental', 'oriental'),
  ('Fresh', 'fresh'),
  ('Woody', 'woody'),
  ('Citrus', 'citrus'),
  ('Fruity', 'fruity')
ON CONFLICT DO NOTHING;
```

Click **"Run"**.

### Step 9: Insert Sample Products

Create a new query and copy:

```sql
-- Insert sample products
INSERT INTO products (title, brand, category_id, price, discount, badge, stock, description, concentration, size_ml, rating, rating_count, popularity, images) VALUES
('Sauvage', 'Dior', 3, 135.00, 15, 'Best Seller', 25, 'A radically fresh composition', 'Eau de Toilette', 100, 4.8, 2847, 98, '["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=500"]'),
('Bleu de Chanel', 'Chanel', 3, 155.00, 10, 'New', 30, 'Sophisticated and elegant', 'Eau de Parfum', 100, 4.9, 3200, 99, '["https://images.unsplash.com/photo-1516322318423-f06f70570ec0?w=500"]'),
('Aventus', 'Creed', 5, 320.00, 5, '', 15, 'Premium fruity fragrance', 'Eau de Parfum', 100, 4.7, 1800, 95, '["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"]'),
('La Vie Est Belle', 'Lancôme', 2, 98.00, 20, 'Best Seller', 40, 'Sweet and luxurious', 'Eau de Parfum', 75, 4.6, 2100, 92, '["https://images.unsplash.com/photo-1570172619644-dfd03cb5f913?w=500"]'),
('Opium', 'Yves Saint Laurent', 2, 110.00, 0, '', 20, 'Sensual and mysterious', 'Eau de Parfum', 100, 4.5, 1500, 88, '["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500"]')
ON CONFLICT DO NOTHING;
```

Click **"Run"**.

### Step 10: Create Admin User (Optional)

Create a new query and copy:

```sql
-- Insert admin user (password will be hashed before actual use)
-- Email: admin@admin.com
-- This user exists in the system, login will trigger "Seed Admin Account" if needed
INSERT INTO users (email, password, first_name, last_name) VALUES
('admin@admin.com', 'temp-will-be-hashed', 'Admin', 'User')
ON CONFLICT DO NOTHING;
```

Click **"Run"** (optional - admin creation can be triggered from login page).

## Verification

After completing all steps:

1. Go to **"Table Editor"** in the left sidebar
2. You should see 5 tables:
   - `products` (5 sample products inserted)
   - `categories` (6 categories)
   - `users` (ready for accounts)
   - `orders` (ready for purchases)
   - `order_items` (ready for order details)

## Testing

### Test Main Website
1. Navigate to http://localhost:5173
2. Products should now display on the home page
3. You should be able to browse products without 500 errors

### Test Admin Panel
1. Navigate to http://localhost:5174
2. Click "Seed Admin Account" button (if not done in Step 10)
3. Login with:
   - Email: `admin@admin.com`
   - Password: `123456789`
4. Access admin dashboard

### Test API Directly
```bash
# Test products endpoint
curl http://localhost:6060/products?limit=10

# Should return JSON with products array
```

## Troubleshooting

### Still getting 500 errors?
1. Check that all 5 tables were created successfully in Table Editor
2. Verify `.env` files have correct Supabase credentials
3. Restart backend API server: `node backends/api/server.js`
4. Clear browser cache (Ctrl+Shift+Delete)
5. Check backend console for error messages

### "relation does not exist" error?
- A table wasn't created. Go back and run all SQL steps again in order.

### Admin login still failing?
1. Go to Supabase Table Editor → `users` table
2. Verify `admin@admin.com` exists
3. Or click "Seed Admin Account" button on login page

## Next Steps

After database setup is complete:
1. ✅ Main website displays products
2. ✅ Admin panel login works
3. ✅ Cart functionality operational
4. ✅ Ready for testing and deployment

For any issues, check:
- Backend console logs
- Supabase SQL Editor for query errors
- Browser DevTools Console for client errors
