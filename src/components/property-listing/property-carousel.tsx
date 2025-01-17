"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertyCarouselProps {
  images: string[];
  title: string;
}

export default function PropertyCarousel({
  images,
  title,
}: PropertyCarouselProps) {
  return (
    <Carousel className="relative w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-3 py-1.5 rounded-full text-sm font-medium">
        {images.length} fotos
      </div>
    </Carousel>
  );
}
