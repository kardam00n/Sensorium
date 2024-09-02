import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Squash as Hamburger } from 'hamburger-react'; 
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeSection, sections, scrollToSection, isMenuOpen, setIsMenuOpen, scrollProgress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navRef = useRef(null);

  const navigate = useNavigate();

  const [cursorPosition, setCursorPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    opacity: 0,
  });

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
      backgroundColor: "transparent",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
    },
    solid: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      initial="transparent"
      animate={isScrolled ? "solid" : "transparent"}
      variants={navbarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className={`container mx-auto px-4 ${isMobile ? 'py-2' : 'py-4'} flex justify-between items-center relative`}>
        <motion.div 
          className={`font-bold cursor-pointer transition-all duration-300 ${
            isScrolled ? 'text-white text-2xl' : 'text-white text-4xl'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
        >
          Sensorium
        </motion.div>
        {!isMenuOpen && (
          <ul
            onMouseLeave={() => {
              setCursorPosition((prev) => ({
                ...prev,
                opacity: 0,
              }));
            }}
            className="hidden md:flex space-x-6 relative"
          >
            {sections.map((section) => (
              <Tab
                key={section}
                section={section}
                activeSection={activeSection}
                isScrolled={isScrolled}
                scrollToSection={scrollToSection}
                setCursorPosition={setCursorPosition}
              />
            ))}
            <Cursor position={cursorPosition} />
          </ul>
        )}
        <motion.div 
          className={`md:hidden cursor-pointer transition-all duration-300 ${
            isScrolled ? 'text-gray-900 text-2xl' : 'text-white text-3xl'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Hamburger 
              toggled={isMenuOpen} 
              toggle={setIsMenuOpen} 
              size={20}
              color={'white'} 
            />
        </motion.div>
      </div>
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            className="w-full h-1 bg-black-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <animated.div 
              className="h-full bg-white"
              style={springProps}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Tab = ({ section, activeSection, isScrolled, scrollToSection, setCursorPosition }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setCursorPosition({
          left: ref.current.offsetLeft - 35,
          top: ref.current.offsetTop - 9,
          width: width + 22,
          opacity: 1,
        });
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setCursorPosition((prev) => ({
          ...prev,
          opacity: 0,
        }));
        setIsHovered(false);
      }}
      className={`relative z-10 capitalize cursor-pointer transition-all duration-300 ${
        activeSection === section
          ? 'orange font-bold text-base'
          : isHovered 
            ? 'text-black text-base'
            : 'text-white text-base'
      }`}
      
      onClick={() => scrollToSection(section)}
    >
      {section === 'home' ? 'Strona Główna' :
       section === 'posts' ? 'Posty' :
       section === "about"  ? "O projekcie":
       section === 'places' ? 'Miejsca' :
       section === 'team' ? 'Zespół' :
       section === 'contact' ? 'Kontakt' : section}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.div
      animate={{
        left: position.left,
        top: position.top,
        width: position.width,
        opacity: position.opacity,
      }}
      className="absolute bottom-0 h-10 bg-white z-0"
      style={{ borderRadius: '15px'}}
    />
  );
};

export default Navbar;