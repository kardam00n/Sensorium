import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <motion.section 
      ref={sectionRef}
      id="about" 
      className="relative overflow-hidden"
      style={{ 
        minHeight: "130vh", // Zmniejszamy minimalną wysokość sekcji
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "10vh",
        paddingBottom: "10vh"
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/about.jpg')",
          y: backgroundY,
          scale: 1.2
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div 
        className="relative z-10 w-full max-w-4xl mx-auto px-4"
        style={{ y: contentY, opacity }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">O Sensorium</h2>
          <div className="text-justify text-gray-900 font-[500]">
            <p className="text-lg mb-6">
              Projekt Sensorium ma na celu prezentacje nowatorskich postaw artystycznych na styku sztuki, nauki i technologii, które nie tylko łączą te dziedziny, lecz również poszukują nieoczywistych inspiracji, przekraczając klasyczne definicje sztuki i jej dyscyplin oraz podnosząc problemy współczesnego społeczeństwa w kontekście technokulturowych procesów.
            </p>
            <p className="text-lg mb-6">
              Prezentacje działań artystycznych w różnych przestrzeniach wystawienniczych w Krakowie stanowią zapis doświadczeń naukowo-artystycznych i odpowiedź na oczekiwania społeczne poprzez kształtowanie nowych form uczestnictwa i ekspresji oraz próbę zrozumienia technokulturowej rzeczywistości.
            </p>
            <p className="text-lg mb-6">
              Definiujemy formy wypowiedzi artystycznej w nowych mediach poprzez metodologię uważnej obserwacji środowiska, kreatywność, innowacje oraz aspiracje do tworzenia dzieł o uniwersalnym znaczeniu. Obszar sztuki stał się polem badań, a artysta–badacz wykorzystuje narzędzia naukowe i koncepcje opracowane przez badaczy i naukowców.
            </p>
            <p className="text-sm mt-8 mb-8 italic font-semibold">
              Projekt dofinansowano ze środków Ministra Kultury i Dziedzictwa Narodowego w ramach programu własnego Centrum Rozwoju Przemysłów Kreatywnych
            </p>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300"
              >
                Poznaj szczegóły
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;