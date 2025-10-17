import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, User } from 'lucide-react';

export const BlogSection = ({ 
  title, 
  description, 
  image, 
  imagePosition = 'right',
  buttonText = "Read More",
  onButtonClick,
  author = "Marie-Hélène",
  readTime = "5 min read",
  category = "Luxury Insights"
}) => {
  const isImageRight = imagePosition === 'right';

  return (
    <div className="py-32 bg-gradient-to-br from-white via-gray-50 to-amber-50/30 relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#AF8D64]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-[#AF8D64]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col ${isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-20 items-center`}>
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2"
          >
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <Sparkles size={16} className="text-[#AF8D64]" />
              <span className="font-montserrat text-sm text-gray-600 uppercase tracking-widest">
                {category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-montserrat text-5xl lg:text-6xl font-bold text-black leading-tight mb-8"
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-montserrat text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl"
            >
              {description}
            </motion.p>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-10"
            >
              <div className="flex items-center gap-2">
                <User size={18} className="text-[#AF8D64]" />
                <span className="font-montserrat text-gray-600">{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#AF8D64]" />
                <span className="font-montserrat text-gray-600">{readTime}</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              onClick={onButtonClick}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-black text-white px-10 py-5 rounded-2xl font-montserrat font-semibold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {buttonText}
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#AF8D64] to-[#D4B78C]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? 80 : -80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Main Image Container */}
            <div className="relative group">
              {/* Glass Morphism Frame */}
              <div className="absolute -inset-8 bg-white/20 backdrop-blur-lg rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              
              {/* Main Image */}
              <motion.img
                src={image}
                alt={title}
                className="relative z-10 w-full h-[600px] rounded-2xl object-cover shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-2xl z-30 border border-white/20"
              >
                <div className="text-sm text-gray-500 font-montserrat">Featured</div>
                <div className="font-montserrat font-bold text-2xl text-[#AF8D64]">Story</div>
              </motion.div>

              {/* Bottom Accent */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-4 bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] rounded-full blur-sm z-0"
              ></motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#AF8D64]/10 rounded-2xl transform rotate-12"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotate: 45 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="absolute -top-8 -right-8 w-16 h-16 bg-[#AF8D64]/10 rounded-2xl transform -rotate-12"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};