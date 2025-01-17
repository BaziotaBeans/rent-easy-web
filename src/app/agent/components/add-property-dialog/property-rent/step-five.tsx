import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeadingForm } from "../heading-form";
import { Input } from "@/components/ui/input";
import { paymentModalityData } from "@/data/payment-modality-data";
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
            <FormLabel>Preço de aluguel</FormLabel>
            <FormControl>
              <Input placeholder="Digite o preço" type="number" {...field} />
            </FormControl>
            <FormDescription>
              O preço do aluguel será multiplicado em função da modalidade de
              pagamento.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name={"paymentModality"}
        render={({ field }) => (
          <FormItem className="col-span-5">
            <FormLabel>Modalidade de pagamento</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar a modalidade pagamento" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {paymentModalityData.map((payment) => (
                  <SelectItem key={payment} value={payment}>
                    {payment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
