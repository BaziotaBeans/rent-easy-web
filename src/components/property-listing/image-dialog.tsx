"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ImageGallery from "./image-gallery";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  selectedIndex: number;
}

export default function ImageDialog({
  open,
  onOpenChange,
  images,
  selectedIndex,
}: ImageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-md" hideCloseButton>
        <DialogTitle className="sr-only">Image Gallery</DialogTitle>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-2 z-50"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </Button>
        <ImageGallery
          images={images}
          initialIndex={selectedIndex}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
