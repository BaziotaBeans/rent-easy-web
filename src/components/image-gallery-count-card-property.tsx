import { GalleryIcon } from "./svg/gallery-icon";

interface ImageGalleryCountCardPropertyProps {
  quantity: number;
}

export function ImageGalleryCountCardProperty({
  quantity,
}: ImageGalleryCountCardPropertyProps) {
  return (
    <span className="bg-primary-base/40 text-sm font-medium rounded-md text-white flex items-center gap-2  px-1 absolute bottom-2 right-2">
      <GalleryIcon size={16}/> {quantity}
    </span>
  );
}
