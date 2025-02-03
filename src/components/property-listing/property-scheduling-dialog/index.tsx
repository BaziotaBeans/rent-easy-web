"use client";

import { useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PropertyResponse } from "@/types/property";
import { usePropertySchedule } from "@/services/hooks/use-property";
import { DayOfWeek } from "@/types/schedule";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatTime, isArrayEmpty, translateDayOfWeek } from "@/utils";
import { EmptyBox } from "./empty-box";
import { PaymentScheduling } from "./payment/payment-scheduling";

interface PropertySchedulingDialogProps {
  data: PropertyResponse;
  openPropertySchedulingDialog: boolean;
  setOpenPropertySchedulingDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export function PropertySchedulingDialog({
  data,
  openPropertySchedulingDialog,
  setOpenPropertySchedulingDialog,
}: PropertySchedulingDialogProps) {
  const [selectedSchedule, setSelectedSchedule] = useState("");

  const [continueToPayment, setContinueToPayment] = useState(false);

  const { data: dataPropertySchedule, isLoading } = usePropertySchedule(
    data.property.pkProperty
  );

  if (isLoading) return <div>Loading...</div>;

  function handleResetDialogState() {
    setSelectedSchedule("");
    setContinueToPayment(false);
    setOpenPropertySchedulingDialog(false);
  }

  console.log(dataPropertySchedule);

  return (
    <Dialog
      open={openPropertySchedulingDialog}
      onOpenChange={(open) => {
        setOpenPropertySchedulingDialog(open);
        setSelectedSchedule("");
        setContinueToPayment(false);
      }}
    >
      <DialogContent className="py-6 px-0 gap-0">
        <DialogTitle className="text-center text-xl text-zinc-600 border-b border-border pb-4">
          Agendar Visita
        </DialogTitle>
        <DialogDescription className="sr-only"></DialogDescription>

        {/* Renderiza condicionalmente PaymentScheduling ou o bloco comentado */}
        {selectedSchedule && continueToPayment ? (
          <PaymentScheduling
            data={data}
            selectedSchedule={selectedSchedule}
            handleResetDialogState={handleResetDialogState}
          />
        ) : isArrayEmpty(dataPropertySchedule || []) ? (
          <EmptyBox />
        ) : (
          <>
            <div className="flex items-center flex-col justify-center py-4">
              <HiMiniUsers className="w-9 h-9 fill-primary-base" />
              <h2 className="text-lg font-semibold text-primary-base">
                Visita presencial
              </h2>
              <span className="text-sm text-zinc-600">
                {data.property.address}
              </span>
            </div>

            <div>
              <div className="flex flex-col gap-4 p-4 overflow-hidden">
                <h2 className="text-zinc-600 font-semibold">
                  Selecione o horário da visita
                </h2>

                <RadioGroup
                  value={selectedSchedule}
                  onValueChange={setSelectedSchedule}
                  className="space-y-1"
                >
                  {dataPropertySchedule?.map((schedule) => (
                    <div
                      key={schedule.pkPropertySchedule}
                      className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <RadioGroupItem
                        value={schedule.pkPropertySchedule}
                        id={schedule.pkPropertySchedule}
                      />
                      <Label
                        htmlFor={schedule.pkPropertySchedule}
                        className="flex-grow cursor-pointer"
                      >
                        <span className="font-medium">
                          {translateDayOfWeek(schedule.dayOfWeek as DayOfWeek)}
                        </span>
                        <span className="ml-2 text-gray-600">
                          {formatTime(schedule.startTime)} -{" "}
                          {formatTime(schedule.endTime)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex gap-2 justify-end mt-6 border-t border-border pt-6 px-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpenPropertySchedulingDialog(false);
                    setSelectedSchedule("");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  variant={"primary"}
                  // disabled={!selectedSchedule || isLoadingCreateScheduling}
                  disabled={!selectedSchedule}
                  // loading={isLoadingCreateScheduling}
                  onClick={() => {
                    if (selectedSchedule) setContinueToPayment(true);
                  }}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
