import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface PomodoroStatsProps {
  chartData: any[];
}

const chartConfig = {
  activated: {
    label: "활성화 횟수",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "완료 횟수",
    color: "hsl(var(--chart-2))",
  },
};

export function PomodoroStats({ chartData }: PomodoroStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>주간 포모도로 통계</CardTitle>
        <CardDescription>지난 주 타이머 활성화 및 완료 횟수</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="activated" fill="var(--color-activated)" radius={4} />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
