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
  const [allChecked, setAllChecked] = React.useState<Checked>(true); // "Todos" selecionado por padrão

  React.useEffect(() => {
    if (rentChecked) {
      setPurpose("rent");
      setAllChecked(false); // Desmarca "Todos" quando "Aluguel" é selecionado
    } else if (buyChecked) {
      setPurpose("buy");
      setAllChecked(false); // Desmarca "Todos" quando "Compra" é selecionado
    } else {
      setPurpose(null); // Define o propósito como null quando "Todos" é selecionado
      setAllChecked(true); // Marca "Todos" quando nenhum outro filtro está ativo
    }
  }, [rentChecked, buyChecked, setPurpose]);

  const handleRentChange = (checked: Checked) => {
    setRentChecked(checked);
    if (checked) {
      setBuyChecked(false); // Desmarca "Compra" quando "Aluguel" é selecionado
      setAllChecked(false); // Desmarca "Todos" quando "Aluguel" é selecionado
    }
  };

  const handleBuyChange = (checked: Checked) => {
    setBuyChecked(checked);
    if (checked) {
      setRentChecked(false); // Desmarca "Aluguel" quando "Compra" é selecionado
      setAllChecked(false); // Desmarca "Todos" quando "Compra" é selecionado
    }
  };

  const handleAllChange = (checked: Checked) => {
    setAllChecked(checked);
    if (checked) {
      setRentChecked(false); // Desmarca "Aluguel" quando "Todos" é selecionado
      setBuyChecked(false); // Desmarca "Compra" quando "Todos" é selecionado
    }
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
          checked={allChecked}
          onCheckedChange={handleAllChange}
        >
          Todos
        </DropdownMenuCheckboxItem>
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
          Compra
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}