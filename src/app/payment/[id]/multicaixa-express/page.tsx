"use client";

import { MulticaixaEpxress } from "@/components/svg/multicaixa-express";
import { PaymentForm, PaymentFormRef } from "./components/payment-form";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { EmisSVG } from "@/components/svg/emis";
import { SecureSVG } from "@/components/svg/secure";
import { useLastOrder } from "@/services/hooks/use-order";
import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, isLoading } = useLastOrder();
  const paymentFormRef = useRef<PaymentFormRef>(null);
  const [loadingForm, setLoadingForm] = useState(false);

  if (isLoading) {
    return (
      <main className="h-full py-10">
        <div className="max-w-80 mx-auto flex flex-col items-center gap-6">
          <Skeleton className="w-[100px] h-[100px] rounded-full"/>
          <Skeleton className="w-[320px] h-[64px] rounded-md"/>
          <Skeleton className="w-[320px] h-[500px] rounded-md"/>
        </div>
      </main>
    );
  }

  const handleFinishPurchase = () => {
    setLoadingForm(true);

    setTimeout(() => {
      paymentFormRef.current?.submitForm();
    }, 1000); // Delay de 1 segundo para criar um efeito mais suave
  };

  return (
    <motion.main 
      className="h-full py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-80 mx-auto flex flex-col items-center gap-6">
        
        {/* Ícone com animação de leve entrada */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <MulticaixaEpxress />
        </motion.div>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl text-zinc-600 font-bold">Pague com Multicaixa Express</h1>
          <p className="text-sm text-zinc-600">
            Digite o seu número de telefone associado a tua conta express para ser reflectido o desconto, 
            em caso de dúvida clique aqui.
          </p>
        </div>

        <PaymentForm ref={paymentFormRef} data={data!} setLoadingForm={setLoadingForm}/>

        {/* Animação do resumo de pagamento */}
        <motion.ul 
          className="w-full flex flex-col gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <li className="flex items-center justify-between text-zinc-600">
            <span className="font-bold">Montante</span>
            <span className="font-bold">{formatPriceToKwanza(data!.property.price)}</span>
          </li>
          <li className="flex items-center justify-between text-zinc-600">
            <span className="text-sm">Referência</span>
            <span className="text-sm">{data?.reference}</span>
          </li>
          <li className="flex items-center justify-between text-zinc-600">
            <span className="text-sm">Tipo Item</span>
            <span className="text-sm">{data?.property.fkPropertyTypeEntity.designation}</span>
          </li>
        </motion.ul>

        {/* Botão animado */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="w-full font-bold relative"
            size={"lg"}
            variant={"primary"}
            onClick={handleFinishPurchase}
            disabled={loadingForm}
          >
            {loadingForm ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Processando...
              </>
            ) : (
              "Finalizar Compra"
            )}
          </Button>
        </motion.div>

        {/* Efeito de bolha pulsante abaixo do botão enquanto carrega */}
        {loadingForm && (
          <motion.div
            className="w-5 h-5 bg-primary-base rounded-full mt-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        {/* Rodapé com animação de fade-in */}
        <motion.footer 
          className="flex flex-col gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <EmisSVG size={100} />
          <p className="text-zinc-500 text-xs text-center">
            Informação tratada pela EMIS e não será fornecida ao comerciante.
          </p>

          <span className="text-xs flex items-center gap-3 text-zinc-500">
            <SecureSVG /> Suas informações estão seguras
          </span>
        </motion.footer>

      </div>
    </motion.main>
  );
}
