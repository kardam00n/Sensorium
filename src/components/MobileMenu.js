import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MobileMenu = ({ isMenuOpen, toggleMenu, sections, activeSection, scrollToSection }) => {
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
            <div className="flex flex-col h-full justify-between">
              <div className="p-4">
                <div className="flex justify-end">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMenu}
                  >
                    <X />
                  </motion.div>
                </div>
                <div className="mt-8 space-y-4">
                  {sections.map(section => (
                    <motion.div
                      key={section}
                      className={`block capitalize text-lg cursor-pointer ${activeSection === section ? 'text-blue-600' : 'text-gray-600'}`}
                      whileHover={{ scale: 1.1, originX: 0 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        scrollToSection(section);
                        toggleMenu();
                      }}
                    >
                      {section}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;