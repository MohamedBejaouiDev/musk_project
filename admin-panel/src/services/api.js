const API_BASE_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:6000';

const getToken = () => localStorage.getItem('adminToken') || localStorage.getItem('token');

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  };
  if (config.body && typeof config.body === 'object') config.body = JSON.stringify(config.body);
  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const authApi = {
  async login(email, password) {
    return apiRequest('/auth/login', { method: 'POST', body: { email, password } });
  },
  async registerAdmin() {
    return apiRequest('/auth/register', { method: 'POST', body: { firstName: 'Admin', lastName: 'User', email: 'admin@admin.com', password: '123456789' } });
  }
};

export const productsApi = {
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/products${qs ? `?${qs}` : ''}`);
  },
  async create(product) {
    return apiRequest('/products', { method: 'POST', body: product });
  },
  async update(id, product) {
    return apiRequest(`/products/${id}`, { method: 'PUT', body: product });
  },
  async remove(id) {
    return apiRequest(`/products/${id}`, { method: 'DELETE' });
  },
  async promo(id, payload) {
    return apiRequest(`/products/${id}/promo`, { method: 'POST', body: payload });
  }
};

export const usersApi = {
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/users${qs ? `?${qs}` : ''}`);
  },
  async get(id) {
    return apiRequest(`/users/${id}`);
  },
  async remove(id) {
    return apiRequest(`/users/${id}`, { method: 'DELETE' });
  }
};

export const ordersApi = {
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/orders${qs ? `?${qs}` : ''}`);
  },
  async getAnalytics(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/orders/analytics${qs ? `?${qs}` : ''}`);
  },
  async get(id) {
    return apiRequest(`/orders/${id}`);
  },
  async updateStatus(id, status) {
    return apiRequest(`/orders/${id}/status`, { method: 'PATCH', body: { status } });
  }
};
