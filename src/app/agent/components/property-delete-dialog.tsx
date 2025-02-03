"use client";

import { useState } from "react";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { usePropertyDelete } from "@/services/hooks/use-property";
import { PropertyResponse } from "@/types/property";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle: string;
  data: PropertyResponse;
}

export function PropertyDeleteDialog({
  open,
  onOpenChange,
  propertyTitle,
  data,
}: Props) {
  const [value, setValue] = useState("");

  const [isLoadingDeleteProperty, setIsLoadingDeleteProperty] = useState(false);

  const { mutateAsync: deleteProperty } = usePropertyDelete();

  const handleDelete = async () => {
    if (value.trim() !== propertyTitle) return;

    setIsLoadingDeleteProperty(true);
    try {
      await deleteProperty(data.property.pkProperty);
      toast.success("Imóvel excluído com sucesso.");
    } catch (error) {
      toast.error("Não foi possível excluir o imóvel. Tente novamente.");
    } finally {
      onOpenChange(false);
      setIsLoadingDeleteProperty(false);
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      isLoading={isLoadingDeleteProperty}
      disabled={value.trim() !== propertyTitle}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete User
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Tem certeza de que deseja excluir{" "}
            <span className="font-bold">{propertyTitle}</span>?
            <br />
            Esta ação removerá permanentemente o imóvel com o nome de{" "}
            <span className="font-bold">{data.property.title}</span> do sistema.
            Isto não pode ser desfeito.
          </p>

          <Label className="my-2">
            Título do imóvel:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Digite o título do imóvel para a exlusão"
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Aviso!</AlertTitle>
            <AlertDescription>
              Tenha cuidado, esta operação não pode ser revertida.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
