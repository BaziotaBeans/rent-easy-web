"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle: string;
}

export function PropertyDeleteDialog({
  open,
  onOpenChange,
  propertyTitle,
}: Props) {
  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (value.trim() !== propertyTitle) return;

    onOpenChange(false);
    toast({
      title: "The following user has been deleted:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(propertyTitle, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
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
            Are you sure you want to delete{" "}
            <span className="font-bold">{propertyTitle}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className="font-bold">{propertyTitle}</span> from the system.
            This cannot be undone.
          </p>

          <Label className="my-2">
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter username to confirm deletion."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
