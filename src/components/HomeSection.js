import React from 'react';
import { motion } from 'framer-motion';

const HomeSection = () => {
  const letters = "SENSORIUM".split("");


  const generateRectangles = () => {
    const rectangles = [];
    const rectWidth = 400; 
    const rectHeight = 300; 
    const rows = Math.ceil(window.innerHeight / rectHeight);
    const cols = Math.ceil(window.innerWidth / rectWidth);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const delay = (row + col) * 0.1;

        rectangles.push(
          <motion.path
            key={`${row}-${col}`}
            d={`M${col * rectWidth} ${row * rectHeight} h${rectWidth} v${rectHeight} h-${rectWidth} Z`}
            fill="none"
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="0.8" 
            initial={{ strokeDasharray: (rectWidth + rectHeight) * 2, strokeDashoffset: (rectWidth + rectHeight) * 2 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
          />
        );
      }
    }

    return rectangles;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/sensorium.jpg')", 
          filter: "brightness(0.8) contrast(1.1) saturate(0.9)",
          mixBlendMode: "overlay"
        }}
      />
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))"
        }}
      />
      
      <div className="absolute inset-0 z-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="400" height="300" patternUnits="userSpaceOnUse">
              {generateRectangles()}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-30 text-center text-white">
        <div className="overflow-hidden">
          {letters.map((letter, index) => {
            const duration = 0.3 + Math.random() * 0.7; // 0.3 do 1 sekundy
            const delay = index * 0.1;

            return (
              <motion.span
                key={index}
                className="inline-block text-8xl font-bold"
                style={{ 
                  fontFamily: "Arial, Helvetica, sans-serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  letterSpacing: "0.5em",
                  marginRight: "-0.2em"
                }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: duration, 
                  delay: delay,
                  ease: "easeOut"
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
