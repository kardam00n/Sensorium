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
import axios from "axios";


const AllPostsPage = () => {
  const [activePost, setActivePost] = useState(null);
  const [activeSection, setActiveSection] = useState("posts");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://sensorium.ii.agh.edu.pl/index.php/wp-json/wp/v2/posts?acf_format=standard');
        const allPosts = response.data;
        
        // Filter featured posts, sort by featured_position, and transform to match original structure
        const featuredPosts = allPosts
  .map(post => {
    // Create a temporary element to parse the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content.rendered;

    // Find all gallery elements
    const galleries = tempDiv.querySelectorAll('.gallery, .wp-block-gallery');

    // Extract image sources from galleries
    const gallerySources = Array.from(galleries).flatMap(gallery => 
      Array.from(gallery.querySelectorAll('img')).map(img => img.src)
    );

    // Combine gallery sources with existing album or use fallback
    const combinedAlbum = [
      ...(post.acf.album || []),
      ...gallerySources
    ];

    // If combinedAlbum is empty, use fallback
    const album = combinedAlbum.length > 0 
      ? combinedAlbum 
      : [post.acf.thumbnail || post.featured_media_url].filter(Boolean);

    return {
      id: post.id,
      title: post.acf.title,
      excerpt: post.acf.excerpt,
      content: post.acf.content,
      thumbnail: post.acf.thumbnail,
      album: album
    };
  });
        
        setPosts(featuredPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
