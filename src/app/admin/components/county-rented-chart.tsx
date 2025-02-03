import { Card } from "@/components/ui/card";
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
}

const CountyRentedChart: React.FC<CountyRentedChartProps> = ({ data }) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Municípios que mais alugaram
      </h2>

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
          <Legend formatter={() => "Quantidade"}/>
          <Bar dataKey="count" fill="#6A4CFF" label={"Quantidade"} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CountyRentedChart;
