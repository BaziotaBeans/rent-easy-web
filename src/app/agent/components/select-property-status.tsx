import { Info } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectPropertyStatus() {
  return (
    <div className="self-start  w-auto flex items-center bg-[#ebf1ff] rounded-lg">
      <Select>
        <SelectTrigger className=" bg-[#ebf1ff] text-[#1c46f9] h-6 border-none px-2 gap-1">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="apple">Activo</SelectItem>
            <SelectItem value="banana">Pendente</SelectItem>
            <SelectItem value="blueberry">Inactivo</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="border-l border-[#1c44f933] h-full flex items-center justify-center px-1.5">
        <Info className="w-3.5 h-3.5" color="#1c46f9" />
      </div>
    </div>
  );
}
