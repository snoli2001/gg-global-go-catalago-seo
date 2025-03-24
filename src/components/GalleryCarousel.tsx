import React, { useState } from 'react';
import type { Carrusel } from '../types/moto.interface';

interface GalleryCarouselProps {
  images: Carrusel[];
  modelName: string;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images, modelName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <img
          src={images[currentIndex].imagen}
          alt={`${modelName} - Imagen ${currentIndex + 1}`}
          className="h-full w-full object-contain bg-gray-100 transition-opacity duration-300"
        />
        
        {/* Navigation Buttons */}
        <button
          onClick={previousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
          aria-label="Imagen anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
          aria-label="Siguiente imagen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6 md:grid-cols-8">
        {images.map((image, index) => (
          <button
            key={image.idCarrusel}
            onClick={() => setCurrentIndex(index)}
            className={`relative aspect-square overflow-hidden rounded-md ${
              currentIndex === index ? 'ring-2 ring-gg-blue-700' : ''
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          >
            <img
              src={image.imagen}
              alt={`${modelName} - Thumbnail ${index + 1}`}
              className="h-full w-full object-cover transition-opacity hover:opacity-80"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel; 