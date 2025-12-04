# Real Analytics Setup Guide

## ✅ What's Been Done

The system is now fully integrated to save **real orders** from the main website to the database:

1. ✅ Order creation API endpoints added
2. ✅ Main website checkout saves orders automatically
3. ✅ Analytics shows real data (no more mock data)
4. ✅ Order tracking by customer ID (no email column required)

## Database Setup (One-Time)

### Step 1: Create Tables in Supabase

1. Go to your **Supabase project dashboard**
2. Click **"SQL Editor"** in the left sidebar
3. Create a **new query**
4. Copy and paste this SQL:

```sql
-- Create orders table (no email column)
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
```

5. **Execute** the query

### Step 2: Test the System

1. Make sure both servers are running:
   ```bash
   # Terminal 1: API Server
   cd product-crud-service
   npm run dev
   
   # Terminal 2: Main Website
   cd ..
   npm run dev
   
   # Terminal 3: Admin Panel
   cd admin-panel
   npm run dev
   ```

2. **Place a test order** on the main website:
   - Add products to cart
   - Go to cart page
   - Click "Proceed to Checkout"
   - Fill payment form
   - Submit order

3. **View analytics** in admin panel:
   - Open admin panel (http://localhost:5174)
   - Login as admin
   - Click "Analytics" in sidebar
   - See your real order data!

## How It Works

### Main Website Flow:
1. Customer adds items to cart
2. Customer clicks "Proceed to Checkout"
3. Customer fills payment form
4. **Order is saved to Supabase** (`orders` + `order_items` tables)
5. Cart is cleared
6. Success message shown

### Admin Analytics:
- Automatically fetches real orders from database
- Calculates metrics (revenue, orders, customers)
- Shows daily sales charts
- Displays top products by revenue

## API Endpoints

### Public (Main Website):
- `POST /orders/create` - Create new order from checkout
- `GET /orders/user/:id` - Get user's order history (by user_id)

### Admin Only:
- `GET /orders` - List all orders
- `GET /orders/analytics` - Get analytics data
- `GET /orders/:id` - Get order details
- `PATCH /orders/:id/status` - Update order status

## Troubleshooting

**"Failed to create order"**
- Ensure API server is running on port 6060
- Check Supabase tables exist
- Check browser console for errors

**Analytics shows no data**
- Make sure you've placed at least one order
- Check date range filter (default: last 30 days)
- Verify tables are created correctly

**Products not showing in top products**
- Ensure `product_id` in order_items matches `products.id`
- Check that products table exists and has data

## Next Steps

1. ✅ Create the tables in Supabase (Step 1 above)
2. ✅ Test by placing an order on main website
3. ✅ View real analytics in admin panel
4. 🎉 Your analytics are now live with real data!
