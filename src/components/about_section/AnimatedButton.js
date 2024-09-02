import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AnimatedButton = ({ isInView, text, route }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex justify-center mt-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 2, ease: "easeOut", delay: isInView ? 2 : 0 }}
    >
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#FFCCAA", color: "#000000" }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 relative overflow-hidden"
        onClick={() => navigate(route)}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-50"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        />
        {text}
      </motion.button>
    </motion.div>
  );
};

export default AnimatedButton;
