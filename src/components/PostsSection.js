import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "../darkMode.css";

const PostsSection = ({ posts, openPost }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <section id="posts" className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 dark-mode">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Najnowsze posty</h2>
          <p className="text-center ">Brak dostępnych postów.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="posts" className="py-20 dark-mode">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-4xl font-bold mb-12 text-center">Najnowsze posty</h2> */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post, index) => (
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
    </section>
  );
};

const PostItem = ({ post, index, openPost, isRight }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
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
    
    thumbnail.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, x: isRight ? 50 : -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      x: isRight ? 50 : -50,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
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
          style={{ transformStyle: 'preserve-3d' }}
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


export default PostsSection;