"use client";

import { useMemo, useState } from "react";
import { usePayments } from "@/services/hooks/use-payment";
import { useProperties } from "@/services/hooks/use-property";
import { useSchedulings } from "@/services/hooks/use-scheduling";
import { useUsers } from "@/services/hooks/use-users";
import { PaymentResponse } from "@/types/payment";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Users, Home, CreditCard, Calendar } from "lucide-react";
import { StatsGrid } from "./components/stats-grid";
import { ComparativeChart } from "./components/comparative-chart";
import { generateChartData } from "./utils/chart-data";
import { PropertyAllResponse } from "@/types/property-all";
import CountyRentedChart from "./components/county-rented-chart";
import PropertyTypeRadarChart from "./components/property-type-radar-chart";

export default function AdminDashboard() {
  const [selectedMostRentOrSold, setSelectedMostRentOrSold] = useState<
    "Rent" | "Sold"
  >("Rent");
  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useUsers();
  const {
    data: dataProperties,
    isLoading: isLoadingProperties,
    isError: isErrorProperties,
  } = useProperties();
  const {
    data: dataSchedulings,
    isLoading: isLoadingSchedulings,
    isError: isErrorSchedulings,
  } = useSchedulings();
  const {
    data: dataPayments,
    isLoading: isLoadingPayments,
    isError: isErrorPayments,
  } = usePayments();

  const totalUsers = dataUsers?.length || 0;
  const totalProperties = dataProperties?.length || 0;
  const totalSchedulings = dataSchedulings?.length || 0;
  const totalPayments =
    dataPayments?.reduce(
      (acc: number, payment: PaymentResponse) => acc + payment.totalValue,
      0
    ) || 0;

  const stats = [
    {
      name: "Total de Usuários",
      value: totalUsers,
      icon: Users,
      color: "bg-blue-500",
      isLoading: isLoadingUsers,
      isError: isErrorUsers,
    },
    {
      name: "Total de Imóveis",
      value: totalProperties,
      icon: Home,
      color: "bg-green-500",
      isLoading: isLoadingProperties,
      isError: isErrorProperties,
    },
    {
      name: "Total de Pagamentos",
      value: formatPriceToKwanza(totalPayments),
      icon: CreditCard,
      color: "bg-yellow-500",
      isLoading: isLoadingPayments,
      isError: isErrorPayments,
    },
    {
      name: "Total de Agendamentos",
      value: totalSchedulings,
      icon: Calendar,
      color: "bg-purple-500",
      isLoading: isLoadingSchedulings,
      isError: isErrorSchedulings,
    },
  ];

  const chartData = useMemo(() => {
    return generateChartData(
      dataProperties || [],
      dataPayments || [],
      dataSchedulings || []
    );
  }, [dataProperties, dataPayments, dataSchedulings]);

  const rentedPropertiesByCounty = useMemo(() => {
    if (!dataProperties) return [];

    let rentedProperties;

    if (selectedMostRentOrSold == "Rent") {
      rentedProperties = dataProperties.filter(
        (property: PropertyAllResponse) =>
          property.propertyStatus === "RENTED" &&
          property.fkPropertyTypeEntity.designation === "Arrendamento"
      );
    } else {
      rentedProperties = dataProperties.filter(
        (property: PropertyAllResponse) =>
          (property.propertyStatus === "RENTED" &&
            (property.fkPropertyTypeEntity.designation === "Venda") ||
          property.fkPropertyTypeEntity.designation === "Terreno")
      );
    }

    // Filtrar imóveis alugados
    // const rentedProperties = dataProperties.filter(
    //   (property: PropertyAllResponse) =>
    //     property.propertyStatus === "RENTED" &&
    //     property.fkPropertyTypeEntity.designation === "Arrendamento"
    // );

    // Agrupar por município e contar
    const countyCounts = rentedProperties.reduce(
      (acc: Record<string, number>, property: PropertyAllResponse) => {
        const county = property.county;
        acc[county] = (acc[county] || 0) + 1;
        return acc;
      },
      {}
    );

    // Transformar em array para o gráfico
    return Object.entries(countyCounts).map(([county, count]) => ({
      county,
      count,
    }));
  }, [dataProperties, selectedMostRentOrSold]);

  const propertyTypeData = useMemo(() => {
    if (!dataProperties) return [];

    // Agrupar por propertyType e contar
    const propertyTypeCounts = dataProperties.reduce(
      (acc: Record<string, number>, property: PropertyAllResponse) => {
        const propertyType = property.propertyType;
        acc[propertyType] = (acc[propertyType] || 0) + 1;
        return acc;
      },
      {}
    );

    // Transformar em array para o gráfico
    return Object.entries(propertyTypeCounts).map(([propertyType, count]) => ({
      propertyType,
      count,
    }));
  }, [dataProperties]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* <p className="text-sm">Olá, </p> */}
      <StatsGrid stats={stats} />

      <div className="flex items-stretch gap-4">
        <ComparativeChart
          data={chartData}
          isLoading={
            isLoadingProperties || isLoadingPayments || isLoadingSchedulings
          }
        />
        <PropertyTypeRadarChart data={propertyTypeData} />
      </div>

      <CountyRentedChart
        data={rentedPropertiesByCounty}
        selectedMostRentOrSold={selectedMostRentOrSold}
        setSelectedMostRentOrSold={setSelectedMostRentOrSold}
      />
    </div>
  );
}
