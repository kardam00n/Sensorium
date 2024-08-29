import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedButton from "./components/about_section/AnimatedButton";
import PostModal from "./components/PostModal";
import { ArrowLeft, ArrowUp } from "lucide-react";
import "./darkMode.css";

const AllPostsPage = () => {
  const [activePost, setActivePost] = useState(null);

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

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <section
        id="posts"
        className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 dark-mode"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Najnowsze posty
          </h2>
          <p className="text-center ">Brak dostępnych postów.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="posts"
      className="py-20 w-full h-full dark-mode min-h-screen flex flex-col items-center overflow-x-hidden relative"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 md:top-12  md:left-12 bg-white text-black font-medium py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-gray-100"
        style={{ zIndex: 10 }}
      >
        <ArrowLeft className="w-4 h-4" />
        {!isMobile && <span>Powrót</span>}
      </motion.button>
      <div className="container px-4 flex-grow">
        <h2 className="text-7xl md:text-8xl font-bold mb-12 text-center ">
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
        {filteredPosts.length === 0 && (
          <p className="text-center ">Brak dostępnych postów.</p>
        )}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.map((post, index) => (
            <PostItem
              key={post.id}
              post={post}
              index={index}
              openPost={openPost}
              isRight={index % 2 !== 0}
            />
          ))}
        </motion.div>
      </div>
      <PostModal activePost={activePost} closePost={closePost} />
      <div
        className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2"
        style={{ zIndex: 10 }}
      >
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
    </section>
  );
};

const PostItem = ({ post, index, openPost, isRight }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const thumbnailRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const thumbnail = thumbnailRef.current;
    if (!thumbnail) return;

    const rect = thumbnail.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    thumbnail.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.05, 1.05, 1.05)
    `;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const thumbnail = thumbnailRef.current;
    if (!thumbnail) return;

    thumbnail.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, x: isRight ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      x: isRight ? 50 : -50,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      className="cursor-pointer"
      onClick={() => openPost(post)}
    >
      <div
        className="overflow-hidden rounded-lg mb-3 aspect-w-1 aspect-h-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={thumbnailRef}
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={post.thumbnail}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="text-left">
        <h3 className="text-lg font-bold mb-1">{post.title}</h3>
        <p className="text-sm">{post.excerpt}</p>
      </div>
    </motion.div>
  );
};

export default AllPostsPage;
