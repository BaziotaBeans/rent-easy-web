"use client";

import { z } from "zod";
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { accountSchemas } from "@/validations/accountSchema";

type AccountFormValues = z.infer<typeof accountSchemas>;

export function AccountForm() {
  const form = useForm({
    resolver: zodResolver(accountSchemas),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(data: AccountFormValues) {
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
        </div>

        <Button type="submit" variant={'primary'}>Actualizar a conta</Button>
      </form>
    </Form>
  );
}
