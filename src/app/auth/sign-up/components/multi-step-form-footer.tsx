"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function MultiStepFormFooter() {
  const [dialogContent, setDialogContent] = useState<
    "terms" | "privacy" | null
  >(null);

  const termsContent = (
    <div>
      {/* <h2 className="text-lg font-semibold">Termos e Condições</h2> */}
      <p className="mt-2 text-sm text-gray-600">
        Nosso sistema de aluguel de imóveis exige a coleta de alguns dados
        pessoais para garantir a segurança de ambas as partes. Os dados são
        utilizados para:
      </p>
      <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
        <li>Verificação de identidade de clientes e agentes imobiliários.</li>
        <li>Garantia da autenticidade dos contratos de aluguel.</li>
        <li>Prevenção de fraudes no processo de locação.</li>
      </ul>
    </div>
  );

  const privacyContent = (
    <div>
      {/* <h2 className="text-lg font-semibold">Declaração de Privacidade</h2> */}
      <p className="mt-2 text-sm text-gray-600">
        A privacidade dos nossos usuários é uma prioridade. Os dados coletados
        têm os seguintes propósitos:
      </p>
      <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
        <li>
          Os dados bancários dos agentes imobiliários são necessários para
          processar comissões e repasses.
        </li>
        <li>
          Os dados dos clientes são utilizados para avaliação de crédito e
          garantia contratual.
        </li>
        <li>
          As informações são protegidas com criptografia e não são
          compartilhadas sem consentimento.
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-2 mt-auto">
        <span className="text-sm text-zinc-500">
          Já possui uma conta?{" "}
          <Link
            className="text-primary-base font-medium hover:underline"
            href="/auth/sign-in"
          >
            Login
          </Link>
        </span>

        <p className="text-sm text-zinc-500">
          Ao criar uma conta, você concorda com nossos{" "}
          <button
            className="font-medium underline text-primary-base"
            onClick={() => setDialogContent("terms")}
          >
            Termos e Condições
          </button>{" "}
          e{" "}
          <button
            className="font-medium underline text-primary-base"
            onClick={() => setDialogContent("privacy")}
          >
            Declaração de Privacidade
          </button>
          .
        </p>
      </div>

      {/* Dialog */}
      <Dialog.Root
        open={!!dialogContent}
        onOpenChange={() => setDialogContent(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-lg font-semibold">
                {dialogContent === "terms"
                  ? "Termos e Condições"
                  : "Declaração de Privacidade"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            <Dialog.Description className="sr-only">Termos</Dialog.Description>

            <div className="flex flex-col mt-2 text-sm text-gray-600">
              {dialogContent === "terms" ? termsContent : privacyContent}
            </div>

            <div className="mt-4 flex justify-end">
              <Dialog.Close asChild>
                <Button variant="outline">Fechar</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
