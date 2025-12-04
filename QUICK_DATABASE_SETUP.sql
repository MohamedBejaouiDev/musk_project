-- COPY AND PASTE THIS ENTIRE BLOCK INTO SUPABASE SQL EDITOR
-- Then click RUN to create all tables at once

-- 1. Create products table
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

-- 2. Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create users table
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

-- 4. Create orders table
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

-- 5. Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- 7. Insert sample categories
INSERT INTO categories (name, slug) VALUES 
  ('Floral', 'floral'),
  ('Oriental', 'oriental'),
  ('Fresh', 'fresh'),
  ('Woody', 'woody'),
  ('Citrus', 'citrus'),
  ('Fruity', 'fruity')
ON CONFLICT DO NOTHING;

-- 8. Insert sample products
INSERT INTO products (title, brand, category_id, price, discount, badge, stock, description, concentration, size_ml, rating, rating_count, popularity, images) VALUES
('Sauvage', 'Dior', 3, 135.00, 15, 'Best Seller', 25, 'A radically fresh composition', 'Eau de Toilette', 100, 4.8, 2847, 98, '["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=500"]'),
('Bleu de Chanel', 'Chanel', 3, 155.00, 10, 'New', 30, 'Sophisticated and elegant', 'Eau de Parfum', 100, 4.9, 3200, 99, '["https://images.unsplash.com/photo-1516322318423-f06f70570ec0?w=500"]'),
('Aventus', 'Creed', 5, 320.00, 5, '', 15, 'Premium fruity fragrance', 'Eau de Parfum', 100, 4.7, 1800, 95, '["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"]'),
('La Vie Est Belle', 'Lancôme', 2, 98.00, 20, 'Best Seller', 40, 'Sweet and luxurious', 'Eau de Parfum', 75, 4.6, 2100, 92, '["https://images.unsplash.com/photo-1570172619644-dfd03cb5f913?w=500"]'),
('Opium', 'Yves Saint Laurent', 2, 110.00, 0, '', 20, 'Sensual and mysterious', 'Eau de Parfum', 100, 4.5, 1500, 88, '["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500"]')
ON CONFLICT DO NOTHING;
