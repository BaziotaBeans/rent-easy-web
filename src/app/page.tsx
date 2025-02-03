"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { OverlayGlobal } from "@/components/overlay-global";
import { SearchPageHeaderContainer } from "@/components/search-page-header/search-page-header-container";
import { cn } from "@/lib/utils";
import { CardProperty } from "@/components/card-property";
import { usePropertiesWithStatusTrue } from "@/services/hooks/use-property";
import { FilterProvider, useFilter } from "@/contexts/filter-provider";
import { LoaderContent } from "@/components/map/loader";
import { SkeletonCardProperty } from "@/components/skeleton/skeleton-card-property";

const MapView = dynamic(() => import("@/components/map/property-map"), {
  // loading: () => <p>O map está carregando...</p>,
  loading: () => <LoaderContent />,
  ssr: false,
});

function HomeContent() {
  const [activeMobileView, setActiveMobileView] = useState("map");
  const { data, isLoading } = usePropertiesWithStatusTrue();
  const { filterProperties } = useFilter();

  const filteredProperties = data ? filterProperties(data) : [];

  console.log(data);

  return (
    <main className="flex flex-col font-[family-name:var(--font-nunito-sans)] h-screen">
      <Header />
      <SearchPageHeaderContainer />
      <OverlayGlobal />
      <div className="flex grow shrink min-h-0">
        <div
          className={cn("grow shrink-0 relative h-full lg:h-auto", {
            "z-30": activeMobileView === "map",
          })}
        >
          <MapView data={filteredProperties} />
        </div>
        <div className="absolute lg:static top-0 w-full lg:w-[600px] h-full lg:h-auto shadow-xl z-10 lg:z-30 overflow-scroll bg-zinc-50">
          <div className="flex flex-col p-4">
            <h1 className="text-2xl text-black font-semibold w-full mb-1.5">
              Listagens de aluguel
            </h1>
            <span className="font-medium text-gray-500">
              {filteredProperties.length} resultado
              {filteredProperties.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto grow p-4">
            {isLoading ? (
              <SkeletonCardProperty />
            ) : (
              filteredProperties.map((property) => (
                <CardProperty
                  key={`property-${property.property.pkProperty}`}
                  id={`property-${property.property.pkProperty}`}
                  data={property}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <FilterProvider>
      <HomeContent />
    </FilterProvider>
  );
}
