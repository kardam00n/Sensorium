import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Menu, X } from 'lucide-react';

const Navbar = ({ activeSection, sections, scrollToSection, toggleMenu, isMenuOpen, scrollProgress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const springProps = useSpring({
    width: `${scrollProgress}%`,
    config: { tension: 300, friction: 20 }
  });

  const navbarVariants = {
    transparent: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
    },
    solid: {
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Changed to white
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
  };

  return (
    <motion.nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      initial="transparent"
      animate={isScrolled ? "solid" : "transparent"}
      variants={navbarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className={`font-bold cursor-pointer transition-all duration-300 ${
            isScrolled ? 'text-gray-900 text-2xl' : 'text-white text-4xl'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('home')}
        >
          Sensorium
        </motion.div>
        <div className="hidden md:flex space-x-6">
          {sections.map(section => (
            <motion.div
              key={section}
              className={`capitalize cursor-pointer transition-all duration-300 ${
                isScrolled
                  ? activeSection === section
                    ? 'text-blue-600 font-bold text-base'
                    : 'text-gray-600 text-base'
                  : activeSection === section
                  ? 'text-white font-bold text-xl'
                  : 'text-gray-200 text-xl'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection(section)}
            >
              {section === 'home' ? 'Home' :
               section === 'posts' ? 'Posty' :
               section === 'places' ? 'Miejsca' :
               section === 'team' ? 'Zespół' :
               section === 'contact' ? 'Kontakt' : section}
            </motion.div>
          ))}
        </div>
        <motion.div 
          className={`md:hidden cursor-pointer transition-all duration-300 ${
            isScrolled ? 'text-gray-900 text-2xl' : 'text-white text-3xl'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </motion.div>
      </div>
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            className="w-full h-1 bg-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <animated.div 
              className="h-full bg-black"
              style={springProps}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;