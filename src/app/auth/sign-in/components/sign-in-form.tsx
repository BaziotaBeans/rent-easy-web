"use client";


import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { PasswordInput } from "@/components/password-input";
import Image from "next/image";
import Link from "next/link";
import { LoginFormSchemaValidation } from "@/validations/login-validation";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";

export function SignInForm() {
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof LoginFormSchemaValidation>>({
    resolver: zodResolver(LoginFormSchemaValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchemaValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await signIn({ username: values.username, password: values.password });

      console.log(values);
      form.reset();

      toast.success("Sucesso", {
        description: "Login realizado com sucesso.",
      });
    } catch (error) {
      toast.error("Erro", {
        description: "Ocorreu um erro ao realizar o login. Dados incorretos.",
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full lg:max-w-full max-w-lg mx-auto lg:mx-0">
      <div className="flex sm:flex-row flex-col items-center justify-between gap-2 sm:gap-0">
        <Link href="/">
          <Image
            // src="/RentEasy.png"
            src="/logo-rf.png"
            alt="logo"
            className="object-cover max-w-[118px] w-full"
            width={130}
            height={36}
          />
        </Link>

        <span className="text-sm">
          Ainda não tem uma conta?{" "}
          <Link
            className="text-primary-base font-medium hover:underline"
            href="/auth/sign-up"
          >
            Criar conta
          </Link>
        </span>
      </div>

      <h1 className="text-2xl text-black font-semibold sm:text-left text-center">
        Faça login, acesse sua conta para encontrar o imóvel perfeito
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
            Submit
          </Button>

          {/* <div className="flex items-center justify-center gap-2 w-full ">
            <div className="flex-grow border-t border-zinc-300" />
            <span className="text-sm text-zinc-500 text-center">
              ou use uma destas opções
            </span>
            <div className="flex-grow border-t border-zinc-300" />
          </div>

          <Button
            type="button"
            variant="outline"
            size={"lg"}
            className="w-full font-medium flex items-center gap-2 text-zinc-500"
          >
            <FcGoogle size={20} /> Continue com Google
          </Button> */}
        </form>
      </Form>
    </div>
  );
}
