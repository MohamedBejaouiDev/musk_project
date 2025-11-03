import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Toast } from './Toast';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ ...user, password: undefined }));
      window.dispatchEvent(new Event('authChange'));
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } else {
      setToast({ message: 'Invalid email or password!', type: 'error' });
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="font-montserrat text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="font-montserrat text-gray-600 mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-montserrat font-semibold text-gray-700 block mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="font-montserrat font-semibold text-gray-700 block mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#AF8D64] text-white py-3 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors"
            >
              Sign In
            </button>

            <p className="text-center font-montserrat text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-[#AF8D64] hover:text-[#9a7a50]">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};
