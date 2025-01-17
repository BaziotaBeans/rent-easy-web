import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { HeadingForm } from "../heading-form";
import { Input } from "@/components/ui/input";
import { usePropertyFilterStore } from "@/store/use-property-filter-store";

export function StepFive() {
  const { selectedPropertyType } = usePropertyFilterStore();

  return (
    <div className="space-y-4 relative">
      <HeadingForm
        title="Informações Financeira"
        description="Por favor preencha os dados das informações financeira."
      />

      <FormField
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço da compra</FormLabel>
            <FormControl>
              <Input placeholder="Digite o preço" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedPropertyType != "home" && (
        <FormField
          name="condominiumFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxa de condomínio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o preço da taxa de condomínio"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
