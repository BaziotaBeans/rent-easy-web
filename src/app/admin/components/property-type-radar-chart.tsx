import { TrendingUp } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip, // Adicionamos o Tooltip
} from "recharts";
import { Card, CardFooter } from "@/components/ui/card";

type PropertyTypeData = {
  propertyType: string;
  count: number;
};

interface PropertyTypeRadarChartProps {
  data: PropertyTypeData[];
}

const PropertyTypeRadarChart: React.FC<PropertyTypeRadarChartProps> = ({
  data,
}) => {
  console.log(data);

  return (
    <Card className="p-6 max-w-96">
      <h2 className="text-lg font-semibold mb-4">
        Distribuição Por Tipo de Propriedade
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="propertyType" />
          <PolarRadiusAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                    <p className="font-semibold">
                      {payload[0].payload.propertyType}
                    </p>
                    <p>Quantidade: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Radar
            name="Quantidade"
            dataKey="count"
            stroke="#6A4CFF"
            fill="#6A4CFF"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="flex gap-2 font-medium leading-none mb-2">
        Resumo das distribuições <TrendingUp className="h-4 w-4" />
      </div>

      <CardFooter className="flex items-center gap-2 p-0 flex-wrap">
        {data.map((item) => (
          <div
            className="flex items-center gap-2 flex-wrap"
            key={item.propertyType}
          >
            <div className="w-2 h-2 rounded-sm bg-primary-base" />
            <span className="text-sm">
              {item.propertyType}: {item.count}
            </span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default PropertyTypeRadarChart;
