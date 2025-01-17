import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Header } from "./header";
import { SelectPropertyType } from "./select-property-type";
import { MultiStepFormPropertyRent } from "./property-rent/multi-step-form-property-rent";
import { usePropertyFilterStore } from "@/store/use-property-filter-store";
import { useAddPropertyDialogDialog } from "@/store/use-add-property-dialog";
import { MultiStepFormTerrain } from "./terrain/multi-step-form-terrain";
import { checkIfPropertyTypeIsSelected } from "@/utils";
import { MultiStepFormPropertySale } from "./property-sale/multi-step-form-property-sale";

export function AddPropertyDialog() {
  const { open, onManualHandle } = useAddPropertyDialogDialog();

  const { selectedPropertyType, selectedStep, resetFilters } = usePropertyFilterStore();

  const isRentedOptionSelected =
    selectedStep == "rent" &&
    checkIfPropertyTypeIsSelected(selectedPropertyType);

  const isTerrainOptionSelected =
    selectedStep == "sell" && selectedPropertyType == "terrain";

  const isSaledPropertyOptionSelected =
    selectedStep == "sell" &&
    checkIfPropertyTypeIsSelected(selectedPropertyType);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        resetFilters();
        onManualHandle(open);
      }}
    >
      <DialogContent
        className="sm:max-w-[60%] w-full h-full p-0 flex flex-col gap-0"
        hideCloseButton
      >
        <DialogTitle className="sr-only">Adicionar Imóvel</DialogTitle>
        <Header />

        <DialogDescription className="sr-only">
          Cadastrar o imóvel
        </DialogDescription>

        <div className="max-w-screen-sm w-full h-full flex flex-col mx-auto px-4">
          {!selectedStep && <SelectPropertyType />}

          {isRentedOptionSelected && <MultiStepFormPropertyRent />}

          {isTerrainOptionSelected && <MultiStepFormTerrain />}

          {isSaledPropertyOptionSelected && <MultiStepFormPropertySale />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
