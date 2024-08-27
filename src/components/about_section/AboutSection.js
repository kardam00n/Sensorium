import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Background from './Background';
import Heading from './Heading';
import KeywordBlock from './KeywordBlock';
import AnimatedButton from './AnimatedButton';

import data from '../../about-data.json';

const AboutSection = () => {
  const [keywords, setKeywords] = useState([]);
  const sectionRef = useRef(null);

  const controlsInnowacyjnosc = useAnimation();
  const controlsEdukacja = useAnimation();
  const controlsKreatywnosc = useAnimation();
  const controlsWspolpraca = useAnimation();
  const controlsInnowacyjnoscLists = useAnimation();
  const controlsEdukacjaLists = useAnimation();
  const controlsKreatywnoscLists = useAnimation();
  const controlsWspolpracaLists = useAnimation();

  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const isInView2 = useInView(sectionRef, { once: true });
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAppeared, setHasAppeared] = React.useState(false); 

  useEffect(() => {
    // Załaduj dane z pliku JSON
    setKeywords(data.keywords);
  }, []);

  useEffect(() => {
    const startAnimations = async () => {
      // Animacje pojawiania się napisów
      await Promise.all([
        controlsInnowacyjnosc.start({ opacity: 1, x: 0, transition: { duration: 2 } }),
        controlsEdukacja.start({ opacity: 1, x: 0, transition: { duration: 2, delay: 0.6 } }),
        controlsKreatywnosc.start({ opacity: 1, x: 0, transition: { duration: 2, delay: 1.2 } }),
        controlsWspolpraca.start({ opacity: 1, x: 0, transition: { duration: 2, delay: 1.8 } }),
        controlsInnowacyjnoscLists.start({ opacity: 1, transition: { duration: 2.5, delay: 0.5 } }),
        controlsEdukacjaLists.start({ opacity: 1, transition: { duration: 2.5, delay: 1.1 } }),
        controlsKreatywnoscLists.start({ opacity: 1, transition: { duration: 2.5, delay: 1.7 } }),
        controlsWspolpracaLists.start({ opacity: 1, transition: { duration: 2.5, delay: 2.3 } })
      ]);

      setHasAppeared(true); 
    };

    if (isInView && !hasAppeared) {
      startAnimations();
    } else if (!isInView) {
      controlsInnowacyjnosc.start({ opacity: 0, x: -300, transition: { duration: 0 } });
      controlsEdukacja.start({ opacity: 0, x: 300, transition: { duration: 0 } });
      controlsKreatywnosc.start({ opacity: 0, x: -300, transition: { duration: 0 } });
      controlsWspolpraca.start({ opacity: 0, x: 300, transition: { duration: 0 } });
      controlsInnowacyjnoscLists.start({ opacity: 0 });
      controlsEdukacjaLists.start({ opacity: 0 });
      controlsKreatywnoscLists.start({ opacity: 0 });
      controlsWspolpracaLists.start({ opacity: 0 });

      setHasAppeared(false); 
    }

    if (hasAppeared && isInView2 && !isAnimating) {
      setIsAnimating(true);
      const animateColors = async () => {
        await controlsInnowacyjnosc.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsInnowacyjnosc.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        await controlsEdukacja.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsEdukacja.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        await controlsKreatywnosc.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsKreatywnosc.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        await controlsWspolpraca.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsWspolpraca.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        setIsAnimating(false);
      };

      animateColors();
    }
  }, [isInView, isInView2, isAnimating, hasAppeared]);


  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5vh 5%",
        color: "#ffffff",
        backgroundColor: "#000000",
        fontFamily: "'Helvetica Neue', sans-serif",
        position: "relative",
      }}
    >

      <Background />

      <Heading isInView={isInView} />

      <motion.div
        className="relative z-10 w-full mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(4, auto)",
          gridGap: "2vw",
          position: "relative",
        }}
      >
        {keywords.map((item, index) => (
          <KeywordBlock
            keyword={item.keyword}
            listItems={item.listItems}
            gridRow={index + 1}
            animateControl={
              [controlsInnowacyjnosc, controlsEdukacja, controlsKreatywnosc, controlsWspolpraca][index]
            }
            listAnimateControl={
              [controlsInnowacyjnoscLists, controlsEdukacjaLists, controlsKreatywnoscLists, controlsWspolpracaLists][index]
            }
          />
        ))}
        
      </motion.div>

      <AnimatedButton isInView={isInView} />

    </section>
  );
};

export default AboutSection;
