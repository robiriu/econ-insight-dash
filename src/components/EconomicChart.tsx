import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EconomicData {
  date: string;
  inflation: number;
  interest_rate: number;
  forex_reserves: number;
  transactions: number;
}

interface EconomicChartProps {
  data: EconomicData[];
  type: 'line' | 'bar';
  title: string;
  dataKey: string | string[];
  color?: string;
}

export default function EconomicChart({ data, type, title, dataKey, color }: EconomicChartProps) {
  const formatTooltipValue = (value: number, name: string) => {
    if (name.includes('rate') || name.includes('inflation')) {
      return [`${value}%`, name.replace('_', ' ').toUpperCase()];
    }
    if (name.includes('reserves') || name.includes('transactions')) {
      return [`$${(value / 1000000).toFixed(1)}M`, name.replace('_', ' ').toUpperCase()];
    }
    return [value.toLocaleString(), name.replace('_', ' ').toUpperCase()];
  };

  const formatYAxisTick = (value: number, dataKey: string) => {
    if (dataKey.includes('rate') || dataKey.includes('inflation')) {
      return `${value}%`;
    }
    if (dataKey.includes('reserves') || dataKey.includes('transactions')) {
      return `$${(value / 1000000).toFixed(0)}M`;
    }
    return value.toLocaleString();
  };

  if (type === 'line') {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => formatYAxisTick(value, Array.isArray(dataKey) ? dataKey[0] : dataKey)}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              {Array.isArray(dataKey) ? (
                dataKey.map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={index === 0 ? "hsl(var(--chart-inflation))" : "hsl(var(--chart-interest))"}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                ))
              ) : (
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color || "hsl(var(--primary))"}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => formatYAxisTick(value, Array.isArray(dataKey) ? dataKey[0] : dataKey)}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            {Array.isArray(dataKey) ? (
              dataKey.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={index === 0 ? "hsl(var(--chart-reserves))" : "hsl(var(--chart-transactions))"}
                  radius={[4, 4, 0, 0]}
                />
              ))
            ) : (
              <Bar
                dataKey={dataKey}
                fill={color || "hsl(var(--primary))"}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}