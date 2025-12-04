const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6060';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Cart endpoints (localStorage-based)
  async getCart() {
    // Cart is managed in localStorage via CartContext
    const cart = localStorage.getItem('cart');
    return { cart: cart ? JSON.parse(cart) : [] };
  }

  async addToCart(productId, quantity = 1) {
    // Cart is managed in localStorage via CartContext
    return { success: true, message: 'Item added to cart' };
  }

  async updateCartItem(itemId, quantity) {
    // Cart is managed in localStorage via CartContext
    return { success: true, message: 'Cart item updated' };
  }

  async removeFromCart(itemId) {
    // Cart is managed in localStorage via CartContext
    return { success: true, message: 'Item removed from cart' };
  }

  async clearCart() {
    return this.request('/cart/clear', {
      method: 'DELETE'
    });
  }

  // Products (backend) - fetches from /api/products
  // Accepts an optional params object e.g. { page, limit, search, category }
  async getProducts(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const endpoint = `/products${qs ? `?${qs}` : ''}`;
    return this.request(endpoint);
  }
}

export const apiService = new ApiService();