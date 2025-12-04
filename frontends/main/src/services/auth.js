import { apiService } from './api.js';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.loadUserFromStorage();
  }

  loadUserFromStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
      this.currentUser = JSON.parse(user);
    }
  }

  async register(userData) {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...apiData } = userData;
      const response = await apiService.register(apiData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      
      this.currentUser = response.user;
      this.dispatchAuthChange();
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await apiService.login(credentials);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      
      this.currentUser = response.user;
      this.dispatchAuthChange();
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.dispatchAuthChange();
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  dispatchAuthChange() {
    window.dispatchEvent(new CustomEvent('authChange', {
      detail: { user: this.currentUser, isAuthenticated: this.isAuthenticated() }
    }));
  }
}

export const authService = new AuthService();