import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">Sensorium</div>
          <div className="flex space-x-4">
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <Facebook />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <Instagram />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <Twitter />
            </motion.a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          © 2024 Sensorium. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;