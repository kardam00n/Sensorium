import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./darkMode.css";

const ContactPage = () => {
  const [activeSection, setActiveSection] = useState("contact");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

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
  }, []);

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  return (
    <div div className="min-h-screen bg-gray-100 text-gray-900 dark-mode">
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        scrollProgress={scrollProgress}
        isAtTop={isAtTop}
        setIsMenuOpen={setIsMenuOpen}
      />

      <MobileMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <ContactSection/>
      
      <Footer />
    </div>
  );
};
export default ContactPage;
