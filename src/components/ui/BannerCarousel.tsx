import { useState, useEffect } from "react";
import { Image } from "astro:assets";

interface Banner {
  url: string;
  code: string;
  description: string;
  urlMobile: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  // Preload initial images
  useEffect(() => {
    // Preload first 3 images or all if less than 3
    const initialImages = new Set<number>();
    for (let i = 0; i < Math.min(3, banners.length); i++) {
      initialImages.add(i);
    }
    setLoadedImages(initialImages);

    // Preload the rest of the images
    const preloadImages = async () => {
      for (let i = 3; i < banners.length; i++) {
        const img = new window.Image();
        img.src = banners[i].url;
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, i]));
        };
      }
    };
    preloadImages();
  }, [banners]);

  useEffect(() => {
    if (!isPaused && banners.length > 0) {
      const timer = setInterval(() => {
        const nextIndex = (currentSlide + 1) % banners.length;
        setCurrentSlide(nextIndex);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isPaused, banners.length, currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % banners.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + banners.length) % banners.length;
    setCurrentSlide(prevIndex);
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[250px] md:h-[450px] overflow-hidden md:rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <a
            key={banner.code}
            href={`/motos/${banner.code}`}
            className="w-full h-full flex-shrink-0 relative bg-gray-100"
          >
            {loadedImages.has(index) ? (
              <picture>
                <source media="(max-width: 768px)" srcSet={banner.urlMobile} />
                <img
                  src={banner.url}  
                  alt={banner.description}
                  className="w-full h-full object-fill lg:object-fill"
                  style={{ opacity: 1, transition: 'opacity 0.3s ease-in-out' }}
                />
              </picture>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gg-blue-500"></div>
              </div>
            )}
          </a>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all overflow-hidden ${
              index === currentSlide ? "w-6 md:w-8" : ""
            }`}
          >
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/80"
              }`}
            />
            {index === currentSlide && !isPaused && (
              <div
                className="absolute inset-0 rounded-full bg-white/30"
                style={{
                  animation: "bulletProgress 5000ms linear infinite",
                  transformOrigin: "left",
                  willChange: "transform",
                }}
              >
                <div className="absolute inset-0 bg-gg-blue-500" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Pause button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-4 right-2 md:right-4 p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
      >
        {isPaused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3 h-3 md:w-4 md:h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3 h-3 md:w-4 md:h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

// Add keyframes for the bullet progress animation
const keyframes = `
@keyframes bulletProgress {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
`;

// Add the keyframes to the document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}
