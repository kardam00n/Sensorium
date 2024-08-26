import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = () => {
  return (
    <motion.div
      className="flex justify-center mt-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut", delay: 2 }}
    >
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#FFCCAA", color: "#000000" }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-50"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        />
        Poznaj szczegóły
      </motion.button>
    </motion.div>
  );
};

export default AnimatedButton;
