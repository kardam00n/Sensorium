import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  // Definiujemy style dla tła
  const backgroundStyle = {
    background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(30,30,30,1) 100%)", // Statyczny gradient tła
    position: "relative",
    overflow: "hidden",
  };

  return (
    <>
      {/* Element tła, który używa stylu backgroundStyle */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/moon_display.jpg')", // Zdjęcie tła
          scale: 1.2,
          filter: "grayscale(100%) brightness(0.5)" // Apply greyscale and tone down the brightness
        }} 
      />
      {/* Gradient overlay to ease into black color from top */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%)" }}></div>
      {/* Gradient overlay to ease into black color from bottom */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%)" }}></div>
      {/* Statyczny gradient, który dodaje dodatkową warstwę tła */}
      <div style={{ ...backgroundStyle }}></div>
    </>
  );
};

export default Background;
