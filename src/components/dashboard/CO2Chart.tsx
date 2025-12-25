import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", co2: 120 },
  { month: "Feb", co2: 180 },
  { month: "Mar", co2: 250 },
  { month: "Apr", co2: 310 },
  { month: "May", co2: 420 },
  { month: "Jun", co2: 550 },
  { month: "Jul", co2: 680 },
  { month: "Aug", co2: 820 },
  { month: "Sep", co2: 970 },
  { month: "Oct", co2: 1150 },
  { month: "Nov", co2: 1340 },
  { month: "Dec", co2: 1520 },
];

export function CO2Chart() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Real-time CO₂ Reduction</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Cumulative tons offset this year
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 text-emerald text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+32.4%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220, 20%, 88%)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(220, 15%, 45%)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(220, 15%, 45%)", fontSize: 12 }}
                tickFormatter={(value) => `${value}t`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 60%, 8%)",
                  border: "none",
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "hsl(220, 20%, 80%)", fontWeight: 500 }}
                itemStyle={{ color: "hsl(160, 84%, 45%)" }}
                formatter={(value: number) => [`${value} tons`, "CO₂ Reduced"]}
              />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="hsl(160, 84%, 39%)"
                strokeWidth={3}
                fill="url(#co2Gradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "hsl(160, 84%, 39%)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Current Total</span>
          <span className="font-bold text-2xl text-emerald">1,520 tons</span>
        </div>
      </CardContent>
    </Card>
  );
}
