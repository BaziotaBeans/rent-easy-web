"use client";

import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePaymentStore } from "@/store/payment-store";
import { PropertyResponse } from "@/types/property";
import { formatPriceToKwanza } from "@/utils/format-price";
import { MapPin, BedDouble, Bath, CarFront, Ratio, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTotalValueToPaidInProperty } from "@/utils";
import { useState } from "react";
import { useCreateOrder } from "@/services/hooks/use-order";
import { OrderRequest } from "@/types/order";
import { useAuth } from "@/hooks/use-auth";
import { PaymentMethod } from "@/utils/enum";
import { motion } from "framer-motion";

interface PropertyResumeProps {
  data: PropertyResponse;
}

export function PropertyResume({ data }: PropertyResumeProps) {
  const params = useParams();

  const { user } = useAuth();

  const router = useRouter();

  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const { mutateAsync } = useCreateOrder();

  const { selectedType } = usePaymentStore();

  const { id } = params;

  const nextURL = `/payment/${id}/${selectedType}`;

  const submitPayment = async () => {
    setIsLoadingPayment(true);

    // Delay para melhorar UX
    setTimeout(async () => {
      const formattedData: OrderRequest = {
        userId: user!.pkUser,
        entidade: "00750",
        paymentMethod: PaymentMethod[selectedType],
        propertyId: data.property.pkProperty,
        totalValue: getTotalValueToPaidInProperty({ data: data }),
      };

      try {
        await mutateAsync(formattedData);

        toast.success("Sucesso", {
          description: "Pedido criado com sucesso.",
        });

        router.push(nextURL);
      } catch (error) {
        toast.error("Erro", {
          description: "Ocorreu um erro ao criar o pedido.",
        });

        console.log(error);
      } finally {
        setIsLoadingPayment(false);
      }
    }, 1200);
  };

  return (
    <div className="lg:max-w-[380px] w-full flex flex-col gap-4 rounded-xl p-5 bg-white">
      <div className="flex items-center gap-3 truncate">
        <Image
          src={data.images[0].url}
          alt={data.property.title}
          className="object-cover w-20 h-20 rounded-lg"
          height={173}
          width={173}
        />

        <div className="flex flex-col gap-1">
          <span className="text-zinc-800 text-base font-semibold">
            {data.property.title}
          </span>
          <span className="grid grid-cols-[16px_1fr] w-full items-center gap-2 text-xs text-zinc-600">
            <MapPin className="w-4 h-4 " />
            {data.property.address}
          </span>
          <div className="flex items-center gap-2">
            {data.property.fkPropertyTypeEntity.designation === "Terreno" ? (
              //Ratio
              <div className="flex items-center gap-2 text-sm">
                <Ratio className="w-4 h-4" /> Área {data.property.totalArea}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <BedDouble className="w-4 h-4" /> {data.property.room}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bath className="w-4 h-4" /> {data.property.bathroom}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CarFront className="w-4 h-4" /> {data.property.vacancy}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-zinc-600 font-medium">Resumo</h3>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Tipo de imóvel</span>
            <span className="text-sm text-zinc-500">
              {data.property.fkPropertyTypeEntity.designation}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Conservação</span>
            <span className="text-sm text-zinc-500">Usado</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Finalidade</span>
            <span className="text-sm text-zinc-500">Venda</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Modalidade de pagamento
            </span>
            <span className="text-sm text-zinc-500">-</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Taxa de condomínio</span>
            <span className="text-sm text-zinc-500">-</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Status</span>
            <span className="text-sm text-zinc-500">Pronto</span>
          </li>
        </ul>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-600 font-medium">Total</span>
        <span className="text-base text-zinc-600 font-semibold">
          {formatPriceToKwanza(getTotalValueToPaidInProperty({ data: data }))}
        </span>
      </div>

      {/* <Button
        variant={"primary"}
        size={"lg"}
        onClick={submitPayment}
        loading={isLoadingPayment}
      >
        Continuar
      </Button> */}
      {/* Animação do Botão */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={
            isLoadingPayment
              ? { scale: 0.95, opacity: 0.7 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={submitPayment}
            disabled={isLoadingPayment}
            className="relative w-full"
          >
            {isLoadingPayment ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Processando...
              </>
            ) : (
              "Continuar"
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Efeito de bolha animada */}
      {isLoadingPayment && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-4 h-4 bg-primary-base rounded-full mx-auto mt-2"
        />
      )}

      <p className="text-xs text-zinc-500">
        Ao clicar no botão acima, você declara concordar com nossos{" "}
        <Link
          href="/terms-of-service"
          target="_blank"
          className="text-primary-base hover:underline hover:underline-offset-2"
        >
          Termos de Serviço
        </Link>
        .
      </p>
    </div>
  );
}
