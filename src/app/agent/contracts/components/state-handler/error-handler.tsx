import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorHandler({ onRetry }: ErrorStateProps) {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center gap-4">
      <h2 className="text-2xl font-semibold text-red-600">
        Ocorreu um erro ao carregar os imóveis.
      </h2>
      <p className="text-zinc-600">
        Tente novamente ou verifique sua conexão com a internet.
      </p>
      <Button onClick={onRetry} className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> Tentar Novamente
      </Button>
    </main>
  );
}
