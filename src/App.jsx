import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './state/CartContext';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}