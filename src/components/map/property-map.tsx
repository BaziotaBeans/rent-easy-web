"use client";

import { useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Navigation } from "lucide-react";
import { PropertyCard } from "./property-card";
import { PropertyResponse } from "@/types/property";
import { MapStyleSelector } from "./map-style-selector";
import { MAP_STYLES } from "@/lib/map";
import { Separator } from "../ui/separator";
import { useSearchMap } from "@/contexts/search-map-provider";
import { useFilter } from "@/contexts/filter-provider";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "react-leaflet-markercluster/styles";


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
  const { searchLocation, setSearchLocation } = useSearchMap();
  const { toast } = useToast();
  const { searchQuery } = useFilter();

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

  return (
    <div className="flex h-full">
      {/* Map */}
      <div className="relative flex-1">
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
          className="absolute h-full w-full text-white outline-0"
        >
          <TileLayer url={MAP_STYLES[mapStyle as keyof typeof MAP_STYLES]} />
          <MapController
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
          />

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

          <MarkerClusterGroup>
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
          </MarkerClusterGroup>
        </MapContainer>

        <MapStyleSelector value={mapStyle} onValueChange={setMapStyle} />
      </div>
    </div>
  );
}

export default PropertyMap;