import { X } from "lucide-react";
import { RentHomeIcon } from "@/components/svg/rent-home-icon";
import { Button } from "@/components/ui/button";
import { useAddPropertyDialogDialog } from "@/store/use-add-property-dialog";
import { usePropertyFilterStore } from "@/store/use-property-filter-store";

export function Header() {
  const { onClose } = useAddPropertyDialogDialog();
  const { resetFilters } = usePropertyFilterStore();

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b">
      <div className="flex items-center gap-2">
        <div className="rounded-full w-9 h-9 flex items-center justify-center bg-primary-base/10">
          <RentHomeIcon isPrimaryColor size={18} />
        </div>
        <span className="text-sm font-medium">Adicionar Propriedade</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={"outline"}
          className="h-7 w-7 p-0"
          onClick={() => {
            onClose();
            resetFilters();
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
