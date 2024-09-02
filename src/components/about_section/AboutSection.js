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
  const [isMounted, setIsMounted] = useState(false);

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    setKeywords(data.keywords);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const startAnimations = async () => {
      if (isInView && !hasAppeared) {
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
      } else if (!isInView) {
        controlsInnowacyjnosc.set({ opacity: 0, x: -300 });
        controlsEdukacja.set({ opacity: 0, x: 300 });
        controlsKreatywnosc.set({ opacity: 0, x: -300 });
        controlsWspolpraca.set({ opacity: 0, x: 300 });
        controlsInnowacyjnoscLists.set({ opacity: 0 });
        controlsEdukacjaLists.set({ opacity: 0 });
        controlsKreatywnoscLists.set({ opacity: 0 });
        controlsWspolpracaLists.set({ opacity: 0 });
        setHasAppeared(false);
      }
    };

    startAnimations();
  }, [isMounted, isInView, hasAppeared, controlsInnowacyjnosc, controlsEdukacja, controlsKreatywnosc, controlsWspolpraca, controlsInnowacyjnoscLists, controlsEdukacjaLists, controlsKreatywnoscLists, controlsWspolpracaLists]);

  useEffect(() => {
    if (!isMounted) return;

    const animateColors = async () => {
      if (hasAppeared && isInView2 && !isAnimating) {
        setIsAnimating(true);
        await controlsInnowacyjnosc.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsInnowacyjnosc.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        await controlsEdukacja.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsEdukacja.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        await controlsKreatywnosc.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsKreatywnosc.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        await controlsWspolpraca.start({ y: -5, color: '#FF4500', transition: { duration: 0.1, delay: 0 } });
        await controlsWspolpraca.start({ y: 5, color: '#D3D3D3', transition: { duration: 0.1, delay: 1.3 } });
        setIsAnimating(false);
      }
    };

    animateColors();
  }, [isMounted, isInView2, isAnimating, hasAppeared, controlsInnowacyjnosc, controlsEdukacja, controlsKreatywnosc, controlsWspolpraca]);

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
        color: "#ffffff",
        backgroundColor: "#000000",
        fontFamily: "'KyivTypeSans', sans-serif",
        position: "relative",
      }}
    >
      <Background />
      <Heading isInView={isInView} />
      <motion.div
        className="relative z-10 w-full mx-auto"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {keywords.map((item, index) => (
          <KeywordBlock
            key={item.keyword}
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
      <AnimatedButton isInView={isInView} text={"Więcej o projekcie"} route={"/about"}/>
    </section>
  );
};

export default AboutSection;