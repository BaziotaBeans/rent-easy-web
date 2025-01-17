"use client"

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { OrderResponse } from "@/types/order";
import { useRouter } from "next/navigation";

interface TimerLeft {
  data: OrderResponse;
}

export function TimerLeft({ data }: TimerLeft) {
  const router = useRouter();
  
  // 1️⃣ - Cálculo do tempo total em segundos
  const calculateTotalDuration = () => {
    const expiration = new Date(data.expirationDate).getTime();
    const createdAt = new Date(data.createdAt).getTime();
    const difference = (expiration - createdAt) / 1000;
    return Math.max(Math.floor(difference), 1); // Evitar divisão por zero
  };

  // 2️⃣ - Cálculo do tempo restante em segundos
  const calculateTimeLeft = () => {
    const expiration = new Date(data.expirationDate).getTime();
    const now = new Date().getTime();
    const difference = (expiration - now) / 1000;
    return Math.max(Math.floor(difference), 0); // Evitar valores negativos
  };

  const totalDuration = calculateTotalDuration(); // Tempo total da contagem
  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft());
  const [progress, setProgress] = useState<number>(100);

  // 3️⃣ - Atualização contínua do tempo e progresso
  useEffect(() => {
    if (timeLeft <= 0) {
      // ⏰ Quando o tempo expira
      toast("O tempo para confirmação do pagamento expirou!");
      router.push("/"); // 🔄 Redireciona para a Home
      return;
    }

    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Atualiza o progresso com base no tempo restante
      const newProgress = (newTimeLeft / totalDuration) * 100;
      setProgress(newProgress);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [totalDuration]);

  // 4️⃣ - Formatação do tempo em MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // 5️⃣ - Configuração do círculo de progresso
  const circumference = 2 * Math.PI * 45; // Raio = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 p-4">
        <div className="relative flex justify-center">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-express-black"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className="text-white transition-all duration-500"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-white">
            {formatTime(timeLeft)}
          </span>
        </div>

        <span className="text-sm font-semibold text-white">
          Confirme o pagamento no seu telemóvel.
        </span>
      </div>
      <div className="w-full h-2 bg-express-black" />
    </div>
  );
}
