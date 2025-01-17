"use client";

import { useRouter } from "next/navigation";
import { Bed, Bath, Ratio } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropertyResponse } from "@/types/property";
import { formatPriceToKwanza } from "@/utils/format-price";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageGalleryCountCardProperty } from "../image-gallery-count-card-property";
import { TagCardProperty } from "../tag-card-property";

interface PropertyCardProps {
  data: PropertyResponse;
}

export function PropertyCard({ data }: PropertyCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const router = useRouter();

  const handleNavigationToProperty = () => {
    router.push(`/property/${data.property.pkProperty}`); // Substitua 'destination-page' pelo caminho da página de destino.
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Card
      className="hover:shadow-lg transition-shadow w-full relative p-0 border-none cursor-pointer"
      onClick={handleNavigationToProperty}
    >
      <CardHeader className="p-0 m-0 space-y-0 overflow-hidden rounded-t-lg relative">
        <TagCardProperty
          type={data.property.fkPropertyTypeEntity.designation}
        />

        <Carousel setApi={setApi} opts={{}}>
          <CarouselContent>
            {data.images.map((image, index) => (
              <CarouselItem key={`${index}-${image.url}`}>
                <Image
                  src={image.url}
                  alt=""
                  objectFit="cover"
                  className="object-cover w-full h-40 select-none"
                  width={244}
                  height={100}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
              <CarouselNext /> */}
        </Carousel>

        <ImageGalleryCountCardProperty quantity={count} />

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  current === index ? "bg-white" : "bg-white/70"
                }`}
              ></div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="font-bold text-base text-zinc-700">
            {data.property.title}
          </h3>
          <span className="text-sm text-muted-foreground">
            {data.property.address}
          </span>
        </div>

        {data.property.fkPropertyTypeEntity.designation === "Terreno" ? (
          <div className="flex items-center gap-2">
            <Ratio className="w-4 h-4" />
            <span className="text-xs">{data.property.totalArea} m²</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4" />
              <span className="text-xs">{data.property.room} beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4" />
              <span className="text-xs">{data.property.bathroom} baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Ratio className="w-4 h-4" />
              <span className="text-xs">{data.property.totalArea} m²</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-zinc-700">
            {formatPriceToKwanza(data.property.price)}
          </span>
          <span className="text-sm text-muted-foreground">
            {data.property.fkPropertyTypeEntity.designation}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
