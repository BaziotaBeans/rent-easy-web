import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

interface CurrentLocationButtonProps {
  onClick: () => void;
}

export function CurrentLocationButton({ onClick }: CurrentLocationButtonProps) {
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
