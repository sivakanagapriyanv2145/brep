
import React, { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    image: 'https://picsum.photos/seed/hero1/1920/1080',
    tagline: 'Designs That Inspire Living',
  },
  {
    image: 'https://picsum.photos/seed/hero2/1920/1080',
    tagline: 'Crafting Spaces, Shaping Futures',
  },
  {
    image: 'https://picsum.photos/seed/hero3/1920/1080',
    tagline: 'Where Vision Meets Structure',
  },
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Architectural project ${index + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      ))}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-brand-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {slides[currentIndex].tagline}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl font-light">
          We create timeless and innovative architecture that responds to its context and purpose.
        </p>
      </div>
      <button
        onClick={prevSlide}
        className="absolute z-20 top-1/2 left-4 md:left-8 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-20 top-1/2 right-4 md:right-8 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
