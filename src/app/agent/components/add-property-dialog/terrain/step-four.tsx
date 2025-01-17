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

export function StepFour() {
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
    </div>
  );
}
