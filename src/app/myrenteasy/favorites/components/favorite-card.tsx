import { MapPin, BedDouble, Bath, CarFront } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "./favorite-button";

export function FavoriteCard() {
  return (
    <Link
      href=""
      className="w-full relative flex flex-col gap-1 overflow-hidden transition-all cursor-pointer"
    >
      <FavoriteButton />
      <Image
        src="/img-1.png"
        className="w-full h-full object-cover rounded-2xl transition-all"
        width={150}
        height={150}
        alt=""
        priority
      />

      <h3 className="text-sm font-medium">Apartamento Kilamba T3</h3>

      <span className="text-xs text-zinc-600">
        Luanda, Nova Vida rua #123, port 456
      </span>
      {/* <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <BedDouble className="w-4 h-4" /> 2
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Bath className="w-4 h-4" /> 2
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CarFront className="w-4 h-4" /> 2
        </div>
      </div> */}
    </Link>
  );
}
