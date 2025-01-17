import { MapPin } from "lucide-react";

export function AnimatedMarker() {
  return (
    <button className="h-20 w-20 bg-primary-base rounded-full flex justify-center items-center animation-pulse">
      <MapPin />
    </button>
  );
}
