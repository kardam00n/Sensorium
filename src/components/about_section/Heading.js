import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ isInView }) => {
  return (
    <motion.h2
      className="text-4xl font-bold mb-5"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -50 }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{ color: "#D3D3D3" }} // Metaliczny efekt dla nagłówka
    >
      O projekcie
    </motion.h2>
  );
};

export default Heading;
