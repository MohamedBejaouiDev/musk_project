import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroPic from '../assets/heroPic.png';

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="font-montserrat text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover Your
              <span className="text-[#AF8D64] block">Signature Scent</span>
            </motion.h1>
            <motion.p 
              className="font-montserrat text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Luxury fragrances crafted for those who appreciate elegance
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/shop">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#AF8D64] text-white px-8 py-4 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors shadow-lg"
                >
                  Shop Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img src={heroPic} alt="Perfume" className="w-full h-auto rounded-lg shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
