import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaPinterestP,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
  FaApplePay,
  FaHeart
} from 'react-icons/fa';
import { 
  Crown, 
  Sparkles, 
  Gift, 
  Truck, 
  Shield, 
  Heart 
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "MUSK.MH",
      content: (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-montserrat text-2xl font-black mb-2 bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] bg-clip-text text-transparent">
              MUSK.MH
            </h3>
            <p className="font-montserrat text-gray-600 leading-relaxed">
              Where every scent tells your story. Discover timeless perfumes crafted to embody elegance, emotion, and individuality.
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 pt-4"
          >
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <Shield className="w-3 h-3 text-green-600" />
              <span className="font-montserrat text-xs text-green-700">Secure</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
              <Truck className="w-3 h-3 text-blue-600" />
              <span className="font-montserrat text-xs text-blue-700">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
              <Gift className="w-3 h-3 text-purple-600" />
              <span className="font-montserrat text-xs text-purple-700">Gift Wrap</span>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: "Collections",
      links: [
        { name: "Signature Scents", href: "#" },
        { name: "Limited Editions", href: "#" },
        { name: "Bespoke Fragrances", href: "#" },
        { name: "Seasonal Collection", href: "#" },
        { name: "Classic Heritage", href: "#" }
      ]
    },
    {
      title: "Client Services",
      links: [
        { name: "Personal Consultation", href: "#" },
        { name: "Fragrance Profiling", href: "#" },
        { name: "Shipping & Delivery", href: "#" },
        { name: "Returns & Exchanges", href: "#" },
        { name: "Care Instructions", href: "#" }
      ]
    },
    {
      title: "Atelier Information",
      content: (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 text-gray-600">
              <FaMapMarkerAlt className="w-4 h-4 text-[#AF8D64] flex-shrink-0" />
              <span className="font-montserrat text-sm">123 Rue de Parfum, Paris 75001</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaPhone className="w-4 h-4 text-[#AF8D64] flex-shrink-0" />
              <span className="font-montserrat text-sm">+1 (555) 321-MUSK</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaEnvelope className="w-4 h-4 text-[#AF8D64] flex-shrink-0" />
              <span className="font-montserrat text-sm">contact@musk.mh</span>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <h4 className="font-montserrat font-semibold text-black mb-3">Follow Our Journey</h4>
            <div className="flex gap-3">
              {[
                { Icon: FaInstagram, color: "hover:text-pink-600" },
                { Icon: FaFacebookF, color: "hover:text-blue-600" },
                { Icon: FaTwitter, color: "hover:text-blue-400" },
                { Icon: FaPinterestP, color: "hover:text-red-600" }
              ].map(({ Icon, color }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 ${color} hover:bg-gray-200`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  const paymentMethods = [
    { Icon: FaCcVisa, name: "Visa" },
    { Icon: FaCcMastercard, name: "Mastercard" },
    { Icon: FaCcAmex, name: "American Express" },
    { Icon: FaPaypal, name: "PayPal" },
    { Icon: FaApplePay, name: "Apple Pay" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#AF8D64]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AF8D64]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#AF8D64]/20 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h4 className="font-montserrat font-bold text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#AF8D64]" />
                  {section.title}
                </h4>
                
                {section.links ? (
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (linkIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <a
                          href={link.href}
                          className="font-montserrat text-gray-400 hover:text-[#AF8D64] transition-colors duration-300 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-[#AF8D64] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  section.content
                )}
              </motion.div>
            ))}

            {/* Newsletter Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-4 mt-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center lg:text-left">
                    <h4 className="font-montserrat font-bold text-2xl text-white mb-2 flex items-center justify-center lg:justify-start gap-3">
                      <Crown className="w-6 h-6 text-[#AF8D64]" />
                      Join Our Inner Circle
                    </h4>
                    <p className="font-montserrat text-gray-400">
                      Be the first to discover new scents, exclusive offers, and private events.
                    </p>
                  </div>
                  
                  <div className="flex-1 w-full max-w-md">
                    <div className="flex gap-3">
                      <input
                        type="email"
                        placeholder="Your elegant email..."
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AF8D64] transition-colors duration-300 font-montserrat"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] text-white px-6 py-3 rounded-lg font-montserrat font-semibold transition-all duration-300 hover:shadow-lg"
                      >
                        Subscribe
                      </motion.button>
                    </div>
                    <p className="font-montserrat text-xs text-gray-400 mt-2 text-center lg:text-left">
                      Unsubscribe at any time. We respect your privacy.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 text-gray-400"
              >
                <span className="font-montserrat text-sm">
                  &copy; {currentYear} MUSK.MH. All rights reserved.
                </span>
                <span className="flex items-center gap-1 font-montserrat text-sm">
                  Crafted with <Heart className="w-3 h-3 text-[#AF8D64]" /> in Paris
                </span>
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <span className="font-montserrat text-sm text-gray-400 mr-2">We Accept:</span>
                <div className="flex gap-3">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={method.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-2xl text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <method.Icon />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 font-montserrat text-sm text-gray-400"
              >
                <a href="#" className="hover:text-[#AF8D64] transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-[#AF8D64] transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-[#AF8D64] transition-colors duration-300">Cookie Policy</a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};