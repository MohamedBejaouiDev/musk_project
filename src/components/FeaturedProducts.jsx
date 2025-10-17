import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const FeaturedProducts = ({ products, title = "Featured Collection" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-montserrat text-4xl font-bold text-center mb-12 text-black"
        >
          {title}
        </motion.h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-[#AF8D64]" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-[#AF8D64]" />
          </button>

          {/* Main Featured Card */}
          <div className="relative h-[600px] flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 }
                }}
                className="absolute w-[75%] bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              >
                <div className="flex h-full">
                  {/* Image Section */}
                  <div className="flex-1 relative bg-gray-100">
                    <motion.img
                      src={products[currentIndex].images[0]}
                      alt={products[currentIndex].title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-[#AF8D64] text-white px-4 py-2 rounded-full text-sm font-bold font-montserrat shadow-lg">
                        FEATURED
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 font-montserrat uppercase tracking-wide mb-2">
                        {products[currentIndex].brand}
                      </p>
                      <h3 className="font-montserrat font-bold text-3xl text-black mb-4 leading-tight">
                        {products[currentIndex].title}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={i < Math.floor(products[currentIndex].rating.average) 
                              ? "fill-[#AF8D64] text-[#AF8D64]" 
                              : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-gray-600 ml-2 text-lg font-semibold">
                          ({products[currentIndex].rating.average})
                        </span>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        Premium quality product with exceptional craftsmanship and attention to detail. 
                        Designed for those who appreciate the finer things in life.
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          In Stock
                        </span>
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Free Shipping
                        </span>
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          30-Day Returns
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="font-montserrat font-bold text-4xl text-[#AF8D64]">
                          ${products[currentIndex].price}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                          ${Math.round(products[currentIndex].price * 1.2)}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          Save 20%
                        </span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black text-white px-8 py-4 rounded-xl font-montserrat font-semibold hover:bg-[#AF8D64] transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            {products.map((product, index) => (
              <motion.button
                key={product.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-[#AF8D64] scale-110' 
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 object-cover"
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-[#AF8D64]/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="bg-gray-200 rounded-full h-1 w-64 overflow-hidden">
              <motion.div
                className="h-full bg-[#AF8D64] rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentIndex + 1) / products.length) * 100}%` 
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};