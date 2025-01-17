"use client";

import PropertyCarousel from "./property-carousel";

interface PropertyImagesProps {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}

export default function PropertyImages({
  images,
  title,
  onImageClick,
}: PropertyImagesProps) {
  if (images?.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  if (images?.length === 1) {
    return (
      <div
        className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => onImageClick(0)}
      >
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    );
  }

  // Use Carousel for 1-3 images
  if (images?.length <= 4) {
    return <PropertyCarousel images={images} title={title} />;
  }

  // if (images.length === 2) {
  //   return (
  //     <div className="grid grid-cols-2 gap-2">
  //       {images.map((image, index) => (
  //         <div
  //           key={index}
  //           className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group"
  //           onClick={() => onImageClick(index)}
  //         >
  //           <img
  //             src={image}
  //             alt={`${title} ${index + 1}`}
  //             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }
  
  // if (images.length === 3) {
  //   return (
  //     <div className="grid grid-cols-3 gap-2">
  //       {images.map((image, index) => (
  //         <div
  //           key={index}
  //           className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group"
  //           onClick={() => onImageClick(index)}
  //         >
  //           <img
  //             src={image}
  //             alt={`${title} ${index + 1}`}
  //             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  // For 3 or more images
  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);
  const remainingCount = Math.max(0, images.length - 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-2">
      <div
        className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => onImageClick(0)}
      >
        <img
          src={mainImage}
          alt={title}
          // className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          className="w-full h-full object-cover"
        />
        {/* Camada de Escurecimento */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        {/* Mobile only remaining count */}
        {images.length > 1 && (
          <div className="md:hidden absolute bottom-4 right-4 bg-black/75 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            +{images.length - 1} fotos
          </div>
        )}
      </div>
      <div className="hidden md:grid grid-cols-2 gap-2 justify-between">
        {thumbnails.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[2/2.25] rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => onImageClick(index + 1)}
          >
            <img
              src={image}
              alt={`${title} ${index + 2}`}
              // className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              className="w-full h-full object-cover"
            />
            {/* Camada de Escurecimento */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            {index === thumbnails.length - 1 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  +{remainingCount}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
