import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-phone-input-2/lib/style.css";

export function StepTwo() {
  return (
    <div className="space-y-4">
      <FormField
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primeiro e último nome</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite o primeiro e o último nome"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="nif"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NIF (Número de identificação fiscal)</FormLabel>
            <FormControl>
              <Input placeholder="Digite o NIF" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nacionalidade</FormLabel>
            <FormControl>
              <CountryDropdown
                placeholder="Selecione o país"
                defaultValue={field.value}
                onChange={(country) => {
                  console.log(country.name);
                  field.onChange(country.alpha3);
                  console.log(field.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite o número de telefone"
                type="number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="maritalStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado Cívil</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estado estado cívil" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectItem value="Solteiro">Solteiro</SelectItem>
                <SelectItem value="Casado">Casado</SelectItem>
                <SelectItem value="Viúvo">Viúvo</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <Input placeholder="Digite o endereço" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
