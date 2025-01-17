import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { HeadingForm } from "../heading-form";
  import { conservation_data } from "@/data/conservation_data";
  
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
          name={"conservation"}
          render={({ field }) => (
            <FormItem className="col-span-5">
              <FormLabel>Conservação</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado de conservação do imóvel" />
                  </SelectTrigger>
                </FormControl>
  
                <SelectContent>
                  {conservation_data.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  