import Image from "next/image";
import { Check } from "lucide-react";

const rentTextList = [
  {
    id: 1,
    text: "Continue sua busca de forma fácil e rápida, de qualquer dispositivo e a qualquer hora.",
  },
  {
    id: 2,
    text: "Imóveis ao seu alcance. Sem burocracia, sem stress.",
  },
  {
    id: 3,
    text: "Sua próxima casa está a apenas alguns cliques de distância.",
  },
];

export function IllustrationViewUserNormal() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      <div className="bg-[#FECB2C] flex items-center justify-center">
        <Image
          src="/illustration-1.svg"
          alt=""
          width={200}
          height={200}
          className="object-cover max-w-96 w-full"
        />
      </div>
      <div className="bg-[#F5F5F5] flex flex-col py-12 px-9">
        <h1 className="text-zinc-600 font-bold text-lg">
          Encontre o imóvel dos seus sonhos:
        </h1>

        <ul className="flex flex-col gap-4 mt-4">
          {rentTextList.map((item) => (
            <li
              className="grid grid-cols-[24px_1fr] items-start gap-2 text-sm font-medium text-zinc-500"
              key={`${item.id} - #`}
            >
              <Check className="w-6 h-6"/> {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
