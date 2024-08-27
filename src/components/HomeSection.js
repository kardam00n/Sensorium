import { motion, useAnimation, useScroll, useTransform, useSpring } from 'framer-motion';
import { CardBody, CardContainer, CardItem } from "./3d-card";
import "@fontsource/inter";
import React, { useEffect, useRef, useState } from 'react';
import { FlipWords } from "./flip-words";

const Card = ({ title, description, imageUrl, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.00001 };

  const x = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.3],
      [index % 2 === 0 ? '-100%' : '100%', 0]
    ),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    springConfig
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        x,
        opacity,
      }}
      className="w-full mb-16"
    >
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-full h-auto rounded-xl p-8 font-inter border border-white/[0.2]">
          <div className="max-w-6xl mx-auto">
            <CardItem
              translateZ="50"
              className="text-4xl font-bold text-neutral-600 dark:text-white"
            >
              {title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-xl mt-4 dark:text-neutral-300"
            >
              {description}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-8">
              <img
                src={imageUrl}
                className="w-full h-[400px] object-cover rounded-xl group-hover/card:shadow-xl"
                alt={title}
              />
            </CardItem>
            <div className="flex justify-center items-center mt-12">
              <CardItem
                translateZ={20}
                as="button"
                className="px-8 py-4 rounded-xl bg-white text-black text-lg font-bold hover:bg-gray-200 transition-colors"
              >
                Dowiedz się więcej
              </CardItem>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

const AnimatedLine = ({ path, delay = 0, duration = 5, opacity }) => (
    <motion.path
      d={path}
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: [0, 1, 1, 0],
      }}
      transition={{ 
        duration: duration,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 1],
        repeat: Infinity,
        delay: delay,
      }}
      stroke="rgba(255,255,255,1)"
      strokeWidth="0.1"
      fill="none"
      style={{ opacity }}
    />
);

const generateRandomPath = (baseX, baseY) => {
  const rangeX = 5;
  const rangeY = 5;
  let path = `M ${baseX + Math.random() * rangeX} ${baseY + Math.random() * rangeY}`;
  const numSegments = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < numSegments; i++) {
    const commandType = Math.random() > 0.5 ? 'L' : 'Q';
    if (commandType === 'L') {
      path += ` L ${baseX + Math.random() * rangeX} ${baseY + Math.random() * rangeY}`;
    } else {
      path += ` Q ${baseX + Math.random() * rangeX} ${baseY + Math.random() * rangeY}, ${baseX + Math.random() * rangeX} ${baseY + Math.random() * rangeY}`;
    }
  }
  return path;
};

const BackgroundLines = ({ opacity, scrollProgress }) => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const generateLines = () => {
      const newLines = [];
      for (let i = 0; i < 150; i++) {
        const baseX = Math.random() * 100;
        const baseY = Math.random() * 100;
        newLines.push({
          path: generateRandomPath(baseX, baseY),
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 2
        });
      }
      setLines(newLines);
    };

    generateLines();
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((line, index) => (
          <AnimatedLine 
            key={index}
            path={line.path}
            delay={line.delay}
            duration={line.duration}
            opacity={opacity}
            scrollProgress={scrollProgress}
          />
        ))}
      </svg>
    </div>
  );
};

const HomeSection = () => {
  const titleControls = useAnimation();
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    titleControls.start({
      opacity: 1,
      transition: { duration: 2, ease: "easeOut" }
    });

    const unsubscribe = scrollYProgress.onChange((value) => {
      console.log('Scroll progress:', value);
    });
    return () => unsubscribe();
  }, [titleControls, scrollYProgress]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  const flipWords = [
    "Odkryj nowe wymiary sztuki",
    "Poznaj naukę",
    "Doświadcz sztuki",
    "Połącz zmysły"
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <motion.div className="min-h-screen flex flex-col items-center justify-center relative">
        <BackgroundLines opacity={backgroundOpacity} scrollProgress={scrollYProgress} />
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center leading-none tracking-tighter relative z-10 mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={titleControls}
        >
          {"SENSORIUM".split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center relative z-20 px-4">
          <FlipWords words={flipWords} duration={2000} />
        </div>
      </motion.div>
      <div className="w-full px-4 py-16">
      {/* <div className="w-full px-4 py-16">
        <div className="flex flex-col justify-center items-stretch gap-16">
          <Card 
            title="Sztuka w Sensorium"
            description="Odkryj nowatorskie postawy artystyczne na styku technologii i kultury."
            imageUrl="https://images.unsplash.com/photo-1558865869-c93f6f8482af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80"
            index={0}
          />
          <Card 
            title="Nauka w Sensorium"
            description="Zgłęb fascynujący świat badań naukowych w kontekście sztuki i nauki."
            imageUrl="https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            index={1}
          />
        </div>}
      </div> */}
      </div>
    </div>
  );
};

export default HomeSection;