import { motion } from 'framer-motion';
import { ArrowRight, Sun } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Hero = () => {
  const { data } = useInstantDB();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br"
        style={{ 
          backgroundImage: `linear-gradient(to bottom right, ${data.colors?.hero || '#0EA5E9'}, ${data.colors?.accent || '#60A5FA'})` 
        }}
      >
        {data.hero.banner && (
          <div className="absolute inset-0 bg-black/30">
            <img 
              src={data.hero.banner} 
              alt="Hero" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}
      </div>

      {/* Animated Solar Panels */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 opacity-20"
        >
          <Sun className="w-32 h-32 text-white" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 opacity-20"
        >
          <Sun className="w-40 h-40 text-white" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Sun className="w-20 h-20 text-white animate-float" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {data.hero.title}
          </h1>
          
          <p className="text-2xl md:text-3xl font-medium mb-4 text-gray-100">
            {data.hero.subtitle}
          </p>

          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-100">
            {data.hero.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-2xl flex items-center space-x-2 mx-auto hover:opacity-90"
            style={{ backgroundColor: data.colors?.secondary || '#0EA5E9' }}
          >
            <span>{data.hero.cta}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">ISO 9001:2015 Certified</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">OREDA Registered</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">MNRE Compliant</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
