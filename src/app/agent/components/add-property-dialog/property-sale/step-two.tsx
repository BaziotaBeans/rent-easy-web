import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
    FormDescription,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { HeadingForm } from "../heading-form";
  
  export function StepTwo() {
    return (
      <div className="space-y-4">
        <HeadingForm
          title="Características Internas e Externas"
          description="Por favor adicione as informações das características internas e externas."
        />
        
        <FormField
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Quartos</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o número de quartos"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          name="bathroom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de banheiros</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o número de banheiros"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          name="suits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Súites (Opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o número de súites"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          name="totalArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área total (m²) (Opcional)</FormLabel>
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
  
        <FormField
          name="vacancy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de vagas (Opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o número de vagas"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Número de vagas corresponde ao número de vagas para o
                estacionamento de carro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  