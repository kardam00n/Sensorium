import React, { useState, useMemo, useRef, useEffect } from "react";
import TeamSection from "./components/TeamSection";
import PlacesSection from "./components/PlacesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AboutSection from "./components/about_section/AboutSection";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

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
          <AboutSection/>
        </section>
        <section id="team">
          <TeamSection />
        </section>
        <section id="places">
          <PlacesSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutProjectPage;