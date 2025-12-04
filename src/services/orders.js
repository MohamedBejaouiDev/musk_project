// Order service for main app
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6060';

export async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create order');
    }

    return data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
}

export async function getUserOrders(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/user/${encodeURIComponent(userId)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch orders');
    }

    return data.orders || [];
  } catch (error) {
    console.error('Get orders error:', error);
    throw error;
  }
}
