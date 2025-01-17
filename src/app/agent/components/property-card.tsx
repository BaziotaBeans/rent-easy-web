"use client";

import { Pencil, Trash2, Eye, Ratio } from "lucide-react";
import Image from "next/image";
import { BedDouble, Bath, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectPropertyStatus } from "./select-property-status";
import { PropertyDetailSheet } from "./property-detail/property-detail-sheet";
import { useState } from "react";
import { PropertyDeleteDialog } from "./property-delete-dialog";
import { PropertyResponse } from "@/types/property";
import { formatDateToLong } from "@/utils/date-formats";

//PropertyResponse

interface PropertyCardProps {
  data: PropertyResponse;
}

export function PropertyCard({ data }: PropertyCardProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const purposeType =
    data.property.fkPropertyTypeEntity.designation == "Arrendamento"
      ? "Arrendamento"
      : "Venda";

  return (
    <>
      <div className="flex flex-col bg-[#f6f8fa] rounded-xl">
        <div className="flex items-stretch gap-6 p-2 shadow-none transition-all bg-white rounded-xl border">
          <Image
            src={data.images[0].url}
            alt={data.property.title}
            width={100}
            height={100}
            className="object-cover w-[120px] h-[120px] rounded-lg"
          />
          <div className="flex flex-col flex-1 justify-between py-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-zinc-800 font-medium">
                  {data.property.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="bg-primary-base/10 text-primary-base self-start text-xs py-1 px-2 rounded-md mt-2 font-medium">
                    {purposeType}
                  </span>
                  <span className="bg-zinc-100 text-zinc-600 self-start text-xs py-1 px-2 rounded-md mt-2 font-medium">
                    {data.property.propertyType}
                  </span>
                </div>
              </div>

              <span className="text-sm text-zinc-500">
                {data.property.address}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {data.property.propertyType == "Terreno" ? (
                  <div className="flex items-center gap-2 text-xs text-zinc-600">
                    <Ratio className="w-4 h-4" />{" "}
                    <span className="bg-zinc-100 rounded-lg px-2 py-[2px]">
                      {data.property.totalArea}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <BedDouble className="w-4 h-4" />{" "}
                      <span className="bg-zinc-100 rounded-lg px-2 py-[2px]">
                        {data.property.room}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Bath className="w-4 h-4" />{" "}
                      <span className="bg-zinc-100 rounded-lg px-2 py-[2px]">
                        {data.property.bathroom}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <CarFront className="w-4 h-4" />{" "}
                      <span className="bg-zinc-100 rounded-lg px-2 py-[2px]">
                        {data.property.vacancy}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <Ratio className="w-4 h-4" />{" "}
                      <span className="bg-zinc-100 rounded-lg px-2 py-[2px]">
                        {data.property.totalArea}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <SelectPropertyStatus />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 px-4">
          <span className="text-xs text-zinc-600">
            Adicionado {formatDateToLong(data.property.createdAt)}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              className="flex items-center gap-2 text-sm px-2 font-normal text-zinc-600 hover:text-primary-base"
            >
              <Pencil className="w-4 h-4 " /> Editar
            </Button>

            <PropertyDetailSheet data={data}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 text-sm px-2 font-normal text-zinc-600 hover:text-primary-base"
              >
                <Eye className="w-4 h-4 " /> Visualizar
              </Button>
            </PropertyDetailSheet>

            <Button
              variant={"ghost"}
              onClick={() => setOpenDeleteDialog(true)}
              className="flex items-center gap-2 text-sm px-2 font-normal text-zinc-600 hover:text-primary-base"
            >
              <Trash2 className="w-4 h-4 " /> Deletar
            </Button>
          </div>
        </div>
      </div>

      <PropertyDeleteDialog
        open={openDeleteDialog}
        propertyTitle={data.property.title}
        onOpenChange={(state) => {
          setOpenDeleteDialog(state);
        }}
      />
    </>
  );
}
