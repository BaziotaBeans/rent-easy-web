import * as React from "react";
import { ChevronDown } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { useFilter } from "@/contexts/filter-provider";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function ButtonFilterPurpose() {
  const { setPurpose } = useFilter();
  const [rentChecked, setRentChecked] = React.useState<Checked>(false);
  const [buyChecked, setBuyChecked] = React.useState<Checked>(false);

  React.useEffect(() => {
    if (rentChecked) setPurpose("rent");
    else if (buyChecked) setPurpose("buy");
    else setPurpose(null);
  }, [rentChecked, buyChecked, setPurpose]);

  const handleRentChange = (checked: Checked) => {
    setRentChecked(checked);
    if (checked) setBuyChecked(false);
  };

  const handleBuyChange = (checked: Checked) => {
    setBuyChecked(checked);
    if (checked) setRentChecked(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-10" variant="outline">
          Finalidade <ChevronDown className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Finalidade</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={rentChecked}
          onCheckedChange={handleRentChange}
        >
          Aluguel
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={buyChecked}
          onCheckedChange={handleBuyChange}
        >
          Comprar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}