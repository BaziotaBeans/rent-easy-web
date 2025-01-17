"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import PropertyImages from "@/components/property-listing/property-images";
import { samplePropertyImages } from "@/data/sample-property-images";
import { PriceBadge } from "@/components/property-listing/price-badge";
import { PropertyTitleVerify } from "@/components/property-listing/property-title-verify";
import PropertyFeatures from "@/components/property-listing/property-features";
import { ReadMore } from "@/components/read-more";
import { PropertyDetail } from "@/components/property-listing/property-detail";
import { PropertyVisitSchedules } from "@/components/property-listing/proparty-visit-schedules";
import ImageDialog from "@/components/property-listing/image-dialog";
import { PropertyResponse } from "@/types/property";

const CurrentPropertyMap = dynamic(
  () => import("@/components/map/current-property-map"),
  {
    loading: () => <p>O map está carregando...</p>,
    ssr: false,
  }
);

const features = {
  bedrooms: 3,
  bathrooms: 2,
  parking: 1,
  suits: 1,
  area: 6590,
};

interface PropertyDetailSheetContentProps {
  data: PropertyResponse;
}

export function PropertyDetailSheetContent({
  data,
}: PropertyDetailSheetContentProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  };

  return (
    <>
      <PropertyImages
        images={data?.images?.map((image) => image.url)}
        title={data.property.title}
        onImageClick={handleImageClick}
      />

      <div className="space-y-8 mt-6 w-full">
        <div className="space-y-4">
          <PriceBadge price={data.property.price} type={data.property.propertyType}/>

          <PropertyTitleVerify title={data.property.title} />
        </div>

        <section id="features">
          <h2 className="text-zinc-600 text-xl font-semibold mb-4">
            Características
          </h2>
          <PropertyFeatures
            area={data.property.totalArea}
            bathrooms={data.property.bathroom}
            bedrooms={data.property.room}
            parking={data.property.vacancy}
            suits={data.property.suits}
            type={data.property.propertyType}
          />
        </section>

        <section id="overview">
          <h2 className="text-zinc-600 text-xl font-semibold mb-4">
            O que há de especial
          </h2>
          <ReadMore text={data.property.description} maxLength={200} />
          {/* <p className="text-gray-600">{description}</p> */}
        </section>

        <section id="detail">
          <h2 className="text-zinc-600 text-xl font-semibold mb-4">Detalhes</h2>
          <PropertyDetail data={data} />
        </section>

        <section id="location">
          <h2 className="text-zinc-600 text-xl font-semibold mb-4">
            Localização
          </h2>
          <CurrentPropertyMap
            latitude={data.property.latitude}
            longitude={data.property.longitude}
          />
        </section>

        <section id="appointments">
          <h2 className="text-zinc-600 text-xl font-semibold mb-4">
            Agendamento
          </h2>
          <PropertyVisitSchedules data={data}/>
        </section>
      </div>

      <ImageDialog
        open={showGallery}
        onOpenChange={setShowGallery}
        images={samplePropertyImages}
        selectedIndex={selectedImageIndex}
      />
    </>
  );
}
