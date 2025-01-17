import { FaCircleCheck } from "react-icons/fa6";

interface ContractStatusProps {
  type: "active" | "inactive" | "pending";
}

export function ContractStatus({ type }: ContractStatusProps) {
  const statusClassName =
    type === "active"
      ? "bg-green-600/10 text-green-600"
      : type === "inactive"
      ? "bg-red-600 text-red-600"
      : "bg-zinc-600/10 text-zinc-600";

  const statusBgClassName =
    type === "active"
      ? "bg-green-600"
      : type === "inactive"
      ? "bg-red-600"
      : "bg-zinc-600";

  const label =
    type === "active"
      ? "Activo"
      : type === "inactive"
      ? "Inactivo"
      : "Pendente";

  return (
    <div className={`absolute top-4 right-4 flex items-center gap-2 py-1 px-2 rounded-2xl text-sm font-medium ${statusClassName}`}>
      <FaCircleCheck /> {label}
    </div>
  );
}
