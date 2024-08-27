import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import HomeSection from './components/HomeSection';
import PostsSection from './components/PostsSection';
import PlacesSection from './components/PlacesSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PostModal from './components/PostModal';
import AnimatedSection from './components/AnimatedSection';
import AboutSection from './components/AboutSection';

const SensoriumWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const videoRef = useRef(null);

  const sections = ['home', 'posts', 'about', 'places', 'team', 'contact'];

  const posts = [
    { 
      id: 1, 
      title: 'Odkrywanie Wirtualnej Rzeczywistości', 
      excerpt: 'Zanurz się w świat VR i jego wpływ na nasze zmysły.', 
      content: 'Pełna treść posta o VR... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ',
      thumbnail: '/vr.jpg',
      album: ['/vr.jpg', '/vr_2.jpg']
    },
    { 
      id: 2, 
      title: 'Sztuka Projektowania Dźwięku', 
      excerpt: 'Odkryj, jak dźwięk kształtuje nasze postrzeganie rzeczywistości.', 
      content: 'Pełna treść posta o projektowaniu dźwięku... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ',
      thumbnail: '/exhibition.jpg',
      album: ['/exhibition.jpg', '/exhibition_2.jpg']
    },
    { 
      id: 3, 
      title: 'Iluzje Wizualne w Sztuce Cyfrowej', 
      excerpt: 'Odkryj fascynujący świat iluzji wizualnych w mediach cyfrowych.', 
      content: 'Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit.Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit.Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit.Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. S',
      thumbnail: '/debate.jpg',
      album: ['/debate.jpg', '/debate_2.jpg']
    },
    { 
      id: 4, 
      title: 'Przyszłość Zwrotu Hapticznego', 
      excerpt: 'Dowiedz się o nowych technologiach w zakresie wrażeń dotykowych.', 
      content: 'Pełna treść posta o zwrocie haptycznym... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ', 
      thumbnail: '/workshop.jpg',
      album: ['/workshop.jpg', '/workshop_2.jpg']
    },
    { 
      id: 5, 
      title: 'art&science – debata w Pałacu Sztuki', 
      excerpt: 'Dowiedz się o nowych technologiach w zakresie wrażeń dotykowych.', 
      content: 'Pełna treść posta o zwrocie haptycznym... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ',
      thumbnail: '/debate2.jpg',
      album: ['/debate2.jpg', '/debate2_2.jpg']
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / (fullHeight - windowHeight)) * 100;
      setScrollProgress(scrollPercentage);
      
      setIsAtTop(scrollPosition < 50);
      
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
        isAtTop={isAtTop}
      />
      
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        sections={sections} 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
      />

      <main>
        <AnimatedSection id="home" animation="fadeIn">
          <HomeSection videoRef={videoRef} scrollToSection={scrollToSection} />
        </AnimatedSection>
        <AnimatedSection id="posts" animation="slideUp">
          <PostsSection posts={posts} openPost={openPost} />
        </AnimatedSection>
        <section id="about">
          <AboutSection />
        </section>
        <AnimatedSection id="places" animation="scaleUp">
          <PlacesSection />
        </AnimatedSection>
        <section id="team">
          <TeamSection />
        </section>
        <AnimatedSection id="contact" animation="fadeIn">
          <ContactSection />
        </AnimatedSection>
      </main>

      <Footer />

      <PostModal activePost={activePost} closePost={closePost} />
    </div>
  );
};

export default SensoriumWebsite;