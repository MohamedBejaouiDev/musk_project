import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, Sparkles, Heart } from "lucide-react";
import image from "../assets/heroPic.png";

export const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  
  const luxuryWords = ["Elegance", "Sophistication", "Timeless", "Exquisite", "Luxury"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % luxuryWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-amber-50">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gold gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-[#AF8D64]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-tl from-[#AF8D64]/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Geometric luxury patterns */}
        <div className="absolute top-20 right-1/4 w-2 h-32 bg-[#AF8D64]/20"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-2 bg-[#AF8D64]/20"></div>
        
        {/* Floating particles */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 left-20 w-1 h-1 bg-[#AF8D64] rounded-full"
        />
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute bottom-40 right-32 w-1 h-1 bg-[#AF8D64] rounded-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Luxury Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <Sparkles size={16} className="text-[#AF8D64]" />
              <span className="font-montserrat text-sm text-gray-600 uppercase tracking-widest">
                Since 1972
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-montserrat font-black leading-[1.1] mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="text-black block">Crafting</span>
              <motion.span 
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#AF8D64] block bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] bg-clip-text text-transparent"
              >
                {luxuryWords[currentWord]}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-montserrat text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Experience the art of perfumery with our exclusive collection of bespoke fragrances. 
              Each scent is meticulously crafted to capture moments of pure elegance and sophistication.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start mb-12"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#AF8D64] rounded-full"></div>
                <span className="font-montserrat text-sm text-gray-600">Natural Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#AF8D64] rounded-full"></div>
                <span className="font-montserrat text-sm text-gray-600">French Craftsmanship</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#AF8D64] rounded-full"></div>
                <span className="font-montserrat text-sm text-gray-600">Sustainable Luxury</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                className="relative font-montserrat font-semibold text-lg bg-black text-white px-8 py-4 rounded-lg overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Explore Collection</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#AF8D64] to-[#D4B78C]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button
                className="font-montserrat font-semibold text-lg border-2 border-black text-black px-8 py-4 rounded-lg hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart size={20} />
                Book Consultation
              </motion.button>
            </motion.div>
          </div>

          {/* Perfume Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
            className="hidden lg:block relative w-1/2 h-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Glass morphism container */}
              <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
                <motion.img
                  src={image}
                  alt="Luxury Perfume"
                  className="w-full h-full max-w-md object-contain drop-shadow-2xl"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.5 }
                  }}
                />
                
                {/* Floating price tag */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -right-4 top-1/4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border"
                >
                  <div className="text-sm text-gray-500">Starting from</div>
                  <div className="font-montserrat font-bold text-xl text-[#AF8D64]">$189</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#AF8D64] transition-colors"
        >
          <span className="font-montserrat text-sm uppercase tracking-widest">Discover More</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
};