import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './state/CartContext';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { Toast } from './components/Toast';
import { useState, useEffect } from 'react';
import { toastEmitter } from './utils/toastEmitter';

export default function App() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsubscribe = toastEmitter.subscribe(setToast);
    return unsubscribe;
  }, []);

  return (
    <CartProvider>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <BrowserRouter>
        <Routes>
          {/* Pages without layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Pages with layout (Header + Footer) */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}