import React from "react";

const GifAnimation: React.FC = () => {
  return (
    <div className="gif-container">
      <img
        src="/desktop_gif.gif"
        alt="Desktop GIF"
        className="hidden md:block border-t-[70px] border-l-[50px] border-[#e1d3c5] rounded-lg"
      />
    </div>
  );
};

export default GifAnimation;
