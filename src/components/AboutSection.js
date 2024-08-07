import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">O Sensorium</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-6">
            Sensorium to nowoczesna aplikacja artystyczna, która przesuwa granice percepcji sztuki.
            Naszą misją jest tworzenie immersyjnych środowisk, które angażują wszystkie Twoje zmysły, 
            przenosząc Cię do nowych światów wyobraźni i zachwytu. Odkryj sztukę w sposób, który dotąd był niemożliwy, 
            i pozwól się porwać niezwykłym doznaniom artystycznym.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold"
          >
            Poznaj szczegóły
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;