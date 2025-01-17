"use client";

import { z } from "zod";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { profileClientUserSchema } from "@/validations/profileClientUserSchema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-phone-input-2/lib/style.css";

type ProfileFormValues = z.infer<typeof profileClientUserSchema>;
export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(profileClientUserSchema),
    defaultValues: {
      fullName: "",
      nif: "",
      nationality: "",
      maritalStatus: "",
      phoneNumber: "",
      address: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
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

          <div className="flex items-start gap-2 w-full">
            <FormField
              name="nif"
              render={({ field }) => (
                <FormItem className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>Nacionalidade</FormLabel>
                  <FormControl>
                    <CountryDropdown
                      placeholder="Selecione o país"
                      defaultValue={field.value}
                      onChange={(country) => {
                        field.onChange(country.alpha3);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-start gap-2">
            <FormField
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>Estado Cívil</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          </div>

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

        <Button type="submit" variant={'primary'}>Actualizar perfil</Button>
      </form>
    </Form>
  );
}
