import { Circle } from "react-leaflet";

interface MapCircleProps {
  searchLocation: [number, number] | null;
}

export function MapCircle({ searchLocation }: MapCircleProps) {
  if (!searchLocation) return null;

  return (
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
  );
}
