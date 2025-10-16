import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white py-4 sm:py-6 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link to="/" className="font-montserrat font-black text-[28px] sm:text-[36px] lg:text-[42px] text-black hover:text-dark-gold transition-colors">
              MUSK.MH
            </Link>
          </motion.div>
          
          <nav className="hidden lg:flex gap-8 xl:gap-12">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Link to="/" className="font-montserrat font-semibold text-[18px] xl:text-[20px] text-black hover:text-dark-gold transition-colors">Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Link to="/shop" className="font-montserrat font-semibold text-[18px] xl:text-[20px] text-black hover:text-dark-gold transition-colors">Shop</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Link to="/about" className="font-montserrat font-semibold text-[18px] xl:text-[20px] text-black hover:text-dark-gold transition-colors">About Us</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Link to="/contact" className="font-montserrat font-semibold text-[18px] xl:text-[20px] text-black hover:text-dark-gold transition-colors">Contact Us</Link>
            </motion.div>
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className="text-black hover:text-dark-gold transition-colors">
              <ShoppingCart size={20} strokeWidth={2} className="sm:w-6 sm:h-6" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className="text-black hover:text-dark-gold transition-colors">
              <Search size={20} strokeWidth={2} className="sm:w-6 sm:h-6" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className="text-black hover:text-dark-gold transition-colors">
              <User size={20} strokeWidth={2} className="sm:w-6 sm:h-6" />
            </motion.button>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-black hover:text-dark-gold transition-colors">
              {isOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl lg:hidden z-[100]"
          >
            <div className="flex flex-col p-8">
              <button onClick={() => setIsOpen(false)} className="self-end mb-8 text-black hover:text-dark-gold">
                <X size={28} strokeWidth={2} />
              </button>
              <nav className="flex flex-col gap-6">
                <Link to="/" onClick={() => setIsOpen(false)} className="font-montserrat font-semibold text-[20px] text-black hover:text-dark-gold transition-colors">Home</Link>
                <Link to="/shop" onClick={() => setIsOpen(false)} className="font-montserrat font-semibold text-[20px] text-black hover:text-dark-gold transition-colors">Shop</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="font-montserrat font-semibold text-[20px] text-black hover:text-dark-gold transition-colors">About Us</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="font-montserrat font-semibold text-[20px] text-black hover:text-dark-gold transition-colors">Contact Us</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}