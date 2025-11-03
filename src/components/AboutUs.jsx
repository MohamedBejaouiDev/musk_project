import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw } from 'lucide-react';

export const AboutUs = () => {
  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $200' },
    { icon: Shield, title: 'Authentic Products', description: '100% genuine fragrances' },
    { icon: RotateCcw, title: 'Easy Returns', description: '30-day return policy' }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-montserrat text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Why Choose Us
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="w-12 h-12 text-[#AF8D64] mx-auto mb-4" />
              </motion.div>
              <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="font-montserrat text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
