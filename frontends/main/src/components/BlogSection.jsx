import { motion } from 'framer-motion';

export const BlogSection = ({ title, description, image, imagePosition, buttonText, onButtonClick }) => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          {imagePosition === 'left' && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={image} alt={title} className="w-full h-auto rounded-xl shadow-2xl" />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, x: imagePosition === 'left' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="font-montserrat text-gray-600 mb-6 leading-relaxed">{description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onButtonClick}
              className="bg-[#AF8D64] text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors shadow-lg"
            >
              {buttonText}
            </motion.button>
          </motion.div>
          
          {imagePosition === 'right' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={image} alt={title} className="w-full h-auto rounded-xl shadow-2xl" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
