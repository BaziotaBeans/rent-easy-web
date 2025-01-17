"use client";

import { z } from "zod";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { bankSchemas } from "@/validations/bankSchemas";

type BankFormValues = z.infer<typeof bankSchemas>;

export function BankForm() {
  const form = useForm({
    resolver: zodResolver(bankSchemas),
    defaultValues: {
      bankName: "",
      bankAccountNumber: "",
      bankIban: "",
    },
  });

  function onSubmit(data: BankFormValues) {
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
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do banco</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

        <Button type="submit" variant={'primary'}>Actualizar dados bancário</Button>
      </form>
    </Form>
  );
}
