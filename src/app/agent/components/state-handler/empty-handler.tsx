import { Button } from "@/components/ui/button";
import { FolderOpen, RefreshCw } from "lucide-react";

interface StateEmptyHandler {
  onRetry: () => void;
}

export function EmptyHandler({ onRetry }: StateEmptyHandler) {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center gap-4">
      <FolderOpen className="w-16 h-16 text-zinc-400" />
      <h2 className="text-2xl font-semibold text-zinc-600">
        Nenhum imóvel encontrado.
      </h2>
      <p className="text-zinc-500">
        Clique no botão abaixo para adicionar um novo imóvel.
      </p>
      <Button onClick={onRetry} className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> Recarregar
      </Button>
    </main>
  );
}
