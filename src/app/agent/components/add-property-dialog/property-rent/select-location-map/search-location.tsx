"use client";
import { useState, useEffect } from "react";
import { Loader2, MapPin } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchMap } from "@/contexts/search-map-provider";
import { useDebounce } from "@/hooks/use-debounce";
import { useLocationSearch } from "@/hooks/use-location-search";
import { formType } from "../step-three";

interface SearchLocationProps {
  form: formType
}

export function SearchLocation({ form }:SearchLocationProps) {
  const { setSearchLocation } = useSearchMap();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { results, isLoading, error, search } = useLocationSearch();

  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm, search]);

  const handleSelect = (result: {
    lat: string;
    lon: string;
    display_name: string;
    address: { county?: string, state?: string };
    name: string;
  }) => {
    setValue(result.display_name);
    setOpen(false);
    setSearchLocation([parseFloat(result.lat), parseFloat(result.lon)]);

    form.setValue("address", result.name);
    form.setValue("province", result.address.state ?? "");
    form.setValue("county", result.address.county ?? "");
    form.setValue("latitude", result.lat);
    form.setValue("longitude", result.lon);
  };

  console.log(results);

  return (
    <div className="w-full flex ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="">
          <button
            role="combobox"
            aria-expanded={open}
            className=" flex items-center justify-between text-sm text-zinc-500  gap-2 w-full cursor-pointer rounded-md bg-zinc-50 hover:bg-zinc-100 h-9 px-2.5 border focus:border-dashed transition-all outline-none"
          >
            {value || "Pesquisar locais em Angola..."}
            <MapPin className="w-4 h-4 text-zinc-500" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="relative w-[400px] p-0 ">
          <Command>
            <CommandInput
              placeholder="Search location in Angola..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              {isLoading && (
                <CommandLoading>
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2">Pesquisando locais...</span>
                  </div>
                </CommandLoading>
              )}
              <CommandEmpty>
                {error
                  ? `Error: ${error}`
                  : "Nenhum local encontrado em Angola"}
              </CommandEmpty>
              <CommandGroup heading="Locais">
                {results.map((result) => (
                  <CommandItem
                    key={result.place_id}
                    value={result.display_name}
                    onSelect={() => handleSelect(result)}
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{result.display_name}</span>
                      <span className="text-xs text-muted-foreground">
                        {result.type} • {result.class}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
