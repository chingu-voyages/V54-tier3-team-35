import React from 'react';

const GifAnimation: React.FC = () => {
  return (
    <div className="gif-container">
      <img src="/gif_animation.gif" alt="Desktop GIF" className="hidden md:block" />
    </div>
  );
};

export default GifAnimation;
