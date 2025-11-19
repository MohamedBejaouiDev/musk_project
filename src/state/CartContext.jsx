// CartContext - manages shopping cart state and provides it to all components
import { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '../services/storage';
import { toastEmitter } from '../utils/toastEmitter';
import { apiService } from '../services/api.js';
import { authService } from '../services/auth.js';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };

    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + (action.payload.quantity || 1);
        if (newQuantity > action.payload.stock) {
          toastEmitter.emit(`Only ${action.payload.stock} items available in stock!`, 'error');
          return state;
        }
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        };
      }
      
      if (!action.payload.inStock || action.payload.stock < 1) {
        toastEmitter.emit('This item is out of stock!', 'error');
        return state;
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      if (action.payload.quantity > itemToUpdate.stock) {
        toastEmitter.emit(`Only ${itemToUpdate.stock} items available in stock!`, 'error');
        return state;
      }
      if (action.payload.quantity < 1) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
};

// CartProvider - makes cart available to entire app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: storage.get('cart') || []
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set('cart', state.items);
  }, [state.items]);

  // Helper: map backend cart_items to frontend items
  const mapBackendCart = (cartItems = []) => {
    return cartItems.map(ci => {
      const product = ci.products || {};
      return {
        id: product.id,
        cartItemId: ci.id,
        title: product.title,
        price: parseFloat(product.price || 0),
        stock: product.stock || 0,
        images: product.images || [],
        quantity: ci.quantity
      };
    });
  };

  // On mount - if authenticated, fetch cart from backend
  useEffect(() => {
    let mounted = true;

    const loadCart = async () => {
      if (authService.isAuthenticated()) {
        try {
          const data = await apiService.getCart();
          // backend returns { cartItems }
          const items = mapBackendCart(data.cartItems || []);
          if (mounted) dispatch({ type: 'SET_CART', payload: items });
        } catch (err) {
          console.error('Failed to load cart from backend:', err);
        }
      }
    };

    loadCart();

    // Listen for auth changes (login/logout)
    const handler = async (e) => {
      if (e.detail && e.detail.isAuthenticated) {
        try {
          const data = await apiService.getCart();
          const items = mapBackendCart(data.cartItems || []);
          dispatch({ type: 'SET_CART', payload: items });
        } catch (err) {
          console.error('Failed to load cart after auth change:', err);
        }
      } else {
        // logged out -> keep local storage cart (already loaded)
      }
    };

    window.addEventListener('authChange', handler);

    return () => {
      mounted = false;
      window.removeEventListener('authChange', handler);
    };
  }, []);

  const addItem = async (product) => {
    if (authService.isAuthenticated()) {
      try {
        await apiService.addToCart(product.id, product.quantity || 1);
        const data = await apiService.getCart();
        const items = mapBackendCart(data.cartItems || []);
        dispatch({ type: 'SET_CART', payload: items });
        return;
      } catch (err) {
        toastEmitter.emit(err.message || 'Failed to add item', 'error');
        return;
      }
    }

    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = async (id) => {
    if (authService.isAuthenticated()) {
      try {
        const existing = state.items.find(i => i.id === id);
        if (existing && existing.cartItemId) {
          await apiService.removeFromCart(existing.cartItemId);
          const data = await apiService.getCart();
          const items = mapBackendCart(data.cartItems || []);
          dispatch({ type: 'SET_CART', payload: items });
          return;
        }
      } catch (err) {
        toastEmitter.emit(err.message || 'Failed to remove item', 'error');
        return;
      }
    }

    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = async (id, quantity) => {
    if (authService.isAuthenticated()) {
      try {
        const existing = state.items.find(i => i.id === id);
        if (existing && existing.cartItemId) {
          await apiService.updateCartItem(existing.cartItemId, quantity);
          const data = await apiService.getCart();
          const items = mapBackendCart(data.cartItems || []);
          dispatch({ type: 'SET_CART', payload: items });
          return;
        }
      } catch (err) {
        toastEmitter.emit(err.message || 'Failed to update quantity', 'error');
        return;
      }
    }

    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = async () => {
    if (authService.isAuthenticated()) {
      try {
        await apiService.clearCart();
        dispatch({ type: 'CLEAR_CART' });
        return;
      } catch (err) {
        toastEmitter.emit(err.message || 'Failed to clear cart', 'error');
        return;
      }
    }

    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};