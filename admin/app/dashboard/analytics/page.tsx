'use client';

import { Card } from '@/components/ui/card';
import { analyticsData } from '@/lib/mock-data';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Platform insights and performance metrics</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Peak Hours</h2>
            <p className="text-sm text-muted-foreground">Customer bookings by time of day</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="hour" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="customers" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Customer Satisfaction */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Customer Satisfaction</h2>
            <p className="text-sm text-muted-foreground">Distribution of customer ratings</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={analyticsData.customerSatisfaction}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 100, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis type="number" stroke="currentColor" opacity={0.6} />
              <YAxis type="category" dataKey="rating" stroke="currentColor" opacity={0.6} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Avg. Rating</h3>
          <p className="text-3xl font-bold text-foreground mb-4">4.6/5.0</p>
          <div className="text-sm text-emerald-600 dark:text-emerald-400">+0.2 from last month</div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Avg. Response Time</h3>
          <p className="text-3xl font-bold text-foreground mb-4">2.3 min</p>
          <div className="text-sm text-emerald-600 dark:text-emerald-400">-0.5 min improvement</div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Cancellation Rate</h3>
          <p className="text-3xl font-bold text-foreground mb-4">9.8%</p>
          <div className="text-sm text-destructive">+1.2% from last month</div>
        </Card>
      </div>
    </div>
  );
}
