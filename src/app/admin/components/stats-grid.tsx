import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Home, CreditCard, Calendar } from "lucide-react";
import { formatPriceToKwanza } from "@/utils/format-price";

interface StatItem {
  name: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  isLoading: boolean;
  isError: boolean;
}

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => (
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
);
