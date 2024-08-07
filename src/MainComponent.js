import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import HomeSection from './components/HomeSection';
import PostsSection from './components/PostsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PostModal from './components/PostModal';

const SensoriumWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef(null);

  const sections = ['home', 'posts', 'about', 'contact'];

  const posts = [
    { 
      id: 1, 
      title: 'Odkrywanie Wirtualnej Rzeczywistości', 
      excerpt: 'Zanurz się w świat VR i jego wpływ na nasze zmysły.', 
      content: 'Pełna treść posta o VR...', 
      thumbnail: '/vr.jpg'
    },
    { 
      id: 2, 
      title: 'Sztuka Projektowania Dźwięku', 
      excerpt: 'Odkryj, jak dźwięk kształtuje nasze postrzeganie rzeczywistości.', 
      content: 'Pełna treść posta o projektowaniu dźwięku...', 
      thumbnail: '/exhibition.jpg'
    },
    { 
      id: 3, 
      title: 'Iluzje Wizualne w Sztuce Cyfrowej', 
      excerpt: 'Odkryj fascynujący świat iluzji wizualnych w mediach cyfrowych.', 
      content: 'Pełna treść posta o iluzjach wizualnych...', 
      thumbnail: '/debate.jpg'
    },
    { 
      id: 4, 
      title: 'Przyszłość Zwrotu Hapticznego', 
      excerpt: 'Dowiedz się o nowych technologiach w zakresie wrażeń dotykowych.', 
      content: 'Pełna treść posta o zwrocie haptycznym...', 
      thumbnail: '/workshop.jpg'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / (fullHeight - windowHeight)) * 100;
      setScrollProgress(scrollPercentage);
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - windowHeight / 2 && 
              scrollPosition < offsetTop + offsetHeight - windowHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video: ", error);
      });
    }
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
        sections={sections} 
        scrollToSection={scrollToSection} 
        toggleMenu={toggleMenu} 
        isMenuOpen={isMenuOpen}
        scrollProgress={scrollProgress}
      />
      
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        sections={sections} 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
      />

      <main className="pt-16">
        <HomeSection videoRef={videoRef} scrollToSection={scrollToSection} />
        <PostsSection posts={posts} openPost={openPost} />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      <PostModal activePost={activePost} closePost={closePost} />
    </div>
  );
};

export default SensoriumWebsite;