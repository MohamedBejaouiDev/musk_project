import { motion } from 'framer-motion';
import { Gem, Globe, Crown, Sparkles, Award, Heart } from 'lucide-react';

export const AboutUs = () => {
  const features = [
    {
      icon: Gem,
      title: "Premium Quality",
      description: "Every fragrance in our collection is meticulously crafted using the world's rarest ingredients and time-honored techniques.",
      accent: "from-[#AF8D64] to-[#D4B78C]"
    },
    {
      icon: Globe,
      title: "Global Collection",
      description: "We journey across continents to source exceptional scents, bringing you an exclusive selection of the world's most prestigious perfumes.",
      accent: "from-[#8D6AF8] to-[#B78CFA]"
    },
    {
      icon: Crown,
      title: "Luxury Experience",
      description: "From the moment you explore our collection to the final spray, we ensure every interaction is imbued with elegance and sophistication.",
      accent: "from-[#64AF8D] to-[#8CD4B7]"
    }
  ];

  const stats = [
    { number: "50+", label: "Exclusive Scents" },
    { number: "1972", label: "Established" },
    { number: "100K+", label: "Luxury Clients" },
    { number: "25", label: "Countries Served" }
  ];

  return (
    <div className="relative py-32 bg-gradient-to-br from-white via-gray-50 to-amber-50/30 overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#AF8D64]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AF8D64]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#AF8D64]/20 to-transparent"></div>
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
          {/* Decorative Element */}
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
            The Art of <span className="bg-gradient-to-r from-[#AF8D64] to-[#D4B78C] bg-clip-text text-transparent">Scent</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-montserrat text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            At <span className="font-semibold text-[#AF8D64]">MUSK.MH</span>, we believe fragrance is the invisible accessory that completes your story. 
            Each scent is a masterpiece, carefully composed to evoke emotions, memories, and dreams.
          </motion.p>

          {/* Heritage Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-sm px-6 py-3 rounded-full border border-[#AF8D64]/20"
          >
            <Award className="w-5 h-5 text-[#AF8D64]" />
            <span className="font-montserrat text-sm text-gray-600 uppercase tracking-widest">
              Crafting Excellence Since 1972
            </span>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 group-hover:shadow-xl transition-all duration-300"
              >
                <div className="font-montserrat font-black text-3xl lg:text-4xl text-[#AF8D64] mb-2">
                  {stat.number}
                </div>
                <div className="font-montserrat text-sm text-gray-600 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-5 rounded-3xl blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 group-hover:shadow-3xl transition-all duration-500 h-full">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 bg-gradient-to-br ${feature.accent} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="font-montserrat text-2xl font-bold text-black text-center mb-4">
                  {feature.title}
                </h3>
                <p className="font-montserrat text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Bottom Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`mx-auto mt-6 h-1 bg-gradient-to-r ${feature.accent} rounded-full`}
                ></motion.div>
              </div>

              {/* Floating Sparkles */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-[#AF8D64]" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30 max-w-4xl mx-auto">
            <Heart className="w-12 h-12 text-[#AF8D64] mx-auto mb-6" />
            <h3 className="font-montserrat text-3xl font-bold text-black mb-6">
              Our Promise
            </h3>
            <p className="font-montserrat text-xl text-gray-600 leading-relaxed">
              To deliver not just fragrances, but <span className="text-[#AF8D64] font-semibold">timeless experiences</span> that become part of your story. 
              Every bottle is a promise of luxury, quality, and the art of fine perfumery.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};