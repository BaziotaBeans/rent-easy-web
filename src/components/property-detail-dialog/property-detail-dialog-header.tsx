'use client'

import { usePropertyDetailDialog } from "@/store/usePropertyDetailDialog";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch } from "react";
import { IoMdShareAlt } from "react-icons/io";

export function PropertyDetailDialogHeader() {
  const { onClose } = usePropertyDetailDialog();

  return (
    <div 
      className="sticky top-0 z-10 w-full p-4 bg-white"
      // className="sticky top-0 z-10 w-full p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="flex items-center justify-between">
        <div className="flex-1">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-zinc-600 hover:underline hover:underline-offset-2"
          >
            <ChevronLeft /> Voltar para pesquisar
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Link href="/">
            <Image
              src="/RentEasy.png"
              alt=""
              className="object-cover h-9 select-none"
              width={120}
              height={36}
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-end">
          <button className="flex items-center gap-2 text-sm text-zinc-600 hover:underline hover:underline-offset-2">
            <IoMdShareAlt className="w-5 h-5" /> Partilhar
          </button>
        </div>
      </nav>
    </div>
  );
}
