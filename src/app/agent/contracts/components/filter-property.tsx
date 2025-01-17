import { ListFilter, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function FilterProperty() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Activo
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            6
          </span>
        </span>
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Inactivo
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            2
          </span>
        </span>
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Pendente
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            3
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-xs h-8 px-3">
              <ListFilter className="w-4 h-4 " /> Filtrar
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80"
            side="bottom"
            align="end"
          ></PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-xs h-8 px-3">
              <ArrowDownUp className="w-4 h-4 " /> Classificar por: mais recente
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80"
            side="bottom"
            align="end"
          ></PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
