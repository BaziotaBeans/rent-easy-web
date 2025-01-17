"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,

} from "@/components/ui/select";

interface MapStyleSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function MapStyleSelector({
  value,
  onValueChange,
}: MapStyleSelectorProps) {
  return (
    <div 
      //className="map-style-control"
      className="absolute top-5 right-5 z-[1000] bg-white p-3 rounded-sm ring-2 ring-zinc-800/10 flex flex-col gap-2"
    >
      <span className="text-zinc-500 font-medium">Mapa</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-40 border-[1.5px] border-primary-base/40 bg-primary-base/10 hover:bg-primary-base/20 text-primary-base">
          <SelectValue placeholder="Map Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Padrão</SelectItem>
          <SelectItem value="satellite">Satellite</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="terrain">Terrain</SelectItem>
          <SelectItem value="watercolor">Watercolor</SelectItem>
          <SelectItem value="toner">Toner</SelectItem>
          <SelectItem value="transport">Transport</SelectItem>
          <SelectItem value="cycle">Cycle</SelectItem>
          <SelectItem value="humanitarian">Humanitarian</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
