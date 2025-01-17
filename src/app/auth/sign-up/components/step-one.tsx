import { PasswordInput } from "@/components/password-input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function StepOne() {
  return (
    <div className="space-y-4">
      <FormField
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome de usuário</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome de usuário" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Digite o email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <PasswordInput placeholder="Digite a senha" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirmar Senha</FormLabel>
            <FormControl>
              <PasswordInput placeholder="Digite a senha" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
