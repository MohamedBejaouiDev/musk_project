import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../state/CartContext';
import productsData from '../data/products.json';

export const FeaturedProducts = ({ products, title }) => {
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    const rawProduct = productsData.find(p => p.id === product.id);
    addItem({ ...product, stock: rawProduct?.stock || 0 });
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-montserrat text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          {title}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <p className="font-montserrat text-xs text-gray-500 uppercase">{product.brand}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-montserrat font-semibold text-gray-900 hover:text-[#AF8D64] mb-2 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating.average) ? "fill-[#AF8D64] text-[#AF8D64]" : "text-gray-300"}
                    />
                  ))}
                  <span className="font-montserrat text-xs text-gray-600 ml-1">
                    ({product.rating.average})
                  </span>
                </div>
                
                <p className="font-montserrat font-bold text-lg text-[#AF8D64] mb-3">
                  ${product.price}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-2 rounded-lg font-montserrat text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    product.stock > 0
                      ? 'bg-black text-white hover:bg-[#AF8D64]'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={16} />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
