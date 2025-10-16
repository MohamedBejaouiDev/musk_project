import { motion } from 'framer-motion';
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
  const brandsRow1 = [
    Chanel, Dior, Gucci, TomFord, Versace, Prada
  ];
  
  const brandsRow2 = [
    Armani, YSL, Givenchy, Hermes, Creed, Amouage
  ];

  return (
    <div className="py-16 bg-white">
      <div className="overflow-hidden">
        <div className="flex py-8 overflow-hidden">
          <motion.div 
            className="flex gap-16"
            animate={{ x: [0, -1800] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop",
              duration: 25,
              ease: "linear"
            }}
          >
            {[...brandsRow1, ...brandsRow1, ...brandsRow1, ...brandsRow1].map((logo, index) => (
              <div 
                key={`brand1-${index}`} 
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              >
                <img src={logo} alt="Brand" className="h-24 w-auto object-contain" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex py-8 overflow-hidden">
          <motion.div 
            className="flex gap-16"
            animate={{ x: [-1800, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop",
              duration: 25,
              ease: "linear"
            }}
          >
            {[...brandsRow2, ...brandsRow2, ...brandsRow2, ...brandsRow2].map((logo, index) => (
              <div 
                key={`brand2-${index}`} 
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              >
                <img src={logo} alt="Brand" className="h-24 w-auto object-contain" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};