import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowDown } from 'lucide-react';


const PostModal = ({ activePost, closePost }) => {
  const contentRef = useRef(null);
  const albumRef = useRef(null);
  const [contentScrollAmount, setContentScrollAmount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current && albumRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const albumRect = albumRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate the maximum scroll for the content
        const contentMaxScroll =
          contentRef.current.scrollHeight - contentRef.current.clientHeight;

        // Calculate how much of the content is off-screen
        const contentOffScreen = contentRect.bottom - windowHeight;

        // Determine the scroll amount for the content
        setContentScrollAmount(Math.max(0,Math.min(contentMaxScroll, contentOffScreen)));
        console.log(contentScrollAmount);
        // Apply the scroll to the content
        contentRef.current.style.transform = `translateY(-${contentScrollAmount}px)`;

        // Scroll the album normally
        albumRef.current.style.transform = `translateY(-${window.scrollY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {activePost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-lg shadow-xl w-full h-full overflow-hidden relative"
          >
            <div
              className="h-full overflow-y-auto p-6 flex flex-col md:flex-row md:space-x-6"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: rgba(0, 0, 0, 0.5);
                  border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background-color: rgba(0, 0, 0, 0.1);
                }
                `}
              </style>
              {/* Floating Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closePost}
                className="absolute top-6 right-6 bg-white text-black font-medium py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-gray-100"
                style={{ zIndex: 10 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Powrót</span>
              </motion.button>

              {/* Content Section */}
              <div
                className="w-full md:w-[25%] h-full md:order-2 mb-6 md:mb-0 pl-0 pt-20 md:pl-10"
                ref={contentRef}
                style={{ position: "sticky", top: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-left">
                    {activePost.title}
                  </h2>
                </div>
                <div
                  className="text-gray-600 text-left overflow-y-auto custom-scrollbar"
                  style={{ maxHeight: "calc(100vh - 250px)" }}
                >
                  {activePost.content}
                </div>
                {console.log('contentScrollAmount:', contentScrollAmount)}
                {contentScrollAmount > 0 && (
                  <div className="flex justify-center mt-2">
                    <ArrowDown className="w-6 h-6 text-gray-600 animate-bounce" />
                  </div>
                )}
              </div>

              {/* Photos Section */}
              <div
                className="w-full md:w-[55%] md:order-1 custom-scrollbar"
                ref={albumRef}
              >
                {activePost.album &&
                  activePost.album.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Album image ${index + 1}`}
                      className="w-full object-cover mb-4 rounded-xl"
                    />
                  ))}
              </div>

              {/* Margins */}
              <div className="hidden md:block md:w-[10%] md:order-0"></div>
              <div className="hidden md:block md:w-[10%] md:order-3"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostModal;
