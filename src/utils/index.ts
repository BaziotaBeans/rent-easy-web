import { isBefore, parseISO } from "date-fns";
import { PropertyResponse } from "@/types/property";
import { DayOfWeek } from "@/types/schedule";
import { appConstant } from "./constant";

export type DayTranslations = Record<DayOfWeek, string>;

export const translations: DayTranslations = {
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export const translateDayOfWeek = (day: DayOfWeek): string => {
  return translations[day];
};

export const formatTime = (time: string): string => {
  return time.substring(0, 5);
};

export const getTotalValueToPaidInProperty = ({
  data,
}: {
  data: PropertyResponse;
}) => {
  if (
    appConstant.propertyTypeGround == data.property.fkPropertyType ||
    appConstant.propertyTypeSale == data.property.fkPropertyType
  ) {
    return data.property.price;
  } else if (data.property.paymentModality == "Mensal") {
    return data.property.price;
  } else if (data.property.paymentModality == "Trimestral") {
    return data.property.price * 3;
  } else if (data.property.paymentModality == "Semestral") {
    return data.property.price * 6;
  }
  return data.property.price * 12;
};

export const checkIfValidContract = (
  propertyType: string,
  endDate: string | null
): boolean => {
  if (propertyType == "Venda" || propertyType == "Terreno" || !endDate)
    return true;

  const parsedEndDate = parseISO(endDate);
  const currentDate = new Date();

  return !isBefore(parsedEndDate, currentDate);
};

export const getPropertyType = (type: string) => {
  if (type == "apartment") return "Apartamento";
  if (type == "home") return "Casa";
  if (type == "villa") return "Vivenda";
  return "Terreno";
};

// export const getWeekDay(String )

export const checkIfPropertyTypeIsSelected = (value: string) => {
  return ["apartment", "home", "terrain", "villa"].includes(value);
};


/**
 * Verifica se um array está vazio.
 * @param arr - O array a ser verificado.
 * @returns Retorna `true` se o array estiver vazio, caso contrário, retorna `false`.
 */
export function isArrayEmpty<T>(arr: T[]): boolean {
  return arr.length === 0;
}

export function generateRandomReference(): string {
  const leftLimit = 48; // Código ASCII para '0'
  const rightLimit = 57; // Código ASCII para '9'
  const targetStringLength = 9;

  const randomReference = Array.from({ length: targetStringLength }, () => {
    // Gera um número aleatório entre o limite inferior e superior (inclusivo)
    const randomCharCode = Math.floor(
      Math.random() * (rightLimit - leftLimit + 1) + leftLimit
    );
    return String.fromCharCode(randomCharCode); // Converte o código para um caractere
  }).join("");

  return randomReference;
}

export function showPropertyStatusName(role: string): string {
  if (role === 'PUBLISHED') return 'Disponível';
  if (role === 'RENTED') return 'Indisponível';
  return 'Pendente';
}