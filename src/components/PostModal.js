import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowDown } from 'lucide-react';

const PhotoItem = ({ imgSrc, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "400px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <img
        src={imgSrc}
        alt={`Album image ${index + 1}`}
        className="w-full object-cover mb-4 rounded-xl"
      />
    </motion.div>
  );
};

const PostModal = ({ activePost, closePost }) => {
  const contentRef = useRef(null);
  const albumRef = useRef(null);
  const [contentScrollAmount, setContentScrollAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't apply custom scrolling on mobile

    const handleScroll = () => {
      if (contentRef.current && albumRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const albumRect = albumRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const contentMaxScroll =
          contentRef.current.scrollHeight - contentRef.current.clientHeight;

        const contentOffScreen = contentRect.bottom - windowHeight;

        setContentScrollAmount(Math.max(0, Math.min(contentMaxScroll, contentOffScreen)));
        contentRef.current.style.transform = `translateY(-${contentScrollAmount}px)`;

        albumRef.current.style.transform = `translateY(-${window.scrollY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, contentScrollAmount]);

  const processContent = (content) => {
    // Split content by <p> tags
    const paragraphs = content.split(/<\/?p>/).filter(p => p.trim() !== '');
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph.trim()}</p>
    ));
  };

  return (
    <AnimatePresence>
      {activePost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 dark-mode"
        >
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="rounded-lg shadow-xl w-full h-full overflow-hidden relative"
          >
            <div
              className={`h-full overflow-y-auto p-6 flex ${
                isMobile ? 'flex-col' : 'flex-col md:flex-row md:space-x-6'
              }`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* Floating Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closePost}
                className="absolute top-6 right-6 bg-white text-black font-medium py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-gray-100"
                style={{ zIndex: 10 }}
              >
                <ArrowLeft className="w-4 h-4" />
                {!isMobile && <span>Powrót</span>}
              </motion.button>

              {/* Content Section */}
              <div
                className={`w-full ${
                  isMobile ? 'mb-6' : 'md:w-[25%] md:order-2 mb-6 md:mb-0 pl-0 pt-20 md:pl-10'
                }`}
                ref={contentRef}
                style={isMobile ? {} : { position: "sticky", top: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-left pr-12 md:pr-0">
                    {activePost.title}
                  </h2>
                </div>
                <div
                  className={` text-left ${
                    isMobile ? '' : 'overflow-y-auto custom-scrollbar'
                  }`}
                  style={isMobile ? {} : { maxHeight: "calc(100vh - 250px)" }}
                >
                  {processContent(activePost.content)}
                </div>
                {!isMobile && contentScrollAmount > 0 && (
                  <div className="flex justify-center mt-2">
                    <ArrowDown className="w-6 h-6 text-gray-600 animate-bounce" />
                  </div>
                )}
              </div>

              {/* Photos Section */}
              <div
                className={`w-full ${isMobile ? '' : 'md:w-[55%] md:order-1 custom-scrollbar'}`}
                ref={albumRef}
              >
                {activePost.album &&
                  activePost.album.map((imgSrc, index) => (
                    <PhotoItem key={index} imgSrc={imgSrc} index={index} />
                  ))}
              </div>

              {/* Margins */}
              {!isMobile && (
                <>
                  <div className="hidden md:block md:w-[10%] md:order-0"></div>
                  <div className="hidden md:block md:w-[10%] md:order-3"></div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostModal;