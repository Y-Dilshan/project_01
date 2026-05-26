import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main active image */}
      <div className="w-full flex justify-center mb-4">
        <img
          src={images[activeIndex]}
          className="w-[80%] max-h-100 object-contain rounded-xl shadow-lg transition-all duration-300"
          alt={`Product ${activeIndex}`}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto w-full justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            className={`shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
              index === activeIndex
                ? "ring-2 ring-purple-600"
                : "hover:ring-2 hover:ring-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={image}
              className={`object-cover transition-transform duration-200 ${
                index === activeIndex ? "w-28 h-28 scale-105" : "w-20 h-20"
              }`}
              alt={`Thumbnail ${index}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}