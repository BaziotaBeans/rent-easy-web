"use client";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/dialog";
import { LoginFormSchemaValidation } from "@/validations/login-validation";
import { PasswordInput } from "@/components/password-input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useSignInWithoutRedirectDialogDialog } from "@/store/useSignInWithoutRedirectDialog";

interface SignInWithoutRedirectDialogProps {
  alertMessage?: string;
}

export function SignInWithoutRedirectDialog({
  alertMessage,
}: SignInWithoutRedirectDialogProps) {
  const { signInWithoutRedirect } = useAuth();

  const { open, onManualHandle, onClose } =
    useSignInWithoutRedirectDialogDialog();

  const form = useForm<z.infer<typeof LoginFormSchemaValidation>>({
    resolver: zodResolver(LoginFormSchemaValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchemaValidation>) {
    try {
      await signInWithoutRedirect({
        username: values.username,
        password: values.password,
      });

      console.log(values);

      toast.success("Sucesso", {
        description: "Login realizado com sucesso.",
      });
    } catch (error) {
      toast.error("Erro", {
        description: "Ocorreu um erro ao realizar o login.",
      });
    } finally {
      form.reset();
      onClose();
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onManualHandle(open);
        form.reset();
      }}
    >
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Bem vindo a RentEasy</DialogTitle>
            {alertMessage && (
              <div className="flex flex-col gap-2 bg-orange-200 text-orange-700 font-medium rounded-sm p-2 text-sm">
                <div className="flex items-center gap-2 text-base">
                  <TriangleAlert className="w-5 h-5" /> Aviso
                </div>
                <p>{alertMessage}</p>
              </div>
            )}

            <DialogDescription>
              Faça login com os dados que você inseriu durante seu registo.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome de usuário"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center w-full justify-between">
                <FormField
                  control={form.control}
                  name="keepSigned"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor={field.name}
                            className="text-sm text-zinc-500 font-medium"
                          >
                            Mantenha-me conectado
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Esqueceu sua senha?
                </Link> */}
              </div>

              <Button
                loading={form.formState.isSubmitting}
                variant="primary"
                className="w-full"
                type="submit"
              >
                Entrar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
