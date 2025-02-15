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
      className="absolute top-5 right-5 z-[10] bg-white p-3 rounded-sm ring-2 ring-zinc-800/10 flex flex-col gap-2"
    >
      <label id="map-style-label" className="text-zinc-500 font-medium">
        Estilo do Mapa
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className="w-40 border-[1.5px] border-primary-base/40 bg-primary-base/10 hover:bg-primary-base/20 text-primary-base"
          aria-labelledby="map-style-label"
        >
          <SelectValue placeholder="Selecione um estilo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Padrão</SelectItem>
          <SelectItem value="satellite">Satélite</SelectItem>
          <SelectItem value="dark">Escuro</SelectItem>
          <SelectItem value="light">Claro</SelectItem>
          <SelectItem value="terrain">Terreno</SelectItem>
          <SelectItem value="watercolor">Aquarela</SelectItem>
          <SelectItem value="toner">Toner</SelectItem>
          <SelectItem value="transport">Transporte</SelectItem>
          <SelectItem value="cycle">Ciclismo</SelectItem>
          <SelectItem value="humanitarian">Humanitário</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
