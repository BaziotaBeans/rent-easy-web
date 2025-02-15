"use client";

import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { X, CalendarIcon } from "lucide-react";

type TableFiltersProps = {
  filterValue: string;
  setFilterValue: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  resetFilters: () => void;
};

export function TableFilters({
  filterValue,
  setFilterValue,
  selectedDate,
  setSelectedDate,
  resetFilters,
}: TableFiltersProps) {
  return (
    <div className="flex items-center py-4 justify-between">
      <Input
        placeholder="Filtrar por cliente..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="max-w-sm"
      />
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={resetFilters}>
          <X className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate
                ? format(selectedDate, "dd/MM/yyyy")
                : "Filtrar por data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
