import { ComponentType } from "react";
import { RiHomeSmile2Line } from "react-icons/ri";

interface PropertyType {
  value: "apartment" | "home" | "terrain" | "villa";
  title: string;
  description: string;
  icon?: ComponentType<{ size?: number; color?: string; className?: string }>;
}

interface PropertyPurpose {
  value: "rent" | "sell";
  title: string;
  description: string;
  icon?: ComponentType<{ size?: number; color?: string; className?: string }>;
}

export const propertyPurposes: PropertyPurpose[] = [
  {
    value: "rent",
    title: "Aluguel",
    description:
      "Disponibilize seu imóvel para locação e encontre inquilinos com facilidade.",
    icon: RiHomeSmile2Line,
  },
  {
    value: "sell",
    title: "Venda",
    description:
      "Anuncie seu imóvel para venda e conecte-se a potenciais compradores.",
    icon: RiHomeSmile2Line,
  },
];

export const propertyTypes: PropertyType[] = [
  {
    value: "apartment",
    title: "Apartamento",
    description:
      "Imóveis em edifícios para diferentes estilos de vida.",
    icon: RiHomeSmile2Line,
  },
  {
    value: "home",
    title: "Casa",
    description: "Espaços ideais para famílias em busca de conforto.",
    icon: RiHomeSmile2Line,
  },
  {
    value: "villa",
    title: "Vivenda",
    description: "Divulgue vivendas que oferecem estilo e privacidade.",
    icon: RiHomeSmile2Line,
  },
  {
    value: "terrain",
    title: "Terreno",
    description: "Lotes disponíveis para construção ou cultivo.",
    icon: RiHomeSmile2Line,
  },
];
// export const propertyTypes:
