import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ['/img/apple.jpg', '/img/blueberry.jpg', '/img/carrot.jpg'];
  //  Function to navigate to the next image
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  // Enable automatic slideshow for images
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Move to the next image every 3 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div
      className='slider-container'
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '100%',
        maxHeight: '700px',
        overflow: 'hidden',
      }}
    >
      <img
        src={images[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        style={{
          width: '1400px',
          height: '700px',
          maxWidth: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default Slider;
