import { motion } from 'framer-motion';
import { Crown, Sparkles, Star } from 'lucide-react';
import Chanel from '../assets/Chanel.png';
import Dior from '../assets/Dior.png';
import Gucci from '../assets/Gucci.png';
import TomFord from '../assets/tf.png';
import Versace from '../assets/Versace.png';
import Prada from '../assets/Prada.png';
import Armani from '../assets/Armani.png';
import YSL from '../assets/ysl.png';
import Givenchy from '../assets/Givenchy.png';
import Hermes from '../assets/hermes.png';
import Creed from '../assets/Creed.png';
import Amouage from '../assets/Amouage.png';

export const BrandBar = () => {
  const luxuryBrands = [
    { logo: Chanel, name: "Chanel", established: "1910" },
    { logo: Dior, name: "Dior", established: "1946" },
    { logo: Gucci, name: "Gucci", established: "1921" },
    { logo: TomFord, name: "Tom Ford", established: "2005" },
    { logo: Versace, name: "Versace", established: "1978" },
    { logo: Prada, name: "Prada", established: "1913" },
    { logo: Armani, name: "Armani", established: "1975" },
    { logo: YSL, name: "Yves Saint Laurent", established: "1961" },
    { logo: Givenchy, name: "Givenchy", established: "1952" },
    { logo: Hermes, name: "Hermès", established: "1837" },
    { logo: Creed, name: "Creed", established: "1760" },
    { logo: Amouage, name: "Amouage", established: "1983" }
  ];

  const firstRow = luxuryBrands.slice(0, 6);
  const secondRow = luxuryBrands.slice(6);

  return (
    <div className="relative py-32 bg-gradient-to-br from-white via-gray-50 to-amber-50/30 overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#AF8D64]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AF8D64]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-4 h-4 bg-[#AF8D64] rounded-full"></div>
              <div className="absolute top-1/2 left-8 w-20 h-px bg-[#AF8D64] transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-8 w-20 h-px bg-[#AF8D64] transform -translate-y-1/2"></div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-montserrat text-5xl lg:text-7xl font-bold text-black mb-8 leading-tight"
          >
            Curated <span className="bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] bg-clip-text text-transparent">Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-montserrat text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            We partner with the world's most prestigious fragrance houses to bring you an exclusive collection of timeless scents
          </motion.p>

          {/* Heritage Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-sm px-6 py-3 rounded-full border border-[#AF8D64]/20"
          >
            <Crown className="w-5 h-5 text-[#AF8D64]" />
            <span className="font-montserrat text-sm text-gray-600 uppercase tracking-widest">
              Heritage Brands Since 1760
            </span>
          </motion.div>
        </motion.div>

        {/* First Row of Brands */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-20"></div>
          
          <motion.div 
            className="flex gap-16 lg:gap-24"
            animate={{ x: [0, -1800] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop",
              duration: 40,
              ease: "linear"
            }}
          >
            {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((brand, index) => (
              <motion.div 
                key={`brand1-${index}`} 
                className="flex flex-col items-center justify-center flex-shrink-0 group relative"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Logo Container */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#AF8D64]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Sparkle Effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-5 h-5 text-[#AF8D64]" />
                  </motion.div>
                </div>

                {/* Brand Info - Appears on Hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-20 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-center min-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="font-montserrat font-bold text-sm whitespace-nowrap">
                    {brand.name}
                  </div>
                  <div className="font-montserrat text-xs text-gray-300">
                    Since {brand.established}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center my-12"
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#AF8D64] to-transparent"></div>
        </motion.div>

        {/* Second Row of Brands */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-20"></div>
          
          <motion.div 
            className="flex gap-16 lg:gap-24"
            animate={{ x: [-1800, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop",
              duration: 40,
              ease: "linear"
            }}
          >
            {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((brand, index) => (
              <motion.div 
                key={`brand2-${index}`} 
                className="flex flex-col items-center justify-center flex-shrink-0 group relative"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Logo Container */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#AF8D64]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Sparkle Effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Star className="w-5 h-5 text-[#AF8D64]" />
                  </motion.div>
                </div>

                {/* Brand Info - Appears on Hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-20 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-center min-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="font-montserrat font-bold text-sm whitespace-nowrap">
                    {brand.name}
                  </div>
                  <div className="font-montserrat text-xs text-gray-300">
                    Since {brand.established}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 max-w-2xl mx-auto">
            <h3 className="font-montserrat text-2xl font-bold text-black mb-4">
              Legacy of Luxury
            </h3>
            <p className="font-montserrat text-gray-600 leading-relaxed">
              Each brand in our collection represents centuries of perfumery excellence, 
              from Creed's royal heritage to Amouage's modern artistry. Discover the stories behind every scent.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};