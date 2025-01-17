import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropertyDetailSheetContent } from "./property-detail-sheet-content";
import { PropertyResponse } from "@/types/property";

interface PropertyDetailSheetProps {
  children: React.ReactNode;
  data: PropertyResponse
}

export function PropertyDetailSheet({ children, data }: PropertyDetailSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:max-w-screen-lg flex flex-col p-0 gap-0">
        <SheetHeader className="p-4">
          <SheetTitle>Detalhes do imóvel</SheetTitle>
        </SheetHeader>
        <SheetDescription className="sr-only">{data.property.description}</SheetDescription>
        <Separator />
        <div className="overflow-y-auto py-2 px-4">
          <PropertyDetailSheetContent data={data}/>
        </div>
      </SheetContent>
    </Sheet>
  );
}
