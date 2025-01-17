import { Bed, Bath, Car, Scan, SquareDashed, Toilet } from "lucide-react";

interface PropertyFeaturesProps {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  suits: number;
  area: number;
  type: string | null;
}

export default function PropertyFeatures({
  bedrooms,
  bathrooms,
  parking,
  suits,
  area,
  type,
}: PropertyFeaturesProps) {
  return (
    <div className="flex flex-wrap gap-6 text-zinc-600">
      {type == "Terreno" ? (
        <div className="flex items-center gap-2">
          <Scan className="w-5 h-5" />
          <span>{area} Área de construção</span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            <span className="text-sm">{bedrooms} Quarto</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5" />
            <span>{bathrooms} banheiro</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            <span>{parking} vaga</span>
          </div>
          <div className="flex items-center gap-2">
            <Toilet className="w-5 h-5" />
            <span>{suits} Suites</span>
          </div>
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5" />
            <span>{area} Área de construção</span>
          </div>
        </>
      )}
    </div>
  );
}
