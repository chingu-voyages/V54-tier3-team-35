import React from 'react';

const GifAnimation: React.FC = () => {
  return (
    <div className="gif-container">
      <img
        src="/gif_animation.gif"
        alt="App Demo"
        className="responsive-gif"
        style={{ maxWidth: '100%', height: 'auto' }}  // Resize while maintaining aspect ratio
      />
    </div>
  );
};

export default GifAnimation;
