import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { PropertyCard } from "./property-card";
import { PropertyResponse } from "@/types/property";

const customIcon = new L.DivIcon({
  className: "custom-marker-icon",
  html: '<div class="custom-marker-icon-intern"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>',
  iconSize: [30, 30],
});

interface PropertyMarkersProps {
  data: PropertyResponse[];
}

export function PropertyMarkers({ data }: PropertyMarkersProps) {
  return (
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
  );
}
