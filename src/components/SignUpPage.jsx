import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Toast } from './Toast';

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setToast({ message: "Passwords don't match!", type: 'error' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      setToast({ message: 'Email already registered!', type: 'error' });
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ ...newUser, password: undefined }));
    window.dispatchEvent(new Event('authChange'));
    
    setToast({ message: 'Account created successfully!', type: 'success' });
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="font-montserrat text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="font-montserrat text-gray-600 mb-8">Join us today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                  placeholder="Doe"
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                  placeholder="Create password"
                />
              </div>

              <div>
                <label className="font-montserrat font-semibold text-gray-700 block mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#AF8D64] text-white py-3 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors"
            >
              Create Account
            </button>

            <p className="text-center font-montserrat text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#AF8D64] hover:text-[#9a7a50]">
                Sign in
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
