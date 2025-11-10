import { motion } from 'framer-motion';
import Chanel from '../assets/Chanel.png';
import Dior from '../assets/Dior.png';
import Gucci from '../assets/Gucci.png';
import Prada from '../assets/Prada.png';
import Versace from '../assets/Versace.png';
import Armani from '../assets/Armani.png';
import YSL from '../assets/ysl.png';
import TF from '../assets/tf.png';

export const BrandBar = () => {
  const brands = [Chanel, Dior, Gucci, Prada, Versace, Armani, YSL, TF];

  return (
    <div className="bg-white py-16 border-y border-gray-200 overflow-hidden">
      <div className="space-y-12">
      
        <div className="relative">
          <motion.div 
            className="flex gap-16"
            animate={{ x: [0, -2000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands, ...brands].map((logo, index) => (
              <img key={index} src={logo} alt="Brand" className="h-20 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0" />
            ))}
          </motion.div>
        </div>

       
        <div className="relative">
          <motion.div 
            className="flex gap-16"
            animate={{ x: [-2000, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands, ...brands].map((logo, index) => (
              <img key={index} src={logo} alt="Brand" className="h-20 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0" />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
