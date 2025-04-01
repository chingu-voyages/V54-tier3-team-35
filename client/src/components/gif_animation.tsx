// client/src/components/GifAnimation.tsx
import React from 'react';

const GifAnimation: React.FC = () => {
  return (
    <div className="gif-container">
      {/* Correct path to the gif in the public folder */}
      <img src="/gif_animation.gif" alt="App Demo" className="responsive-gif" />
    </div>
  );
};

export default GifAnimation;
