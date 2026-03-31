'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, Users, MapPin, DollarSign, Calendar } from 'lucide-react';
import { dashboardStats, revenueData, reservationsByStatus, topCenters } from '@/lib/mock-data';
import RevenueChart from '@/components/dashboard/charts/revenue-chart';
import ReservationChart from '@/components/dashboard/charts/reservation-chart';
import TopCentersWidget from '@/components/dashboard/widgets/top-centers';

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  growth: number;
  bgColor: string;
  iconColor: string;
}

const stats: StatCard[] = [
  {
    label: 'Total Users',
    value: dashboardStats.totalUsers.toLocaleString(),
    icon: <Users className="w-6 h-6" />,
    growth: dashboardStats.usersGrowth,
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Active Reservations',
    value: dashboardStats.activeReservations.toLocaleString(),
    icon: <Calendar className="w-6 h-6" />,
    growth: dashboardStats.reservationsGrowth,
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Car Wash Centers',
    value: dashboardStats.totalCenters.toLocaleString(),
    icon: <MapPin className="w-6 h-6" />,
    growth: dashboardStats.centersGrowth,
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Total Revenue',
    value: `$${(dashboardStats.totalRevenue / 1000).toFixed(1)}K`,
    icon: <DollarSign className="w-6 h-6" />,
    growth: dashboardStats.revenueGrowth,
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your platform today.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`p-6 ${stat.bgColor}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                <h3 className="text-2xl font-bold text-foreground mb-4">{stat.value}</h3>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    +{stat.growth}% this month
                  </span>
                </div>
              </div>
              <div className={stat.iconColor}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="col-span-1 lg:col-span-2 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Revenue Trend</h2>
            <p className="text-sm text-muted-foreground">Monthly revenue vs target</p>
          </div>
          <RevenueChart data={revenueData} />
        </Card>

        {/* Reservations Status */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Reservation Status</h2>
            <p className="text-sm text-muted-foreground">Distribution by status</p>
          </div>
          <ReservationChart data={reservationsByStatus} />
        </Card>
      </div>

      {/* Top Centers */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Top Performing Centers</h2>
          <p className="text-sm text-muted-foreground">Centers with highest reservations</p>
        </div>
        <TopCentersWidget centers={topCenters} />
      </Card>
    </div>
  );
}
