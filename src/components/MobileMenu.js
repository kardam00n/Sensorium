import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = ({ isMenuOpen, toggleMenu, sections, activeSection, scrollToSection }) => {
  const [cursorPosition, setCursorPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredSection, setHoveredSection] = useState(null);

  const handleMouseEnter = useCallback((e, section) => {
    const { offsetWidth, offsetLeft, offsetTop } = e.currentTarget;
    var shift = 35;
    setCursorPosition({
      left: offsetLeft + shift,
      top: offsetTop - 3,
      width: offsetWidth - 2 * shift,
      opacity: 1,
    });
    setHoveredSection(section);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPosition((prev) => ({
      ...prev,
      opacity: 0,
    }));
    setHoveredSection(null);
  }, []);

  useEffect(() => {
    // do mobilnego urządzenia potrzebne
    setCursorPosition((prev) => ({
      ...prev,
      opacity: 0,
    }));
    setHoveredSection(null);
  }, [activeSection]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="relative flex flex-col h-full justify-between">
              <div className="p-4">
                <div className="mt-20 space-y-4">
                  {sections.map(section => (
                    <motion.div
                      key={section}
                      className={`relative z-10 block capitalize text-lg cursor-pointer transition-all duration-300 ${
                        hoveredSection === section
                          ? 'text-white'
                          : activeSection === section
                          ? 'text-blue-600 '
                          : 'text-gray-600'
                      } 
                      ${activeSection === section
                        ? 'font-bold'
                        : ''}`}
                      whileHover={{ scale: 1.1, originX: 0 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        scrollToSection(section);
                        toggleMenu();
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, section)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {section}
                    </motion.div>
                  ))}
                </div>
              </div>
              <Cursor position={cursorPosition} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      className="absolute z-0"
      style={{ borderRadius: '15px', height: '35px', backgroundColor: 'black' }}
    />
  );
};

export default MobileMenu;
