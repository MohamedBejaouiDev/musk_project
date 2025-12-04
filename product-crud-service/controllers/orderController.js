import { supabase } from '../config/database.js';

// Get all orders (for admin analytics)
export const listOrders = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, startDate, endDate } = req.query;
    let query = supabase.from('orders').select('*, users(email, full_name)', { count: 'exact' });

    if (status) query = query.eq('status', status);
    if (startDate) query = query.gte('created_at', startDate);
    if (endDate) query = query.lte('created_at', endDate);

    const offset = (page - 1) * limit;
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data: orders, error, count } = await query;
    if (error) throw error;

    res.json({ orders, pagination: { page: Number(page), limit: Number(limit), total: count } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list orders' });
  }
};

// Get analytics data
export const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
    const end = endDate || new Date().toISOString();

    // Get orders from database
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total, created_at, status, user_email')
      .gte('created_at', start)
      .lte('created_at', end);

    if (ordersError) {
      console.error('Orders query error:', ordersError);
      // Return empty data structure if table doesn't exist
      return res.json({
        summary: {
          totalRevenue: '0.00',
          totalOrders: 0,
          completedOrders: 0,
          uniqueCustomers: 0,
          averageOrderValue: '0.00'
        },
        dailySales: [],
        topProducts: []
      });
    }

    // Calculate metrics
    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'delivered' || o.status === 'pending').length;
    const uniqueCustomers = new Set(orders.map(o => o.user_email).filter(Boolean)).size;

    // Sales by day (last 30 days)
    const salesByDay = {};
    orders.forEach(order => {
      const date = new Date(order.created_at).toISOString().split('T')[0];
      if (!salesByDay[date]) {
        salesByDay[date] = { date, revenue: 0, orders: 0 };
      }
      salesByDay[date].revenue += order.total || 0;
      salesByDay[date].orders += 1;
    });

    const dailySales = Object.values(salesByDay).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // Top products (from order items)
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('product_id, quantity, products(title, brand, price, images)')
      .gte('created_at', start)
      .lte('created_at', end);

    let topProducts = [];
    
    // If order_items table doesn't exist or query fails, use empty array
    if (!itemsError && orderItems) {
      const productSales = {};
      orderItems.forEach(item => {
        const pid = item.product_id;
        if (!productSales[pid]) {
          productSales[pid] = {
            product_id: pid,
            title: item.products?.title || 'Unknown',
            brand: item.products?.brand || 'Unknown',
            price: item.products?.price || 0,
            image: item.products?.images?.[0] || null,
            quantity: 0,
            revenue: 0
          };
        }
        productSales[pid].quantity += item.quantity;
        productSales[pid].revenue += item.quantity * (item.products?.price || 0);
      });

      topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);
    }

    res.json({
      summary: {
        totalRevenue: totalRevenue.toFixed(2),
        totalOrders,
        completedOrders,
        uniqueCustomers,
        averageOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0
      },
      dailySales,
      topProducts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

// Get single order details
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, users(email, full_name), order_items(*, products(title, brand, images))')
      .eq('id', id)
      .single();

    if (error || !order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const { data: order, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Create order (public - from main website)
export const createOrder = async (req, res) => {
  try {
    const { user, items, total, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Invalid order total' });
    }

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: user?.id || null,
        user_email: user?.email || 'guest@example.com',
        user_name: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Guest',
        total: parseFloat(total),
        status: 'pending',
        shipping_address: shippingAddress || '',
        payment_method: 'card',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: parseFloat(item.price),
      created_at: new Date().toISOString()
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    res.status(201).json({ 
      order,
      message: 'Order created successfully' 
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get orders for a specific user (public - by email)
export const getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(title, brand, images))')
      .eq('user_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ orders: orders || [] });
  } catch (err) {
    console.error('Get user orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
