"use client";

import { useState } from "react";

import { User, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface UserType {
  value: "normal" | "agent";
  title: string;
  description: string;
}

const userTypes: UserType[] = [
  {
    value: "normal",
    title: "Usuário normal",
    description: "Navegue e contre o imóvel perfeito para você.",
  },
  {
    value: "agent",
    title: "Agente imobiliário",
    description: "Gerencie seus imóveis e contractos.",
  },
];

export function SelectUserType() {
  const [selectedType, setSelectedType] = useState<string>("normal");

  const continueUrl =
    selectedType === "normal" ? "/auth/sign-up/client" : "/auth/sign-up/agent";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Image
          src="/RentEasy.png"
          alt="logo"
          className="object-cover max-w-[118px] w-full"
          width={130}
          height={36}
        />

        <span className="text-sm">
          Já possui uma conta?{" "}
          <Link
            className="text-primary-base font-medium hover:underline"
            href="/auth/sign-in"
          >
            Login
          </Link>
        </span>
      </div>

      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Criar conta</h1>
          <p className="text-zinc-600 text-sm">
            Selecione o tipo de usuário para associar a conta.
          </p>
        </div>

        <RadioGroup
          value={selectedType}
          onValueChange={setSelectedType}
          className="space-y-2 mt-4"
        >
          {userTypes.map((type) => (
            <div
              key={type.value}
              className={`relative flex items-start space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-slate-50 transition-colors 
                ${
                  selectedType === type.value
                    ? "bg-white border-primary-base ring-1 ring-primary-base"
                    : "bg-white border-zinc-200 ring-1 ring-zinc-200"
                }`}
              onClick={() => setSelectedType(type.value)}
            >
              <div className="flex-1 flex space-y-1 gap-3 items-center">
                <div className="border-2 border-zinc-200 rounded-md p-1">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex flex-col ">
                  <Label htmlFor={type.value} className="text-base font-medium">
                    {type.title}
                  </Label>
                  <p className="text-gray-500 text-sm">{type.description}</p>
                </div>
              </div>
              <div className="relative">
                <RadioGroupItem
                  value={type.value}
                  id={type.value}
                  className={`mt-1 aspect-square h-5 w-5 rounded-full border-2  ${
                    selectedType === type.value
                      ? "border-primary-base"
                      : "border-zinc-200"
                  }`}
                />
                {selectedType === type.value && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-primary-base rounded-full p-0.5">
                      <Check className="h-3.5 w-3.5 text-white stroke-[3.5]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>

        <Button asChild variant="primary" size={"lg"}>
          <Link href={continueUrl}>Continuar</Link>
        </Button>
      </div>
    </div>
  );
}
