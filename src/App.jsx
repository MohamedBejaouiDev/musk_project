import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './state/CartContext';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}