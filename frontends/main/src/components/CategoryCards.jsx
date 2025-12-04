import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

export const CategoryCards = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-montserrat text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Shop by Category
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/shop?category=${category.name}`}>
                <div className="bg-gradient-to-br from-amber-50 to-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="text-4xl mb-3">🌸</div>
                  <h3 className="font-montserrat font-semibold text-gray-900 group-hover:text-[#AF8D64] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
