"use client";

import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExpressSVG } from "@/components/svg/express";
import { PaymentMethodOption } from "@/types/payment-method-option";
import { usePaymentStore } from "@/store/payment-store";
import { paymentsMethods } from "@/data/payment-method-data";

export function PaymentMethodBox() {
  const { selectedType, setSelectedType } = usePaymentStore();

  return (
    <div className="flex-1 flex flex-col gap-4 rounded-xl p-6 bg-white">
      <h2 className="text-lg font-bold">Formas de pagamento</h2>

      <Separator />

      <RadioGroup
        value={selectedType}
        onValueChange={(value: PaymentMethodOption) => {
          setSelectedType(value);
        }}
        className="mt-4"
      >
        {paymentsMethods.map((type, index) => (
          <div
            key={type.value}
            className={`flex items-center gap-4 py-6 ${
              index % 2 === 0 ? "border-b" : ""
            }`}
          >
            <div className="relative">
              <RadioGroupItem
                value={type.value}
                id={type.value}
                className={`mt-1 aspect-square h-5 w-5 rounded-full border-2  ${
                  selectedType === "reference"
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

            <ExpressSVG />

            <div className="flex flex-col relative">
              <span className="flex items-center gap-2 text-base font-bold ">
                {type.title}
                {type.value === "reference" && (
                  <span className="bg-primary-base/20 text-primary-base font-bold py-1 px-2 rounded-3xl text-xs">
                    Primário
                  </span>
                )}
              </span>
              <p className="text-zinc-600">{type.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
