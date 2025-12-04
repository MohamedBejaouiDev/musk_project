# Supabase Database Setup

Run these SQL commands in your Supabase SQL Editor to create all required tables:

## 1. Create Products Table
```sql
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

## 2. Create Categories Table
```sql
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (name, slug) VALUES 
  ('Floral', 'floral'),
  ('Oriental', 'oriental'),
  ('Fresh', 'fresh'),
  ('Woody', 'woody'),
  ('Citrus', 'citrus'),
  ('Fruity', 'fruity');
```

## 3. Create Users Table
```sql
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

## 4. Create Orders & Order Items Tables
```sql
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

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 5. Create Indexes
```sql
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
```

## 6. Insert Sample Products (Optional)
```sql
INSERT INTO products (title, brand, category_id, price, discount, badge, stock, description, concentration, size_ml, rating, rating_count, popularity, images) VALUES
('Sauvage', 'Dior', 1, 135.00, 15, 'Best Seller', 25, 'A radically fresh composition', 'Eau de Toilette', 100, 4.8, 2847, 98, '["image1.jpg", "image2.jpg"]'),
('Bleu de Chanel', 'Chanel', 1, 155.00, 10, 'New', 30, 'Sophisticated and elegant', 'Eau de Parfum', 100, 4.9, 3200, 99, '["image.jpg"]'),
('La Vie Est Belle', 'Lancôme', 2, 98.00, 20, 'Best Seller', 40, 'Sweet and luxurious', 'Eau de Parfum', 75, 4.6, 2100, 92, '["image.jpg"]');
```

---

## Steps to Follow:

1. **Go to Supabase Dashboard**
2. **Select your project**
3. **Go to SQL Editor**
4. **Create a new query**
5. **Copy-paste each SQL command above** (one at a time)
6. **Click "RUN"**

After running all commands, your database will be ready and the backend will work!
