"use client";

import { useState } from "react";
import PropertyImages from "./property-images";
import PropertyFeatures from "./property-features";
import ImageDialog from "./image-dialog";
import { PriceBadge } from "./price-badge";
import { PropertyTitleVerify } from "./property-title-verify";
import { PropertyActions } from "./property-actions";
import { ReadMore } from "../read-more";
import { PropertyDetail } from "./property-detail";
import { PropertyVisitSchedules } from "./proparty-visit-schedules";
import { PropertyAgentBox } from "./property-agent-box";
import dynamic from "next/dynamic";
import { PropertyResponse } from "@/types/property";

const CurrentPropertyMap = dynamic(
  () => import("@/components/map/current-property-map"),
  {
    loading: () => <p>O map está carregando...</p>,
    ssr: false,
  }
);

interface PropertyListingProps {
  data: PropertyResponse;
}

export default function PropertyListing({ data }: PropertyListingProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  };

  return (
    <div className=" mx-auto p-4 bg-transparent transition-all">
      <PropertyImages
        images={data?.images?.map((image) => image.url)}
        title={data?.property.title}
        onImageClick={handleImageClick}
      />

      <div className="relative flex flex-col lg:flex-row items-stretch gap-6 mt-6 transition-all">
        <div className="space-y-8 mt-6 w-full">
          <div className="space-y-4">
            <PriceBadge price={data?.property.price} type={data?.property.fkPropertyTypeEntity.designation}/>

            <PropertyTitleVerify title={data?.property.title} />
          </div>

          <section id="features">
            <h2 className="text-zinc-600 text-xl font-semibold mb-4">
              Características
            </h2>
            <PropertyFeatures
              area={data?.property.totalArea}
              bathrooms={data?.property.bathroom}
              bedrooms={data?.property.room}
              parking={data?.property.vacancy}
              suits={data?.property.suits}
              type={data?.property?.propertyType}
            />
          </section>

          {data?.property.description && (
            <section id="overview">
              <h2 className="text-zinc-600 text-xl font-semibold mb-4">
                O que há de especial
              </h2>
              <ReadMore text={data?.property.description} maxLength={200} />
              {/* <p className="text-gray-600">{description}</p> */}
            </section>
          )}

          <section id="detail">
            <h2 className="text-zinc-600 text-xl font-semibold mb-4">
              Detalhes
            </h2>
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

          <section id="contact">
            <h2 className="text-zinc-600 text-xl font-semibold mb-4">
              Detalhes do Agente
            </h2>
            <PropertyAgentBox data={data} />
          </section>
        </div>

        <div className="w-full lg:w-[415px] transition-all">
          <PropertyActions data={data}/>
        </div>
      </div>

      <ImageDialog
        open={showGallery}
        onOpenChange={setShowGallery}
        images={data?.images?.map((image) => image.url)}
        selectedIndex={selectedImageIndex}
      />
    </div>
  );
}
