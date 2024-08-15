import React from 'react';
import PostsSection from './PostsSection';
import PlaceSection from './PlaceSection';

const SectionWrapper = ({ posts, places }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 to-green-50 z-0"></div>
      
      <div className="relative z-10">
        <PostsSection posts={posts} />
        
        <div className="h-32 bg-gradient-to-b from-purple-50 to-green-50 transform -skew-y-3"></div>
        
        <PlaceSection places={places} />
      </div>
      
      <div className="absolute top-1/2 left-0 w-full h-64 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 opacity-20 transform rotate-3 z-0"></div>
    </div>
  );
};

export default SectionWrapper;