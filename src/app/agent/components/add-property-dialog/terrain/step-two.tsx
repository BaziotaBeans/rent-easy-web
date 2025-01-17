"use client";

import { z } from "zod";
import dynamic from "next/dynamic";
import { HeadingForm } from "../heading-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { stepAddTerrainSchemas } from "@/validations/stepAddTerrainSchemas";
import { SearchLocation } from "./select-location-map/search-location";

const SelectLocationMap = dynamic(
  () => import("./select-location-map"),
  {
    loading: () => <p>O map está carregando...</p>,
    ssr: false,
  }
);

// Definindo o tipo do formulário com base no esquema atual do step
type StepThreeFormSchema = z.infer<(typeof stepAddTerrainSchemas)[number]>;

export type formType = UseFormReturn<StepThreeFormSchema>;

// Ajustando o tipo da prop `form`
export interface StepThreeProps {
  form: formType;
}

export function StepTwo({ form }: StepThreeProps) {

  return (
    <div className="space-y-4 relative">
      <HeadingForm
        title="Localização"
        description="Por favor selecione e preencha os campos da localização do imóvel, essa localização será exibida no momento da pesquisa."
      />

      <SearchLocation form={form} />

      <Tabs defaultValue="address" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="address">Endereço</TabsTrigger>
          <TabsTrigger value="coordinates">Coordenadas</TabsTrigger>
        </TabsList>

        <TabsContent value="address">
          <div>
            <FormField
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Selecione o endereço"
                      className="rounded-b-none"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center w-full">
              <FormField
                name="province"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Província"
                        className="rounded-t-none border-t-0 rounded-br-none"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="county"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Município"
                        className="rounded-t-none border-t-0 rounded-bl-none border-l-0"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="coordinates">
          <div className="flex items-center  w-full">
            <FormField
              name="latitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      disabled
                      className="rounded-r-none border-r-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="longitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      disabled
                      className="rounded-l-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </TabsContent>

        <SelectLocationMap />
      </Tabs>
    </div>
  );
}
