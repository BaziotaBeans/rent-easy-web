"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Loader2 } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import { useLocationSearch } from '@/hooks/use-location-search'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SearchBoxProps {
  onLocationSelect: (location: [number, number]) => void
  onCurrentLocation: () => void
}

export function SearchBox({ onLocationSelect, onCurrentLocation }: SearchBoxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { results, isLoading, error, search } = useLocationSearch()

  useEffect(() => {
    search(debouncedSearchTerm)
  }, [debouncedSearchTerm, search])

  const handleSelect = (result: { lat: string; lon: string; display_name: string }) => {
    setValue(result.display_name)
    setOpen(false)
    onLocationSelect([parseFloat(result.lat), parseFloat(result.lon)])
  }

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value || "Search locations in Angola..."}
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
                    <span className="ml-2">Searching locations...</span>
                  </div>
                </CommandLoading>
              )}
              <CommandEmpty>
                {error ? `Error: ${error}` : 'No locations found in Angola'}
              </CommandEmpty>
              <CommandGroup heading="Locations">
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
      <Button onClick={onCurrentLocation} variant="outline">
        <MapPin className="w-4 h-4 mr-2" />
        Current
      </Button>
    </div>
  )
}