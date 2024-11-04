import React, { useState, useEffect, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import HomeSection from './components/HomeSection';
import FeaturedPostsSection from './components/FeaturedPostsSection';
import Footer from './components/Footer';
import PostModal from './components/PostModal';
import AnimatedSection from './components/AnimatedSection';
import AboutSection from './components/about_section/AboutSection';
import "./darkMode.css";


const SensoriumWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const videoRef = useRef(null);

  const sections = useMemo(() => ['home','about', 'posts'], []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / (fullHeight - windowHeight)) * 100;
      setScrollProgress(scrollPercentage);
      
      setIsAtTop(scrollPosition < 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video: ", error);
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openPost = (post) => {
    setActivePost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setActivePost(null);
    document.body.style.overflow = 'auto';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('nav').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
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

      <main className='dark-mode overflow-hidden'>
        <AnimatedSection id="home" animation="fadeIn">
          <HomeSection videoRef={videoRef} scrollToSection={scrollToSection} />
        </AnimatedSection>
        <AnimatedSection id="posts" animation="slideUp">
          <FeaturedPostsSection openPost={openPost} />
        </AnimatedSection>
      </main>

      <Footer />

      <PostModal activePost={activePost} closePost={closePost} />
    </div>
  );
};

export default SensoriumWebsite;