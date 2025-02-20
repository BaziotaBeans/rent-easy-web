"use client";

import { List, Map } from "lucide-react";
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
import { Button } from "../ui/button";

const MapView = dynamic(() => import("@/components/map/property-map"), {
  loading: () => <LoaderContent />,
  ssr: false,
});

function HomeContent() {
  const { data, isLoading } = usePropertiesWithStatusTrue();
  const { filterProperties } = useFilter();
  const [isMapView, setIsMapView] = useState(true);
  const filteredProperties = data ? filterProperties(data) : [];

  return (
    <main className="flex flex-col font-[family-name:var(--font-nunito-sans)] h-screen">
      <Header />
      <SearchPageHeaderContainer />
      <OverlayGlobal />
      {/* Botão de troca de visualização (aparece apenas no modo responsivo) */}
      <div className="fixed bottom-4 right-1/2  translate-x-1/2 z-50 lg:hidden">
        <Button
          onClick={() => setIsMapView(!isMapView)}
          variant="primary"
          size="lg"
          title={isMapView ? "Ver Listagem" : "Ver Mapa"}
          className="
           px-4 py-4 rounded-lg shadow-md"
        >
          {isMapView ? <List className="w-8 h-8"/> : <Map className="w-8 h-8"/>}
        </Button>
      </div>

      <div className="flex grow shrink min-h-0">
        <div
          className={cn("h-full grow shrink-0", {
            "hidden lg:block": !isMapView, // Oculta no mobile quando listagem estiver ativa
          })}
        >
          <MapView data={filteredProperties} />
        </div>
        <div
          className={cn(
            "w-full lg:w-[600px] h-full lg:h-auto shadow-xl overflow-scroll bg-zinc-50 z-10",
            {
              "hidden lg:block": isMapView, // Oculta no mobile quando mapa estiver ativo
            }
          )}
        >
          <div className="flex flex-col p-4">
            <h1 className="text-2xl text-black font-semibold w-full mb-1.5">
              Listagens dos imóveis
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

export default function HomePage() {
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
