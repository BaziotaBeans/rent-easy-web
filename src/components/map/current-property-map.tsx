"use client";

import { useEffect, useState } from "react";
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

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface CurrentPropertyMapProps {
  longitude: number;
  latitude: number;
}

function CurrentPropertyMap({ longitude, latitude }:CurrentPropertyMapProps) {
  return (
    <div className="relative flex-1 w-full h-80 rounded-lg overflow-hidden">
      <MapContainer
        center={[-8.8389, 13.2894]}
        zoom={13}
        zoomControl={true}
        style={{
          height: "100%",
          width: "100%",
          // Garante que respeita o layout do contêiner
          zIndex: 1,
        }}
        className="absolute h-full w-full text-white outline-0"
      >
        <TileLayer
          url={"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
        />
        <Marker position={[latitude, longitude]}></Marker>
      </MapContainer>
    </div>
  );
}


export default CurrentPropertyMap;