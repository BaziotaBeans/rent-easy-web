"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useLocationSearch } from "@/hooks/use-location-search";
import { useSearchMap } from "@/contexts/search-map-provider";
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
import { cn } from "@/lib/utils";
import { useFilter } from "@/contexts/filter-provider";

export function SearchBarFilter() {
  const { setSearchLocation } = useSearchMap();
  const { setSearchQuery, searchQuery } = useFilter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { results, isLoading, error, search } = useLocationSearch();

  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm, search]);

  useEffect(() => {
    setSearchQuery(value);
  }, [value, setSearchQuery]);

  // Reset the internal state when searchQuery changes (including when reset)
  useEffect(() => {
    if (!searchQuery) {
      setValue("");
      setSearchTerm("");
    }
  }, [searchQuery]);

  const handleSelect = (result: {
    lat: string;
    lon: string;
    display_name: string;
  }) => {
    setValue(result.display_name);
    setOpen(false);
    setSearchLocation([parseFloat(result.lat), parseFloat(result.lon)]);
  };

  console.log(searchQuery)

  return (
    <div className="flex w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-white text-zinc-500 hover:bg-zinc-100",
              "h-10 pl-6 border-[1.5px] border-zinc-200 rounded-lg focus:border-dashed",
              "focus:ring-2 focus:ring-primary-base/60 outline-none transition-all"
            )}
          >
            {value || "Pesquisar locais em Angola..."}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
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
                {error ? `Error: ${error}` : "Nenhum local encontrado em Angola"}
              </CommandEmpty>
              <CommandGroup heading="Locais">
                {results.map((result) => (
                  <CommandItem
                    key={result.place_id}
                    value={result.display_name}
                    onSelect={() => handleSelect(result)}
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