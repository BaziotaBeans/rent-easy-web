import { useCountDownTimeToPay } from "@/hooks/use-countdown-time-to-pay";
import { Clock } from "lucide-react";

interface OrderTimeTagProps {
  expirationDate: string;
}

export function OrderTimeTag({ expirationDate }: OrderTimeTagProps) {
  const { minute, second } =
    useCountDownTimeToPay(expirationDate);

  const minutes = String(minute).padStart(2, "0");
  const seconds = String(second).padStart(2, "0");

  return (
    <span className="bg-orange-100 text-orange-600 rounded-full flex items-center self-start gap-2 text-xs font-medium py-1 px-2">
      <Clock className="w-4 h-4" />
      {minutes[0]}
      {minutes[1]}:{seconds[0]}
      {seconds[1]}
    </span>
  );
}
