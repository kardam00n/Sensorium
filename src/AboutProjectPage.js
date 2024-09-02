import React, { useState, useMemo, useRef, useEffect } from "react";
import TeamSection from "./components/TeamSection";
import PlacesSection from "./components/PlacesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutProjectPage = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const controls = useAnimation();

  const sections = useMemo(() => ["about", "team", "places", "contact"], []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercentage =
        (scrollPosition / (fullHeight - windowHeight)) * 100;
      setScrollProgress(scrollPercentage);

      setIsAtTop(scrollPosition < 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector("nav").offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const textRef = useRef(null);

  const paragraphs = [
    "Projekt Sensorium ma na celu prezentacje nowatorskich postaw artystycznych na styku sztuki, nauki i technologii, które nie tylko łączą te dziedziny, lecz również poszukują nieoczywistych inspiracji, przekraczając klasyczne definicje sztuki i jej dyscyplin oraz podnosząc problemy współczesnego społeczeństwa w kontekście technokulturowych procesów.",
    "Głównym celem projektu jest poszerzenie wpływu sztuki medialnej i technologicznej w Polsce, otwarcia na nowe praktyki naukowe i artystyczne, wprowadzenia krytycznego dyskursu o technokulturze, zainteresowania twórców nowymi badaniami naukowymi oraz pogłębionej analizy relacji między kulturą, nauką i technologią w nurtach tzw. art&science.",
    "Prezentacje działań artystycznych w różnych przestrzeniach wystawienniczych w Krakowie stanowią zapis doświadczeń naukowo-artystycznych i odpowiedź na oczekiwania społeczne poprzez kształtowanie nowych form uczestnictwa i ekspresji oraz próbę zrozumienia technokulturowej rzeczywistości.",
    "Obserwujemy, że współcześnie technologia staje się integralną częścią procesów społecznych, politycznych i ekonomicznych, co prowadzi do swoistej redefinicji pojęcia sztuki, gdzie narzędzia i kompetencje jej twórców nie są wyłącznie warsztatem, ale stają się częścią metamedialnych interakcji społecznych.",
    "Sztuka aktualna rozwija się w kontekście procesów globalizacji cyfrowej. Definiujemy formy wypowiedzi artystycznej w nowych mediach poprzez metodologię uważnej obserwacji środowiska, kreatywność, innowacje oraz aspiracje do tworzenia dzieł o uniwersalnym znaczeniu.",
    "Obszar sztuki stał się polem badań, a artysta–badacz wykorzystuje narzędzia naukowe i koncepcje opracowane przez badaczy i naukowców. Według Stephena Wilsona badania naukowe radykalnie przekształcają naszą kulturę, a sztuka musi być istotną częścią tych procesów.",
    "Poszukujemy punktów wspólnych dla nauki i sztuki poprzez badania odwołujące się do zdobyczy naukowych, które są wykorzystywane przez artystów. Projekt dofinansowano ze środków Ministra Kultury i Dziedzictwa Narodowego w ramach programu własnego Centrum Rozwoju Przemysłów Kreatywnych: Rozwój Sektorów Kreatywnych.",
  ];

  const headingVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        duration: 1.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span key={index} variants={letterVariants} custom={index}>
        {char}
      </motion.span>
    ));
  };

  
  const AnimatedParagraph = ({ text, index, isRight }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      rootMargin: "-100px 0px"
    });
  
    const paragraphVariants = {
      hidden: { opacity: 0, x: isRight ? 50 : -50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 50,
          damping: 20,
          duration: 0.6
        }
      }
    };
  
    return (
      <motion.div 
        ref={ref}
        variants={paragraphVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`w-full md:w-3/4 ${isRight ? "ml-auto" : ""}`}
      >
        <p className="text-2xl leading-relaxed text-justify my-16">{text}</p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar
        activeSection={activeSection}
        sections={sections}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        scrollProgress={scrollProgress}
        isAtTop={isAtTop}
        setIsMenuOpen={setIsMenuOpen}
      />

      <MobileMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <main className="dark-mode overflow-x-hidden">
        <section id="about" className="py-20 dark-mode">
          <div className="container mx-auto px-4">
            <div className="text-center mb-40">
              <motion.h2
                ref={textRef}
                className="text-7xl md:text-8xl mb-6 inline-block font-bold"
                variants={headingVariants}
                animate={controls}
              >
                {splitText("Szczegóły projektu")}
              </motion.h2>
            </div>
            {paragraphs.map((paragraph, index) => (
              <AnimatedParagraph key={index} text={paragraph} index={index} isRight={index%2===0} />
            ))}
          </div>
        </section>
        <section id="team">
          <TeamSection />
        </section>
        <section id="places">
          <PlacesSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutProjectPage;