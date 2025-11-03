import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Toast } from './Toast';

export const GetInTouch = () => {
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ message: 'Message sent successfully!', type: 'success' });
    e.target.reset();
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-montserrat text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, title: 'Email', value: 'contact@musk.mh' },
              { icon: Phone, title: 'Phone', value: '+1 (800) 555-1234' },
              { icon: MapPin, title: 'Address', value: '123 Luxury Ave, Paris, France' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <item.icon className="w-6 h-6 text-[#AF8D64] mt-1" />
                <div>
                  <h3 className="font-montserrat font-semibold text-gray-900">{item.title}</h3>
                  <p className="font-montserrat text-gray-600">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 bg-white p-8 rounded-xl shadow-lg"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat transition-colors"
            />
            <textarea
              placeholder="Your Message"
              required
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] font-montserrat resize-none transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#AF8D64] text-white py-3 rounded-lg font-montserrat font-semibold hover:bg-[#9a7a50] transition-colors shadow-lg"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
    </>
  );
};
