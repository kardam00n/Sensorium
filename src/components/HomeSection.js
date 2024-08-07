import React from 'react';
import { motion } from 'framer-motion';

const HomeSection = ({ videoRef, scrollToSection }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="/colors.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Witaj w Sensorium</h1>
          <p className="text-xl mb-8 text-shadow-md">Zanurz się w świecie artystycznych doznań</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold"
            onClick={() => scrollToSection('posts')}
          >
            Dowiedz się więcej
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;