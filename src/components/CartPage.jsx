import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../state/CartContext';
import { useState } from 'react';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsCheckingOut(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Simulate payment processing
    setTimeout(() => {
      alert('Payment successful! Order placed.');
      clearCart();
      setIsCheckingOut(false);
      navigate('/');
    }, 2000);
  };

  if (isCheckingOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50/30 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8"
          >
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-[#AF8D64]" />
              Payment Details
            </h2>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-3">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#AF8D64] transition-all duration-300 font-montserrat"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-montserrat font-semibold text-gray-700 block mb-3">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#AF8D64] transition-all duration-300 font-montserrat"
                  />
                </div>
                <div>
                  <label className="font-montserrat font-semibold text-gray-700 block mb-3">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    required
                    maxLength="3"
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#AF8D64] transition-all duration-300 font-montserrat"
                  />
                </div>
              </div>

              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-3">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#AF8D64] transition-all duration-300 font-montserrat"
                />
              </div>

              <div className="bg-amber-50 rounded-2xl p-6">
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
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-montserrat font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] text-white py-4 rounded-2xl font-montserrat font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/shop" className="inline-flex items-center gap-2 font-montserrat text-gray-600 hover:text-[#AF8D64] transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
          <h1 className="font-montserrat text-4xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-10 h-10 text-[#AF8D64]" />
            Shopping Cart
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="font-montserrat text-gray-600 mb-8">Add some luxury fragrances to get started</p>
            <Link to="/shop">
              <button className="bg-[#AF8D64] text-white px-8 py-4 rounded-2xl font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors">
                Browse Products
              </button>
            </Link>
          </motion.div>
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
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30 p-6"
                >
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-montserrat text-sm text-gray-500 uppercase">{item.brand}</p>
                          <h3 className="font-montserrat text-xl font-bold text-gray-900">{item.name}</h3>
                          <p className="font-montserrat text-sm text-gray-600">{item.size}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-montserrat font-bold text-lg w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-montserrat text-2xl font-bold text-[#AF8D64]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="font-montserrat text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 sticky top-32">
                <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat text-gray-700">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-montserrat font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat text-gray-700">Shipping</span>
                    <span className="font-montserrat font-bold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-montserrat text-xl font-bold text-gray-900">Total</span>
                      <span className="font-montserrat text-3xl font-bold text-[#AF8D64]">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] text-white py-5 rounded-2xl font-montserrat font-semibold text-lg hover:shadow-xl transition-all duration-300 mb-4"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-montserrat font-semibold hover:bg-gray-200 transition-colors"
                >
                  Clear Cart
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-montserrat">
                    <Lock className="w-4 h-4" />
                    Secure checkout
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
