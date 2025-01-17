"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TagCardProperty } from "../tag-card-property";
import { ImageGalleryCountCardProperty } from "../image-gallery-count-card-property";
import { BedIcon } from "../svg/bed-icon";
import { BathTub } from "../svg/bathtub";
import { CardIcon } from "../svg/car-icon";
import { usePropertyDetailDialog } from "@/store/usePropertyDetailDialog";
import { PropertyDetailDialog } from "../property-detail-dialog";
import { PropertyResponse } from "@/types/property";
import { formatPriceToKwanza } from "@/utils/format-price";

interface CardPropertyProps {
  id: string;
  data: PropertyResponse;
}

export function CardProperty({ id, data }: CardPropertyProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { onOpen } = usePropertyDetailDialog();

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
    <>
      <Card
        onClick={() => onOpen(id)}
        className="bg-white shadow-none border-none p-4 flex flex-col gap-2 cursor-pointer transition-all hover:shadow-md"
      >
        <CardHeader className="p-0 relative h-32 w-full">
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
                    className="object-cover w-full h-32 rounded-sm select-none"
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
        <CardContent className="flex flex-col items-start justify-start gap-1 py-2 px-0">
          <h1 className="text-zinc-500 font-medium truncate w-[200px] transition-all group-hover:text-white">
            {data.property.title}
          </h1>
          <span className="flex items-end gap-2">
            <h1 className="text-primary-base font-bold group-hover:text-tertiary">
              {formatPriceToKwanza(data.property.price)}
            </h1>
            {data.property.fkPropertyTypeEntity.designation ==
              "Arrendamento" && (
              <span className="text-xs font-medium text-zinc-400">por mês</span>
            )}
          </span>
          <span className="text-sm text-zinc-400 group-hover:text-white">
            {data?.property.address}
          </span>

          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-xs group-hover:text-white">
              <BedIcon size={15} />
              {data.property.room} Quartos
            </span>
            <span className="flex items-center gap-1 text-xs group-hover:text-white">
              <BathTub size={15} />
              {data.property.bathroom} banheiros
            </span>
            <span className="flex items-center gap-1 text-xs group-hover:text-white">
              <CardIcon size={15} />
              {data.property.vacancy} Vagas
            </span>
          </div>
        </CardContent>
      </Card>

      <PropertyDetailDialog id={id} data={data}/>
    </>
  );
}
