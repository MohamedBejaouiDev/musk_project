import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Heart, Phone, LogIn, UserPlus, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCart } from '../../state/CartContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [currentUser, setCurrentUser] = useState(null);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.href = '/';
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/bespoke', label: 'Bespoke' },
    { path: '/about', label: 'Heritage' },
    { path: '/contact', label: 'Consultation' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-black text-white py-2 text-center relative overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#AF8D64]/20 to-transparent"
        />
        <p className="font-montserrat text-sm font-light tracking-widest relative z-10">
          FREE EXPRESS SHIPPING ON ORDERS OVER $200 • COMPLIMENTARY GIFT WRAPPING
        </p>
      </motion.div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-white shadow-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link 
                to="/" 
                className="font-montserrat font-black text-2xl sm:text-3xl text-black hover:text-[#AF8D64] transition-colors"
              >
                MUSK.MH
              </Link>
              
              {/* Luxury divider */}
              <div className="hidden lg:block h-8 w-px bg-gray-300"></div>
              
              {/* Tagline - hidden on mobile */}
              <p className="hidden lg:block font-montserrat text-sm font-light tracking-widest text-gray-600">
                PARIS • SINCE 1972
              </p>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.div 
                  key={item.path}
                  whileHover={{ y: -2 }} 
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Link 
                    to={item.path}
                    onClick={() => setActiveLink(item.path)}
                    className={`font-montserrat font-medium text-[16px] tracking-wide transition-colors duration-300 ${
                      activeLink === item.path 
                        ? 'text-[#AF8D64]' 
                        : 'text-gray-700 hover:text-[#AF8D64]'
                    }`}
                  >
                    {item.label}
                    {activeLink === item.path && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#AF8D64]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Auth Buttons - Desktop */}
              <div className="hidden lg:flex items-center gap-3 mr-2">
                {currentUser ? (
                  <>
                    <span className="font-montserrat text-sm text-gray-700">
                      Hi, {currentUser.firstName}
                    </span>
                    <span className="text-gray-300">|</span>
                    <motion.button 
                      onClick={handleLogout}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 font-montserrat text-sm text-gray-700 hover:text-[#AF8D64] transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 font-montserrat text-sm text-gray-700 hover:text-[#AF8D64] transition-colors"
                      >
                        <LogIn size={16} />
                        Sign In
                      </motion.button>
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link to="/signup">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 font-montserrat text-sm bg-[#AF8D64] text-white px-4 py-2 rounded-lg hover:bg-[#9a7a50] transition-colors"
                      >
                        <UserPlus size={16} />
                        Sign Up
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>

              <motion.button 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.2 }}
                className="text-gray-600 hover:text-[#AF8D64] transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.2 }}
                className="text-gray-600 hover:text-[#AF8D64] transition-colors"
              >
                <Heart size={20} strokeWidth={1.5} />
              </motion.button>

              {/* Cart with badge */}
              <Link to="/cart">
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  transition={{ duration: 0.2 }}
                  className="relative text-gray-600 hover:text-[#AF8D64] transition-colors"
                >
                  <ShoppingCart size={20} strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-[#AF8D64] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-montserrat font-bold"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Mobile menu button */}
              <motion.button 
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden text-gray-600 hover:text-[#AF8D64] transition-colors"
              >
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-lg shadow-2xl lg:hidden z-50"
              >
                <div className="flex flex-col h-full p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-12">
                    <Link 
                      to="/" 
                      onClick={() => setIsOpen(false)}
                      className="font-montserrat font-black text-2xl text-black"
                    >
                      MUSK.MH
                    </Link>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-[#AF8D64] transition-colors"
                    >
                      <X size={28} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Navigation */}
                  <nav className="flex flex-col gap-6 flex-1">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.path}
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => {
                            setActiveLink(item.path);
                            setIsOpen(false);
                          }}
                          className={`font-montserrat font-semibold text-xl transition-colors duration-300 ${
                            activeLink === item.path 
                              ? 'text-[#AF8D64]' 
                              : 'text-gray-800 hover:text-[#AF8D64]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Auth Buttons - Mobile */}
                  <div className="flex flex-col gap-4 mb-6">
                    {currentUser ? (
                      <>
                        <div className="text-center py-3 font-montserrat text-gray-700">
                          Hi, {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <motion.button 
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 font-montserrat font-semibold text-gray-700 border-2 border-gray-300 py-3 rounded-lg hover:border-[#AF8D64] hover:text-[#AF8D64] transition-colors"
                        >
                          <LogOut size={20} />
                          Logout
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 font-montserrat font-semibold text-gray-700 border-2 border-gray-300 py-3 rounded-lg hover:border-[#AF8D64] hover:text-[#AF8D64] transition-colors"
                          >
                            <LogIn size={20} />
                            Sign In
                          </motion.button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 font-montserrat font-semibold bg-[#AF8D64] text-white py-3 rounded-lg hover:bg-[#9a7a50] transition-colors"
                          >
                            <UserPlus size={20} />
                            Sign Up
                          </motion.button>
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-4">
                      <a 
                        href="tel:+18005551234"
                        className="flex items-center gap-3 font-montserrat text-gray-600 hover:text-[#AF8D64] transition-colors"
                      >
                        <Phone size={18} />
                        <span>1-800-555-1234</span>
                      </a>
                      <p className="font-montserrat text-sm text-gray-500">
                        Mon-Fri: 9AM-6PM EST<br />
                        Sat-Sun: 10AM-4PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};