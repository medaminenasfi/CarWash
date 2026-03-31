'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
}

export default function RevenueChart({ data }: { data: RevenueDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
        <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
        <YAxis stroke="currentColor" opacity={0.6} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
