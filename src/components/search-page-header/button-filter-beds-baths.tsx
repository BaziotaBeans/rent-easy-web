import { useState } from "react";
import { useFilter } from "@/contexts/filter-provider";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { baths, beds } from "@/data/beds-baths-data";

export function ButtonFilterBedsBaths() {
  const { setBedrooms, setBathrooms } = useFilter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<string>("Todos");
  const [selectedBath, setSelectedBath] = useState<string>("Todos");

  const handleApply = () => {
    // Converter valores para número
    const bedValue = selectedBed === "Todos" ? 0 : selectedBed === "5+" ? 5 : parseInt(selectedBed);
    const bathValue = selectedBath === "Todos" ? 0 : selectedBath === "5+" ? 5 : parseInt(selectedBath);

    setBedrooms(bedValue);
    setBathrooms(bathValue);
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button className="h-10 flex items-center" variant="outline">
          Quartos e Banheiros <ChevronDown className="w-6 h-6" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        <div className="w-96 flex flex-col gap-3">
          <div className="bg-primary-base/5 py-2 px-4 flex flex-col gap-3">
            <h3 className="text-zinc-500 font-semibold text-sm">
              Números de quartos
            </h3>
          </div>
          <div className="flex flex-col bg-white px-4">
            <h3 className="text-zinc-700 font-semibold text-sm">Quartos</h3>
            <RadioGroup
              className="grid grid-cols-6 mt-2 gap-0"
              value={selectedBed}
              onValueChange={setSelectedBed}
            >
              {beds.map((item) => (
                <label
                  key={item.id}
                  className="relative flex cursor-pointer flex-col items-center gap-3 border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-primary-base has-[[data-state=checked]]:bg-primary-base/10 has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary-base/70"
                >
                  <RadioGroupItem
                    id={`${item.id}-bed-radio`}
                    value={item.name}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm font-medium leading-none text-foreground">
                    {item.name}
                  </p>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="bg-primary-base/5 py-2 px-4 flex flex-col gap-3">
            <h3 className="text-zinc-500 font-semibold text-sm">
              Números de banheiros
            </h3>
          </div>
          
          <div className="flex flex-col bg-white px-4">
            <h3 className="text-zinc-700 font-semibold text-sm">Banheiros</h3>
            <RadioGroup
              className="grid grid-cols-6 mt-2 gap-0"
              value={selectedBath}
              onValueChange={setSelectedBath}
            >
              {baths.map((item) => (
                <label
                  key={item.id}
                  className="relative flex cursor-pointer flex-col items-center gap-3 border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-primary-base has-[[data-state=checked]]:bg-primary-base/10 has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary-base/70"
                >
                  <RadioGroupItem
                    id={`${item.id}-bath-radio`}
                    value={item.name}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm font-medium leading-none text-foreground">
                    {item.name}
                  </p>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="p-4 w-full">
            <Button variant={"primary"} className="w-full" onClick={handleApply}>
              Aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}