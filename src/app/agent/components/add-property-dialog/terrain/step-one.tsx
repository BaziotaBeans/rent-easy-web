import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HeadingForm } from "../heading-form";

export function StepOne() {
  return (
    <div className="space-y-4">
      <HeadingForm
        title="Adicione detalhes da propriedade"
        description="Por favor preencha os dados com muita atenção."
      />

      <FormField
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título/Nome</FormLabel>
            <FormControl>
              <Input
                placeholder="Por favor preencha os campos com muita atenção..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição (Opcional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite aqui..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="totalArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Área total (m²)</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite a área total"
                type="number"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Área de construção do imóvel, medido em m².
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
