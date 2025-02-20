"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapControllerProps {
  searchLocation: [number, number] | null;
}

export function MapController({ searchLocation }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (searchLocation) {
      map.flyTo(searchLocation, 13, { duration: 1.5, easeLinearity: 0.25 });
    }
  }, [searchLocation, map]);

  return null;
}