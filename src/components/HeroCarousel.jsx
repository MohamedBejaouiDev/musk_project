import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[500px] bg-gradient-to-br from-amber-50 via-white to-gray-50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              <div>
                <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">
                  {slides[current].title}
                </h2>
                <p className="font-montserrat text-xl text-gray-600 mb-6">
                  {slides[current].description}
                </p>
                <Link to={slides[current].link}>
                  <button className="bg-[#AF8D64] text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors">
                    {slides[current].buttonText}
                  </button>
                </Link>
              </div>
              <div>
                <img src={slides[current].image} alt={slides[current].title} className="w-full h-auto rounded-lg shadow-2xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${current === index ? 'bg-[#AF8D64] w-8' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};
