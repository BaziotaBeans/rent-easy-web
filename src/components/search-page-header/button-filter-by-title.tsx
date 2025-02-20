import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { useFilter } from "@/contexts/filter-provider";
export function ButtonFilterByTitle() {
  const { titleQuery, setTitleQuery } = useFilter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-10" variant="outline">
          Por título
          <ChevronDown className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        <DropdownMenuLabel>Filtrar por título</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="relative p-2">
          <Input
            className="pl-8"
            placeholder="Digite o título..."
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
          />
          <Search className="absolute top-4 left-3.5 text-primary-base w-5 h-5" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
