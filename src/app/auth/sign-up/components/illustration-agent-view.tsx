import Image from "next/image";
import { Check } from "lucide-react";

const rentTextList = [
  {
    id: 1,
    text: "Gerencie seus imóveis e contratos de forma prática e centralizada.",
  },
  {
    id: 2,
    text: "Otimize seu tempo e maximize suas oportunidades com nosso sistema intuitivo.",
  },
  {
    id: 3,
    text: "Monitore suas propriedades em tempo real e simplifique sua rotina diária.",
  },
];

export function IllustrationViewUserAgent() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      <div className="bg-[#FECB2C] flex items-center justify-center">
        <Image
          src="/illustration-3.svg"
          alt=""
          width={200}
          height={200}
          className="object-cover max-w-96 w-full"
        />
      </div>
      <div className="bg-[#F5F5F5] flex flex-col py-12 px-9">
        <h1 className="text-zinc-600 font-bold text-lg">
          Seja um agente imóbiliário:
        </h1>

        <ul className="flex flex-col gap-4 mt-4">
          {rentTextList.map((item) => (
            <li
              className="grid grid-cols-[24px_1fr] items-start gap-2 text-sm font-medium text-zinc-500"
              key={`${item.id} - #`}
            >
              <Check className="w-6 h-6" /> {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
