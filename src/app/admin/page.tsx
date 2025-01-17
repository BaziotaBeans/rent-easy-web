"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayments } from "@/services/hooks/use-payment";
import { useProperties } from "@/services/hooks/use-property";
import { useSchedulings } from "@/services/hooks/use-scheduling";
import { useUsers } from "@/services/hooks/use-users";
import { Payment } from "@/types/payment";
import { formatPriceToKwanza } from "@/utils/format-price";
import { Users, Home, CreditCard, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", properties: 4, payments: 24, users: 10 },
  { name: "Feb", properties: 3, payments: 13, users: 15 },
  { name: "Mar", properties: 2, payments: 18, users: 8 },
  { name: "Apr", properties: 6, payments: 27, users: 12 },
  { name: "May", properties: 8, payments: 34, users: 18 },
  { name: "Jun", properties: 5, payments: 29, users: 20 },
];

const recentPayments = [
  {
    id: 1,
    user: "João Silva",
    property: "Apt 101",
    amount: "R$ 1.500,00",
    date: "2024-03-20",
  },
  {
    id: 2,
    user: "Maria Santos",
    property: "Casa 202",
    amount: "R$ 2.200,00",
    date: "2024-03-19",
  },
  {
    id: 3,
    user: "Pedro Costa",
    property: "Sala 303",
    amount: "R$ 3.000,00",
    date: "2024-03-18",
  },
];


export default function AdminDashboard() {
  const { data: dataUsers, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers();
  const { data: dataProperties, isLoading: isLoadingProperties, isError: isErrorProperties } = useProperties();
  const { data: dataSchedulings, isLoading: isLoadingSchedulings, isError: isErrorSchedulings } = useSchedulings();
  const { data: dataPayments, isLoading: isLoadingPayments, isError: isErrorPayments } = usePayments();

  const totalUsers = dataUsers?.length || 0;
  const totalProperties = dataProperties?.length || 0;
  const totalSchedulings = dataSchedulings?.length || 0;
  const totalPayments = dataPayments?.reduce((acc: number, payment: Payment) => acc + payment.totalValue, 0) || 0;

  const stats = [
    { name: "Total de Usuários", value: totalUsers, icon: Users, color: "bg-blue-500", isLoading: isLoadingUsers, isError: isErrorUsers },
    { name: "Total de Imóveis", value: totalProperties, icon: Home, color: "bg-green-500", isLoading: isLoadingProperties, isError: isErrorProperties },
    { name: "Total de Pagamentos", value: formatPriceToKwanza(totalPayments), icon: CreditCard, color: "bg-yellow-500", isLoading: isLoadingPayments, isError: isErrorPayments },
    { name: "Total de Agendamentos", value: totalSchedulings, icon: Calendar, color: "bg-purple-500", isLoading: isLoadingSchedulings, isError: isErrorSchedulings },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                {stat.isLoading ? (
                  <Skeleton className="h-6 w-20 mt-2" />
                ) : stat.isError ? (
                  <p className="text-red-500">Erro ao carregar</p>
                ) : (
                  <p className="text-lg font-semibold">{stat.value}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Análise Comparativa</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="properties"
                stroke="hsl(var(--chart-1))"
                name="Imóveis"
              />
              <Line
                type="monotone"
                dataKey="payments"
                stroke="hsl(var(--chart-2))"
                name="Pagamentos"
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--chart-3))"
                name="Usuários"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Payments */}
      {/* <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Pagamentos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imóvel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card> */}
    </div>
  );
}
