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
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ComparativeChartProps {
  data: {
    name: string;
    schedulings: number;
    properties: number;
    payments: number;
  }[];
  isLoading: boolean;
}

export const ComparativeChart = ({
  data,
  isLoading,
}: ComparativeChartProps) => (
  <Card className="flex-1 p-6">
    <h2 className="text-lg font-semibold mb-4">Análise Comparativa</h2>
    <div className="h-[400px]">
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
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
              dataKey="schedulings"
              stroke="hsl(var(--chart-3))"
              name="Agendamentos"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  </Card>
);
