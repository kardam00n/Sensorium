import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import PostModal from "./components/PostModal";
import PostsSection from "./components/PostsSection";
import { ArrowUp } from "lucide-react";
import Footer from "./components/Footer";
import "./darkMode.css";

const AllPostsPage = () => {
  const [activePost, setActivePost] = useState(null);
  const [activeSection, setActiveSection] = useState("posts");
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

  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

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

  const posts = [
    {
      id: 1,
      title: "Odkrywanie Wirtualnej Rzeczywistości",
      excerpt: "Zanurz się w świat VR i jego wpływ na nasze zmysły.",
      content:
        "Pełna treść posta o VR... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ",
      thumbnail: "/vr.jpg",
      album: ["/vr.jpg", "/vr_2.jpg"],
    },
    {
      id: 2,
      title: "Sztuka Projektowania Dźwięku",
      excerpt:
        "Odkryj, jak dźwięk kształtuje nasze postrzeganie rzeczywistości.",
      content:
        "Pełna treść posta o projektowaniu dźwięku... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ",
      thumbnail: "/exhibition.jpg",
      album: ["/exhibition.jpg", "/exhibition_2.jpg"],
    },
    {
      id: 3,
      title: "Iluzje Wizualne w Sztuce Cyfrowej",
      excerpt:
        "Odkryj fascynujący świat iluzji wizualnych w mediach cyfrowych.",
      content:
        "Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit.Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit.Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit.Pełna treść posta o iluzjach wizualnych... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. S",
      thumbnail: "/debate.jpg",
      album: ["/debate.jpg", "/debate_2.jpg"],
    },

    {
      id: 4,
      title: "Przyszłość Zwrotu Hapticznego",
      excerpt:
        "Dowiedz się o nowych technologiach w zakresie wrażeń dotykowych.",
      content:
        "Pełna treść posta o zwrocie haptycznym... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ",
      thumbnail: "/workshop.jpg",
      album: ["/workshop.jpg", "/workshop_2.jpg"],
    },
    {
      id: 5,
      title: "art&science – debata w Pałacu Sztuki",
      excerpt:
        "Dowiedz się o nowych technologiach w zakresie wrażeń dotykowych.",
      content:
        "Pełna treść posta o zwrocie haptycznym... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum odio eget rutrum posuere. Aliquam rhoncus aliquam hendrerit. Fusce sed enim magna. Sed libero ligula, maximus faucibus est id, facilisis auctor arcu. Vestibulum vulputate, diam id vehicula euismod, risus diam iaculis mi, eget placerat mi massa non metus. Donec metus neque, facilisis eu felis eu, semper feugiat odio. Maecenas euismod arcu orci, vitae molestie lorem mollis eget. Aliquam erat volutpat. Aliquam erat volutpat. Nunc vitae ex massa. Donec a pellentesque enim. In dapibus ex eget semper elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Donec at erat ornare, accumsan lacus vel, venenatis velit. ",
      thumbnail: "/debate2.jpg",
      album: ["/debate2.jpg", "/debate2_2.jpg"],
    },
  ];

  const openPost = (post) => {
    setActivePost(post);
    document.body.style.overflow = "hidden";
  };

  const closePost = () => {
    setActivePost(null);
    document.body.style.overflow = "auto";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <h2 className="text-7xl md:text-8xl font-bold pt-20 md:pt-16 mb-12 text-center ">
        Posty
      </h2>
      <div className="mb-16">
        <input
          type="text"
          placeholder="Szukaj..."
          value={searchQuery}
          onChange={handleSearchChange}
          className=" w-4/5 md:w-1/3 p-2 border-b border-gray-300 bg-black text-white pl-6"
        />
      </div>
      <PostsSection
        posts={filteredPosts}
        openPost={openPost}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <div className="flex justify-center mt-8 mb-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="bg-white text-black font-medium py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Top</span>
        </motion.button>
      </div>
      <Footer />
      <PostModal activePost={activePost} closePost={closePost} />
    </div>
  );
};
export default AllPostsPage;
