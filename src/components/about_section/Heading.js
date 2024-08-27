import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ isInView }) => {
  return (
    <motion.h2
      className="text-7xl md:text-9xl mb-6 inline-block font-bold"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -50 }}
      transition={{ duration: 3, ease: "easeOut" }}
      style={{ color: "#D3D3D3", padding: 10, zIndex: 1 }}
    >
      O projekcie
    </motion.h2>
  );
};

export default Heading;