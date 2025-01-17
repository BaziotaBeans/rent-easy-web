import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCountDownTimeToPay = (expirationDate: string) => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!expirationDate) return;

    const countDownDate = new Date(expirationDate).getTime();

    // ⚡ Inicializa o tempo restante imediatamente
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance > 0) {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setMinute(minutes);
        setSecond(seconds);
        setRemainingTime(Math.floor(distance / 1000));
      } else {
        clearInterval(interval);
        setMinute(0);
        setSecond(0);
        setRemainingTime(0);

        toast.error("O tempo para pagamento expirou!");

        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    };

    updateTimer(); // 🔥 Chama imediatamente para evitar delay

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

  return { minute, second, remainingTime };
};
