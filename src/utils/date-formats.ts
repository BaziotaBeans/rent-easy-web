import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Formata a data no formato DD/MM/YYYY
 * @param date - String de data ou null
 * @returns Data formatada ou "Data não disponível"
 */
export function formatDate(date: string | null): string {
  if (!date) {
    return "---";
  }

  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "dd/MM/yyyy");
  } catch (error) {
    return "---";
  }
}

/**
 * Formata uma data para o formato: "09 Janeiro, 2025"
 * @param dateString - Data em formato ISO (Ex: "2025-01-09T18:39:41.079292")
 * @returns Data formatada como string
 */
export const formatDateToLong = (dateString: string): string => {
  return format(new Date(dateString), "dd 'de' MMMM, yyyy", { locale: ptBR });
};

export function showWeekDay(weekDay: string): string {
  const weekDayMap: Record<string, string> = {
    MONDAY: "Segunda-feira",
    TUESDAY: "Terça-feira",
    WEDNESDAY: "Quarta-feira",
    THURSDAY: "Quinta-feira",
    FRIDAY: "Sexta-feira",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
    "Terça-feira": "TUESDAY", // Corrigi o mapeamento inverso adicionado incorretamente
  };

  return weekDayMap[weekDay] || "Dia inválido";
}

// export function getWeekDay(weekDay: string): string {
//   const weekDayMap: Record<string, string> = {
//     "Segunda-feira": "MONDAY",
//     "Terça-feira": "TUESDAY",
//     "Quarta-feira": "WEDNESDAY",
//     "Quinta-feira": "THURSDAY",
//     "Sexta-feira": "FRIDAY",
//     "Sábado": "SATURDAY",
//     "Domingo": "SUNDAY",
//   };

//   return weekDayMap[weekDay] || "INVALID_DAY";
// }

export function getWeekDay(weekDay: string): string {
  if (weekDay == "Segunda-feira") {
    return "MONDAY";
  } else if (weekDay == "Terça-feira") {
    return "TUESDAY";
  } else if (weekDay == "Quarta-feira") {
    return "WEDNESDAY";
  } else if (weekDay == "Quinta-feira") {
    return "THURSDAY";
  } else if (weekDay == "Sexta-feira") {
    return "FRIDAY";
  } else if (weekDay == "Sábado") {
    return "SATURDAY";
  }
  return "SUNDAY";
}

// Função para converter o array de horários
export function convertWeekDays(
  schedules: { dayOfWeek: string; startTime: string; endTime: string }[]
): { dayOfWeek: string; startTime: string; endTime: string }[] {
  return schedules.map((schedule) => ({
    dayOfWeek: getWeekDay(schedule.dayOfWeek), // Converte o dia da semana
    startTime: schedule.startTime,
    endTime: schedule.endTime,
  }));
}

export function formatUpdatedAt(dateString: string): string {
  const updatedDate = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - updatedDate.getTime();

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0) {
    return `Actualizada há ${diffInYears} ${diffInYears === 1 ? "ano" : "anos"} atrás`;
  } else if (diffInMonths > 0) {
    return `Actualizada há ${diffInMonths} ${diffInMonths === 1 ? "mês" : "meses"} atrás`;
  } else if (diffInDays > 0) {
    return `Actualizada há ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"} atrás`;
  } else if (diffInHours > 0) {
    return `Actualizada há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"} atrás`;
  } else if (diffInMinutes > 0) {
    return `Actualizada há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"} atrás`;
  } else {
    return "Actualizada há alguns segundos atrás";
  }
}