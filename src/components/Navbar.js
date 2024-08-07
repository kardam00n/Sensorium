import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Menu, X } from 'lucide-react';

const Navbar = ({ activeSection, sections, scrollToSection, toggleMenu, isMenuOpen, scrollProgress }) => {
  const springProps = useSpring({
    width: `${scrollProgress}%`,
    config: { tension: 300, friction: 20 }
  });

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('home')}
        >
          Sensorium
        </motion.div>
        <div className="hidden md:flex space-x-4">
          {sections.map(section => (
            <motion.div
              key={section}
              className={`capitalize cursor-pointer ${activeSection === section ? 'text-blue-600' : 'text-gray-600'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection(section)}
            >
              {section}
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="md:hidden cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </motion.div>
      </div>
      <div className="w-full h-1 bg-gray-200">
        <animated.div 
          className="h-full bg-black"
          style={springProps}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;