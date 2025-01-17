import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertComponent() {
  return (
    <Alert className="bg-orange-100 [&>svg]:text-orange-600 border-none">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="text-orange-600">Alerta</AlertTitle>
      <AlertDescription className="font-medium text-orange-600">
        ATENÇÃO: Voce tem que pagar antes do tempo acabar. Após acabar o tempo,
        seu pedido será cancelado automaticamente.
      </AlertDescription>
    </Alert>
  );
}
