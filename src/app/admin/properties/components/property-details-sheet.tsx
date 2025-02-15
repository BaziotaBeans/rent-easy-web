import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdatePropertyStatus } from "@/services/hooks/use-property";
import { toast } from "sonner";
import { ChevronDown, Loader } from "lucide-react";
import { useState } from "react";
import { PropertyAllResponse } from "@/types/property-all";
import { Button } from "@/components/ui/button";
import { showPropertyStatusName } from "@/utils";

const PropertyDetailsSheet = ({
  property,
}: {
  property: PropertyAllResponse;
}) => {
  const [updating, setUpdating] = useState(false);
  const updatePropertyStatus = useUpdatePropertyStatus();

  const handleStatusChange = (newStatus: string) => {
    if (property.propertyStatus === "RENTED") {
      toast.error("Não é possível alterar o status de um imóvel alugado.");
      return;
    }

    setUpdating(true);
    updatePropertyStatus.mutate(
      { id: property.pkProperty, propertyStatus: newStatus },
      {
        onSettled: () => setUpdating(false),
        onSuccess: () => toast.success("Status atualizado com sucesso!"),
        onError: () => toast.error("Erro ao atualizar status."),
      }
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm flex items-center gap-2">Status</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={updating}>
              {updating ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                showPropertyStatusName(property.propertyStatus)
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["PUBLISHED", "STANDBY", "DENIED"].map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => handleStatusChange(status)}
              >
                {showPropertyStatusName(status)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
