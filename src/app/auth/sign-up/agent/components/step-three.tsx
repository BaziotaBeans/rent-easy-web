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
import { bankList } from "@/data/bank_list";

export function StepThree() {
  return (
    <div className="space-y-4">
      <FormField
        name="bankName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do banco</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nome do banco" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {bankList.map((item, index) => (
                  <SelectItem key={`#${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="bankAccountNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número da conta bancária</FormLabel>
            <FormControl>
              <Input placeholder="Digite o número da conta" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        name="bankIban"
        render={({ field }) => (
          <FormItem>
            <FormLabel>IBAN</FormLabel>
            <FormControl>
              <Input placeholder="Digite o IBAN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
