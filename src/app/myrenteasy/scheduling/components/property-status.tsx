interface PropertyStatusProps {
  type: "active" | "inactive" | "pending";
}

export function PropertyStatus({ type }: PropertyStatusProps) {
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
    <span
      className={`flex items-center gap-2 px-2 py-[2px] rounded-sm font-semibold text-xs ${statusClassName}`}
    >
      {" "}
      <div className={`w-1.5 h-1.5 rounded-sm ${statusBgClassName}`} /> {label}
    </span>
  );
}
