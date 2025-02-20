import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type CountyRentedData = {
  county: string;
  count: number;
};

interface CountyRentedChartProps {
  data: CountyRentedData[];
  selectedMostRentOrSold: "Rent" | "Sold" | undefined;
  setSelectedMostRentOrSold: Dispatch<
    SetStateAction<"Rent" | "Sold">
  >;
}

const CountyRentedChart = ({
  data,
  selectedMostRentOrSold,
  setSelectedMostRentOrSold,
}: CountyRentedChartProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Alugueres e Compras por municípios
        </h2>

        <div className="flex items-center gap-2 rounded-lg">
          <Button
            variant={
              selectedMostRentOrSold == "Rent" ? "primary" : "outline-primary"
            }
            onClick={() => setSelectedMostRentOrSold('Rent')}
          >
            Aluguel
          </Button>
          <Button
            variant={
              selectedMostRentOrSold == "Sold" ? "primary" : "outline-primary"
            }
            onClick={() => setSelectedMostRentOrSold('Sold')}
          >
            Compra
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="county" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value}`, "Quantidade"]} // Personaliza o Tooltip
            labelFormatter={(label: string) => `Município: ${label}`}
          />
          <Legend formatter={() => "Quantidade"} />
          <Bar dataKey="count" fill="#6A4CFF" label={"Quantidade"} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CountyRentedChart;
