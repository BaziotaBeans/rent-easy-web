"use client";

import { CustomRadioGroup } from "@/components/custom-radio-group";
import { propertyPurposes, propertyTypes } from "@/data/property_type_data";
import { usePropertyFilterStore } from "@/store/use-property-filter-store";
import { Button } from "@/components/ui/button";

export function SelectPropertyType() {
  const {
    selectedPropertyPurpose,
    selectedPropertyType,
    setSelectedPropertyPurpose,
    setSelectedPropertyType,
    setSelectedStep,
  } = usePropertyFilterStore();

  function handleSelectStep() {
    if (selectedPropertyPurpose) {
      setSelectedStep(selectedPropertyPurpose);
    }
  }

  return (
    <div className="flex flex-col gap-6 py-8 h-full">
      <div className="flex flex-col">
        <h3 className="text-base text-zinc-600 font-medium">Finalidade</h3>
        <p className="text-sm text-zinc-600">
          Selecione a finalidade do imóvel.
        </p>
      </div>

      <CustomRadioGroup
        items={propertyPurposes}
        value={selectedPropertyPurpose}
        onValueChange={setSelectedPropertyPurpose}
        className="flex items-stretch gap-3"
      />

      <div className="flex flex-col">
        <h3 className="text-base text-zinc-600 font-medium">Tipo de imóvel</h3>
        <p className="text-sm text-zinc-600">
          Selecione o tipo de imóvel que deseja anunciar.
        </p>
      </div>

      <CustomRadioGroup
        items={propertyTypes}
        value={selectedPropertyType}
        onValueChange={setSelectedPropertyType}
        className="grid grid-cols-2 gap-3 "
      />

      <Button
        variant="primary"
        className="mt-auto font-semibold"
        size={"lg"}
        onClick={handleSelectStep}
        disabled={!selectedPropertyPurpose || !selectedPropertyType}
      >
        Próximo
      </Button>
    </div>
  );
}
