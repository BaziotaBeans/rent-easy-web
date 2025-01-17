"use client";

import { Search } from "lucide-react";
import { usePropertyFilter } from "@/store/use-property-agent-filter";

export function SearchProperty() {
  const { setSearchTerm } = usePropertyFilter();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Pesquise os imóveis cadastrados.</span>
      <div className="relative w-full">
        <Search className="absolute left-4 top-4 w-4 h-4" />
        <input
          placeholder="Pesquisar por imóvel..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 border border-zinc-400 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-base transition-all"
        />
      </div>
    </div>
  );
}
