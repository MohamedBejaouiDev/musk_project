import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../state/CartContext';
import { useState } from 'react';
import { Toast } from './Toast';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      setToast({ message: 'Please login to checkout', type: 'error' });
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    if (items.length === 0) {
      setToast({ message: 'Your cart is empty!', type: 'error' });
      return;
    }

    setIsCheckingOut(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setToast({ message: 'Payment successful! Order placed.', type: 'success' });
    clearCart();
    setIsCheckingOut(false);
    setTimeout(() => navigate('/'), 1000);
  };

  if (isCheckingOut) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-6">Payment Details</h2>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-montserrat font-semibold text-gray-700 block mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                  />
                </div>
                <div>
                  <label className="font-montserrat font-semibold text-gray-700 block mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    required
                    maxLength="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                  />
                </div>
              </div>

              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-montserrat text-gray-700">Subtotal</span>
                  <span className="font-montserrat font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-montserrat text-gray-700">Shipping</span>
                  <span className="font-montserrat font-bold text-green-600">FREE</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat text-xl font-bold text-gray-900">Total</span>
                    <span className="font-montserrat text-2xl font-bold text-[#AF8D64]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-montserrat font-semibold hover:bg-gray-300"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#AF8D64] text-white py-3 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50]"
                >
                  Pay ${totalPrice.toFixed(2)}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/shop" className="inline-flex items-center gap-2 font-montserrat text-gray-600 hover:text-[#AF8D64] mb-4">
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-montserrat text-4xl font-bold text-gray-900 mb-8"
        >
          Shopping Cart
        </motion.h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="font-montserrat text-gray-600 mb-8">Add some products to get started</p>
            <Link to="/shop">
              <button className="bg-[#AF8D64] text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50]">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex gap-6">
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-montserrat text-xs text-gray-500 uppercase">{item.brand}</p>
                          <h3 className="font-montserrat text-lg font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-montserrat font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-montserrat text-xl font-bold text-[#AF8D64]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow p-6 sticky top-24"
              >
                <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-montserrat text-gray-700">Subtotal</span>
                    <span className="font-montserrat font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-montserrat text-gray-700">Shipping</span>
                    <span className="font-montserrat font-bold text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-montserrat text-xl font-bold">Total</span>
                      <span className="font-montserrat text-2xl font-bold text-[#AF8D64]">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#AF8D64] text-white py-4 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50] mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-montserrat font-semibold hover:bg-gray-200"
                >
                  Clear Cart
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
