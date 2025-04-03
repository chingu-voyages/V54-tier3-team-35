import React from "react";

const GifAnimation: React.FC = () => {
  return (
    <div className="gif-container">
      <img
        src="/desktop_gif.gif"
        alt="Desktop GIF"
        className="hidden md:block border-t-[50px] border-l-[40px] border-[#d1d6c9] rounded-lg"
      />
    </div>
  );
};

export default GifAnimation;
