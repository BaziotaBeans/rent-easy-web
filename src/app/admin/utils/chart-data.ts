import { PaymentResponse } from "@/types/payment";
import { PropertyAllResponse } from "@/types/property-all";
import { ScheduleResponse } from "@/types/schedule";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const MONTHS_PT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

// Função para agrupar dados por mês
export const groupDataByMonth = (data: any[], dateKey: string) => {
  const groupedData: { [key: string]: number } = {};

  data.forEach((item) => {
    const monthIndex = dayjs(item[dateKey]).month();
    const monthName = MONTHS_PT[monthIndex];
    groupedData[monthName] = (groupedData[monthName] || 0) + 1;
  });

  return groupedData;
};

// Função para gerar os dados do gráfico
export const generateChartData = (
  dataProperties: PropertyAllResponse[],
  dataPayments: PaymentResponse[],
  dataSchedulings: ScheduleResponse[]
) => {
  const propertiesByMonth = groupDataByMonth(dataProperties, "createdAt");
  const paymentsByMonth = groupDataByMonth(dataPayments, "createdAt");
  const schedulingsByMonth = groupDataByMonth(dataSchedulings, "createdAt");

  return MONTHS_PT.map((month) => ({
    name: month,
    properties: propertiesByMonth[month] || 0,
    payments: paymentsByMonth[month] || 0,
    schedulings: schedulingsByMonth[month] || 0,
  }));
};
