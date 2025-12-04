-- Create orders table (no foreign key to auth.users since we're using local storage)
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Insert sample orders (optional - for testing only)
-- You can skip this section if you want only real orders from the website
-- Uncomment the lines below if you want sample data:

/*
INSERT INTO orders (user_email, user_name, total, status, created_at) VALUES
  -- Week 4 (most recent)
  ('customer1@email.com', 'John Doe', 405.00, 'delivered', NOW() - INTERVAL '1 day'),
  ('customer2@email.com', 'Jane Smith', 135.00, 'delivered', NOW() - INTERVAL '2 days'),
  ('customer3@email.com', 'Bob Johnson', 270.00, 'shipped', NOW() - INTERVAL '3 days'),
  ('customer4@email.com', 'Alice Brown', 540.00, 'processing', NOW() - INTERVAL '4 days'),
  ('customer5@email.com', 'Charlie Wilson', 198.00, 'delivered', NOW() - INTERVAL '5 days'),
  
  -- Week 3
  (NULL, 324.00, 'delivered', NOW() - INTERVAL '8 days'),
  (NULL, 450.00, 'delivered', NOW() - INTERVAL '9 days'),
  (NULL, 162.00, 'delivered', NOW() - INTERVAL '10 days'),
  (NULL, 378.00, 'delivered', NOW() - INTERVAL '11 days'),
  (NULL, 216.00, 'cancelled', NOW() - INTERVAL '12 days'),
  (NULL, 594.00, 'delivered', NOW() - INTERVAL '13 days'),
  (NULL, 135.00, 'delivered', NOW() - INTERVAL '14 days'),
  
  -- Week 2
  (NULL, 486.00, 'delivered', NOW() - INTERVAL '15 days'),
  (NULL, 270.00, 'delivered', NOW() - INTERVAL '16 days'),
  (NULL, 351.00, 'delivered', NOW() - INTERVAL '17 days'),
  (NULL, 189.00, 'delivered', NOW() - INTERVAL '18 days'),
  (NULL, 432.00, 'delivered', NOW() - INTERVAL '19 days'),
  (NULL, 243.00, 'delivered', NOW() - INTERVAL '20 days'),
  (NULL, 567.00, 'delivered', NOW() - INTERVAL '21 days'),
  
  -- Week 1
  ('customer6@email.com', 'David Lee', 324.00, 'delivered', NOW() - INTERVAL '22 days'),
  ('customer7@email.com', 'Emma Davis', 405.00, 'delivered', NOW() - INTERVAL '23 days'),
  ('customer8@email.com', 'Frank Miller', 189.00, 'delivered', NOW() - INTERVAL '24 days'),
  ('customer9@email.com', 'Grace Taylor', 513.00, 'delivered', NOW() - INTERVAL '25 days'),
  ('customer10@email.com', 'Henry Anderson', 270.00, 'delivered', NOW() - INTERVAL '26 days'),
  ('customer11@email.com', 'Ivy Thomas', 378.00, 'delivered', NOW() - INTERVAL '27 days'),
  ('customer12@email.com', 'Jack Martinez', 216.00, 'delivered', NOW() - INTERVAL '28 days'),
  ('customer13@email.com', 'Kate Garcia', 459.00, 'delivered', NOW() - INTERVAL '29 days'),
  ('customer14@email.com', 'Leo Rodriguez', 351.00, 'delivered', NOW() - INTERVAL '30 days');
*/

-- After creating the orders table, you can insert order_items manually or let the website create them
-- The main website will automatically create orders and order_items when customers checkout
