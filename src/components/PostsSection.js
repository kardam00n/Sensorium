import React from 'react';
import { motion } from 'framer-motion';

const PostsSection = ({ posts, openPost }) => {
  return (
    <section id="posts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Najnowsze posty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-100 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => openPost(post)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostsSection;