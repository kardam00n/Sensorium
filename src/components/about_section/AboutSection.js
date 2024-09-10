import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Background from './Background';
import Heading from './Heading';
import KeywordBlock from './KeywordBlock';
import AnimatedButton from './AnimatedButton';

import data from '../../about-data.json';

const AboutSection = () => {
  const [keywords, setKeywords] = useState([]);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { margin: '-100px' });

  useEffect(() => {
    setKeywords(data.keywords);
  }, []);

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
            isInView={isInView}
            numberOfKeywords={keywords.length}
          />
        ))}
      </motion.div>
      {/* <AnimatedButton isInView={isInView} text={"Więcej o projekcie"} route={"/about"} /> */}
    </section>
  );
};

export default AboutSection;
