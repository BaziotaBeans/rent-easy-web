import { useMap } from "react-leaflet";
import { Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ZoomButtons() {
  const map = useMap();

  return (
    <div
      className="absolute top-5 left-4 flex flex-col bg-white z-[1000] rounded-md ring-2 ring-zinc-800/10 overflow-hidden"
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
