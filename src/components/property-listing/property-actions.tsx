"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PropertySchedulingDialog } from "./property-scheduling-dialog";
import { PropertyResponse } from "@/types/property";
import { useSignInWithoutRedirectDialogDialog } from "@/store/useSignInWithoutRedirectDialog";
import { SignInWithoutRedirectDialog } from "@/app/auth/components/sign-in-without-redirect-dialog";
import { useAuthStore } from "@/store/use-auth-store";

interface PropertyActionsProps {
  data: PropertyResponse;
}

export function PropertyActions({ data }: PropertyActionsProps) {
  const [isFixed, setIsFixed] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [openPropertySchedulingDialog, setOpenPropertySchedulingDialog] =
    useState(false);
  const [
    signInWithoutRedirectDialogMessage,
    setSignInWithoutRedirectDialogMessage,
  ] = useState<string>("");
  const { onOpen } = useSignInWithoutRedirectDialogDialog();

  function handleOpenPropertySchedulingDialog() {
    if (isAuthenticated) {
      setOpenPropertySchedulingDialog(true);
      return;
    }
    setSignInWithoutRedirectDialogMessage(
      "Você precisa estár logado para solicitar uma visita."
    );
    onOpen();
  }

  function handleGoToPayment() {
    if (isAuthenticated) {
      router.push(`/payment/${data.property.pkProperty}`);
      return;
    }
    setSignInWithoutRedirectDialogMessage(
      "Você precisa estár logado para arrendar o imóvel."
    );
    onOpen();
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const stopPoint = 3000; // Altere para a posição onde deseja parar
      setIsFixed(scrollY > stopPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        //className="sticky top-0 max-w-[315px] w-full border border-zinc-200 rounded-xl flex flex-col gap-2 self-start p-2"
        className={`${
          isFixed
            ? "fixed top-20 right-0 max-w-[415px]" // Fixa o componente quando scrolado
            : "sticky top-20"
        } w-full border border-zinc-200 rounded-xl flex flex-col gap-2 self-start p-2`}
      >
        <Button
          variant="primary"
          className="w-full text-base font-bold"
          size={"lg"}
          onClick={handleGoToPayment}
        >
          Arrendar agora
        </Button>

        <Button
          variant="outline-primary"
          className="w-full  flex flex-col gap-1 h-14"
          onClick={handleOpenPropertySchedulingDialog}
        >
          <span className="text-sm font-bold">Solicitar visita</span>

          <span className="text-xs">faça agora</span>
        </Button>
      </div>

      <PropertySchedulingDialog
        data={data}
        openPropertySchedulingDialog={openPropertySchedulingDialog}
        setOpenPropertySchedulingDialog={setOpenPropertySchedulingDialog}
      />

      <SignInWithoutRedirectDialog
        alertMessage={signInWithoutRedirectDialogMessage}
      />
    </>
  );
}
