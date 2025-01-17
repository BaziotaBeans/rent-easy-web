"use client";

import { z } from "zod";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeadingForm } from "../heading-form";
import { dayOfWeekData } from "@/data/day-of-week-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { stepAddTerrainSchemas } from "@/validations/stepAddTerrainSchemas";

type StepThreeFormschema = z.infer<(typeof stepAddTerrainSchemas)[number]>;

export type formType = UseFormReturn<StepThreeFormschema>;

interface StepFourProps {
  form: formType;
}

export function StepThree({ form }: StepFourProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedules",
  });

  return (
    <div className="space-y-4 relative">
      <HeadingForm
        title="Agendamento"
        description="Crie o agendamento para as visitas semanais do imóvel."
      />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-4 items-center">
            <FormField
              control={form.control}
              name={`schedules.${index}.dayOfWeek`}
              render={({ field }) => (
                <FormItem className="col-span-5">
                  <FormLabel>Dia da semana</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o dia da semana" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {dayOfWeekData.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`schedules.${index}.startTime`}
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Hora de início</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`schedules.${index}.endTime`}
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Hora de termino</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-1 flex justify-end items-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="ghost"
          className="w-full mt-4 text-primary-base hover:text-primary-base-hover"
          onClick={() =>
            append({
              dayOfWeek: "",
              startTime: "",
              endTime: "",
            })
          }
        >
          <Plus className="w-5 h-5"/> Adicionar horário
        </Button>
      </div>
    </div>
  );
}
