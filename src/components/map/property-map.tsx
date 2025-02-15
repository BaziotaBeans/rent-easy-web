"use client";

import { useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import { Minimize, Maximize } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polygon,
  useMap,
} from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Navigation } from "lucide-react";
import { PropertyCard } from "./property-card";
import { Property, PropertyResponse } from "@/types/property";
import { SAMPLE_PROPERTIES } from "@/data/sample-properties";
import { MapStyleSelector } from "./map-style-selector";
import { MAP_STYLES } from "@/lib/map";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Separator } from "../ui/separator";
import { useSearchMap } from "@/contexts/search-map-provider";
import { cn } from "@/lib/utils";
import { MapFullScreenType } from "@/types/mapFullScreenType";
import { useFilter } from "@/contexts/filter-provider";

const customIcon = new L.DivIcon({
  className: "custom-marker-icon",
  html: '<div class="custom-marker-icon-intern"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>',
  iconSize: [30, 30],
});

function MapController({
  searchLocation,
  setSearchLocation,
}: {
  searchLocation: [number, number] | null;
  setSearchLocation: (location: [number, number] | null) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (searchLocation) {
      map.flyTo(searchLocation, 13, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [searchLocation, map]);

  return null;
}

function FullScreenButton({
  isFullscreen,
  onToggleFullscreen,
}: MapFullScreenType) {
  return (
    <button
      onClick={onToggleFullscreen}
      className={cn(
        "absolute bottom-16 left-4  bg-white z-[1000] rounded-md ring-2 ring-zinc-800/10 text-zinc-800 w-8 h-8 flex items-center justify-center transition-all hover:bg-zinc-20"
      )}
    >
      {isFullscreen ? (
        <Minimize className="h-4 w-4" />
      ) : (
        <Maximize className="h-4 w-4" />
      )}
    </button>
  );
}

function ZoomButtons() {
  const map = useMap();

  return (
    <div
      className="absolute top-5 left-4 flex flex-col  bg-white z-[1000] rounded-md ring-2 ring-zinc-800/10 overflow-hidden"
      role="group"
      aria-label="Zoom controls"
    >
      <button
        type="button"
        onClick={() => map.zoomIn()}
        className="text-zinc-800 w-8 h-8 flex items-center justify-center transition-all hover:bg-zinc-200"
        aria-label="Zoom in"
      >
        <Plus strokeWidth={2.75} size={20} />
      </button>
      <Separator />
      <button
        type="button"
        onClick={() => map.zoomOut()}
        className="text-zinc-800 w-8 h-8 flex items-center justify-center transition-all hover:bg-zinc-200"
        aria-label="Zoom out"
      >
        <Minus strokeWidth={2.75} size={20} />
      </button>
    </div>
  );
}

function CurrentLocationButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label="Minha Localização"
      className="group transition-all duration-300 absolute bottom-4 w-8 hover:w-44 left-4 z-[1000] px-2 bg-green-500 text-white hover:bg-green-600 shadow hover:flex overflow-hidden hover:items-center"
    >
      <Navigation size={18} />
      <span className="hidden group-hover:block transition-all">
        Minha Localização
      </span>
    </Button>
  );
}

interface PropertyMapProps {
  data: PropertyResponse[];
}

export type PopupClickHandler = (
  e: ReactMouseEvent<HTMLButtonElement> | LeafletMouseEvent
) => void;
function PropertyMap({ data }: PropertyMapProps) {
  const [mapStyle, setMapStyle] = useState("default");
  const [showMap, setShowMap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { searchLocation, setSearchLocation } = useSearchMap();
  const [properties] = useState<Property[]>(SAMPLE_PROPERTIES);
  const { toast } = useToast();
  const { searchQuery } = useFilter();

  console.log(searchLocation);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setSearchLocation(location);
        },
        () => {
          toast({
            title: "Acesso negado",
            description:
              "A Renteasy não tem permissão para mostrar sua localização.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Erro",
        description:
          "Seu navegador não suporta a funcionalidade de localização.",
        variant: "destructive",
      });
    }
  };

  const polygonCoordinates: [number, number][] = [
    [-8.8375, 13.289],
    [-8.8389, 13.298],
    [-8.842, 13.295],
    [-8.839, 13.283],
    [-8.8375, 13.289], // Close the polygon
  ];

  function VisibleMarkers({ data }: PropertyMapProps) {
    const map = useMap();
    const bounds = map.getBounds();

    return (
      <>
        {data
          .filter((item) =>
            bounds.contains([item.property.latitude, item.property.longitude])
          )
          .map((item) => (
            <Marker
              key={item.property.pkProperty}
              position={[item.property.latitude, item.property.longitude]}
              icon={customIcon}
            >
              <Popup className="property-popup">
                <PropertyCard data={item} />
              </Popup>
            </Marker>
          ))}
      </>
    );
  }

  return (
    <div className="flex h-full">
      {/* Map */}
      <div className="relative flex-1">
        {showMap && (
          <>
            <MapContainer
              center={[-8.8389, 13.2894]} // Luanda coordinates
              zoom={13}
              zoomControl={false}
              style={{
                height: "100%",
                width: "100%",
                // Garante que respeita o layout do contêiner
                zIndex: 1,
              }}
              //   className="relative h-full w-full text-white outline-0"

              className="absolute h-full w-full text-white outline-0"
            >
              <TileLayer
                url={MAP_STYLES[mapStyle as keyof typeof MAP_STYLES]}
              />
              <MapController
                searchLocation={searchLocation}
                setSearchLocation={setSearchLocation}
              />
              {/* <FullScreenButton
                onToggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
              /> */}
              <ZoomButtons />
              <CurrentLocationButton onClick={handleCurrentLocation} />
              {searchQuery && searchLocation && (
                <Circle
                  center={searchLocation}
                  radius={2000}
                  pathOptions={{
                    color: "#3b82f6",
                    dashArray: "10",
                    fillColor: "#3b82f6",
                    fillOpacity: 0.1,
                  }}
                  className="search-circle"
                />
              )}
              {/* Polygon */}
              {/* <Polygon
                positions={polygonCoordinates}
                pathOptions={{
                  color: "#6A4CFF",
                  dashArray: "5, 10",
                  fillOpacity: 0.2,
                }}
              /> */}

              {data.map((item) => (
                <Marker
                  key={item.property.pkProperty}
                  position={[item.property.latitude, item.property.longitude]}
                  icon={customIcon}
                >
                  <Popup className="property-popup">
                    <PropertyCard data={item} />
                  </Popup>
                </Marker>
              ))}
              {/* <VisibleMarkers data={data} /> */}
            </MapContainer>

            <MapStyleSelector value={mapStyle} onValueChange={setMapStyle} />
          </>
        )}
      </div>
    </div>
  );
}

export default PropertyMap;
