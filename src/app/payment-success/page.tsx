"use client";

import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import Confetti from "react-confetti";
import { ImPriceTags } from "react-icons/im";
import { useWindowSize } from "react-use";
import { GoCheckCircleFill } from "react-icons/go";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice";
import DownloadButton from "./components/download-pdf-button";
import { useLastPayment } from "@/services/hooks/use-payment";
import { formatTime } from "@/utils/times-formats";
import { formatDate } from "@/utils/date-formats";
import { Skeleton } from "@/components/ui/skeleton"; // Importação do Skeleton
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Importação do Alert
import { BiErrorCircle } from "react-icons/bi"; // Ícone para o erro
import Link from "next/link";

export default function Page() {
  const { width, height } = useWindowSize();
  const [isClient, setIsClient] = useState(false);

  const { data, isLoading, isError } = useLastPayment();

  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    if (data) {
      const invoiceYear = new Date(data.createdAt).getFullYear();

      setInvoice({
        invoiceNumber: `FAT-${invoiceYear}-${data.reference}`,
        propertyDetails: {
          type: data.property.fkPropertyTypeEntity.designation,
          address: data.property.address,
          reference: data.property.title,
        },
        payment: {
          amount: data.totalValue,
          method: data.paymentMethod,
          status: "Paid",
          date: formatDate(data.createdAt),
          time: formatTime(data.createdAt),
        },
        parties: {
          agent: {
            name: data.property.companyEntity.user.fullName,
            contact: data.property.companyEntity.user.phone,
            company: data.property.companyEntity.user.nif,
          },
          client: {
            name: data.user.fullName,
            contact: data.user.phone,
            address: data.user.address,
          },
        },
        transactionType:
          data.property.fkPropertyTypeEntity.designation == "Arrendamento"
            ? "Rent"
            : "Purchase",
      });
    }
  }, [data]);

  useEffect(() => {
    setIsClient(true); // Confirma que está no cliente
  }, []);

  // 🟡 Skeleton de carregamento
  if (isLoading) {
    return (
      <main className="flex flex-col items-center gap-4 p-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-80" />
        <div className="bg-[#f3eae1] rounded-xl p-4 max-w-[500px] w-full flex flex-col gap-4 mt-4">
          <Skeleton className="h-6 w-40" />
          <Separator className="bg-[#e4d7ca]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-10 w-40" />
      </main>
    );
  }

  // 🔴 Mensagem de erro
  if (isError) {
    return (
      <main className="flex flex-col items-center gap-4 p-4">
        <Alert variant="destructive">
          <BiErrorCircle className="h-5 w-5" />
          <AlertTitle>Erro ao carregar o pagamento</AlertTitle>
          <AlertDescription>
            Não foi possível carregar as informações do pagamento. Tente
            novamente mais tarde.
          </AlertDescription>
          
          {/* 🔗 Link para a Home */}
          <Link href="/" passHref>
            <Button variant="outline" className="mt-4">
              Voltar para a Home
            </Button>
          </Link>
        </Alert>
      </main>
    );
  }

  // ✅ Conteúdo principal
  return (
    <>
      {isClient && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <main className="flex flex-col items-center gap-4">
        <GoCheckCircleFill className="fill-green-600 w-12 h-12" />

        <div className="flex flex-col gap-2 max-w-[500px] mx-auto">
          <h2 className="text-center font-semibold text-zinc-700 text-lg">
            Pagamento realizado com sucesso!
          </h2>

          <p className="text-sm text-center">
            O seu pagamento foi realizado com successo agora já pode acessar
            informações relacionado ao contracto do imóvel
          </p>
        </div>

        <div className="bg-[#f3eae1] rounded-xl p-4 max-w-[500px] w-full flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold flex items-center gap-2 text-zinc-700">
              <ImPriceTags className="w-4 h-4" />{" "}
              {formatPriceToKwanza(data?.totalValue ?? 0)}
            </span>

            <span className="bg-green-100 text-green-600 text-xs rounded-xl px-2 py-1 font-semibold">
              Pago
            </span>
          </div>

          <Separator className="bg-[#e4d7ca]" />

          <ul className="flex flex-col gap-2">
            <li className="flex items-center justify-between">
              <span className="text-sm">Nº Referência </span>
              <span className="text-sm font-medium">{data?.reference}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm">Método de pagamento </span>
              <span className="text-sm font-medium">{data?.paymentMethod}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm">Tipo Item </span>
              <span className="text-sm font-medium">
                {data?.property.fkPropertyTypeEntity.designation}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm">Hora </span>
              <span className="text-sm font-medium">
                {formatTime(data?.createdAt)}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm">Responsável</span>
              <span className="text-sm font-medium">
                {data?.property.companyEntity.user.fullName}
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-2 max-w-[500px] w-full">
          {invoice && <DownloadButton invoice={invoice} />}
          <Button className="w-full" variant={"outline-primary"} asChild>
            <Link href="/myrenteasy/contracts">
            Ir para contractos
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
