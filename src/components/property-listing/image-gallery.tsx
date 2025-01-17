"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageGallery({
  images,
  initialIndex = 0,
  onClose,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 z-50"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </Button> */}

      <div 
        // className="relative aspect-[16/9] overflow-hidden rounded-lg"
        className="relative aspect-[16/9] overflow-hidden rounded-lg"
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        <Button
          variant="primary"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2"
          onClick={goToPrevious}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="primary"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={goToNext}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div 
        //className="grid grid-cols-6 gap-2 mt-4"
        className="flex items-center gap-2 mt-4"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`aspect-square  rounded-lg overflow-hidden cursor-pointer ${
              index === currentIndex ? "ring-4 ring-primary-base" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

//aspect-square 
