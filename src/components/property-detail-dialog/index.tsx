"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { PropertyDetailDialogHeader } from "./property-detail-dialog-header";
import { usePropertyDetailDialog } from "@/store/usePropertyDetailDialog";
import PropertyListing from "../property-listing/property-listing";
import { PropertyResponse } from "@/types/property";

interface PropertyDetailDialogProps {
  id: string;
  data: PropertyResponse;
}

export function PropertyDetailDialog({ id, data }: PropertyDetailDialogProps) {
  const { onClose, openId } = usePropertyDetailDialog();

  const isOpen = openId === id;

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />

        <Dialog.Content className="fixed overflow-y-auto left-[50%] top-[50%] flex-col min-h-screen h-full z-50 w-full max-w-[1248px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <PropertyDetailDialogHeader />
          <Dialog.Title className="sr-only">Detalhes do imóvel</Dialog.Title>

          <div className="">
            <Dialog.Description className="sr-only"></Dialog.Description>
            <PropertyListing
              data={data}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
