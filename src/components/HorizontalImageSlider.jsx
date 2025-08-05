import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HorizontalImageSlider({ slides = [], autoPlayInterval = 2000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, autoPlayInterval);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPlaying, slides.length, autoPlayInterval]);

  const prevSlide = () => {
    resetTimeout();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    resetTimeout();
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const goToSlide = (index) => {
    resetTimeout();
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  if (!slides.length) return null;

  const {
    image,
    title,
    description,
    buttonText,
    buttonLink,
    textColor = "text-white",
    contentHorizontalPosition = "left",
    contentVerticalPosition = "center",
    contentMaxWidth = "max-w-lg",
    contentPadding = "p-8",
  } = slides[currentIndex];

  let horizontalPosClasses = '';
  let textAlignClass = '';
  if (contentHorizontalPosition === 'left') {
    horizontalPosClasses = 'left-0';
    textAlignClass = 'text-left';
  } else if (contentHorizontalPosition === 'right') {
    horizontalPosClasses = 'right-0';
    textAlignClass = 'text-right';
  } else { // center
    horizontalPosClasses = 'left-1/2 -translate-x-1/2';
    textAlignClass = 'text-center';
  }

  let verticalPosClasses = '';
  if (contentVerticalPosition === 'top') {
    verticalPosClasses = 'top-0';
  } else if (contentVerticalPosition === 'bottom') {
    verticalPosClasses = 'bottom-0';
  } else { // center
    verticalPosClasses = 'top-1/2 -translate-y-1/2';
  }

  return (
    <div
      className="relative w-full max-w-screen-xxl h-[450px] md:h-[500px] mb-6  mx-auto overflow-hidden shadow-lg"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />

      {/* Text Container */}
      <div
        className={`absolute ${horizontalPosClasses} ${verticalPosClasses} ${contentPadding} ${contentMaxWidth} ${textColor} ${textAlignClass}`}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">{title}</h2>
        <p className="mb-5 text-base md:text-lg opacity-90">{description}</p>
        {buttonText && buttonLink && (
          <Link
            to={buttonLink}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-300 shadow-md"
          >
            {buttonText}
          </Link>
        )}
      </div>

      {/* --- Navigation Controls --- */}

      {/* Dots (Centered at bottom) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              currentIndex === idx
                ? "bg-white"
                : "bg-transparent"
            }`}
            aria-label={`Slide ${idx + 1}`}
          ></button>
        ))}
      </div>

      {/* Arrows & Play/Pause Button (Grouped at bottom right) */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 p-2 rounded-full">
        {/* Play/Pause Button */}
        {slides.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="text-white p-1 rounded-full hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        )}
        {/* Previous Arrow */}
        <button
          className="p-1 rounded-full text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <FaArrowLeft size={20} />
        </button>
        {/* Next Arrow */}
        <button
          className="p-1 rounded-full text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}