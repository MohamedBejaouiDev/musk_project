import { motion } from "framer-motion";
import { useState } from "react";
import image from "../assets/heroPic.png";

export const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hidden md:block pointer-events-none select-none absolute inset-y-0 right-0
                   w-[40vw] lg:w-[42vw] xl:w-[42vw] min-w-[360px]"
      >
        <img
          src={image}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-center md:justify-start">
          <div className="w-full max-w-full md:max-w-[90%] lg:max-w-[720px] text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-montserrat font-black leading-[1.1] mb-12 sm:mb-16 text-[50px] sm:text-[58px] md:text-[66px] lg:text-[88px]"
            >
              <span className="text-black">Where Every Scent Tells </span>
              <span className="text-[#AF8D64]">Your Story</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-montserrat text-[16px] sm:text-[20px] text-gray-600 leading-relaxed mb-12 sm:mb-10 max-w-full sm:max-w-[560px] mx-auto md:mx-0"
            >
              Discover timeless perfumes crafted to embody elegance, emotion,
              and individuality. Each drop from Musk.MH is a whisper of luxury
            </motion.p>

            <motion.button
              className="relative font-montserrat font-semibold text-[20px] sm:text-[24px] text-black pb-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05, color: "#AF8D64" }}
              transition={{ duration: 0.2 }}
            >
              Discover
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-[#AF8D64]"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
