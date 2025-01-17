"use client";

import { z } from "zod";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/validations/changePasswordSchema";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function ChangePassword() {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(data: ChangePasswordFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha Actual</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Digite a senha actual"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Digite a nova senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Nova senha</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant={'primary'}>Alterar a senha</Button>
      </form>
    </Form>
  );
}
