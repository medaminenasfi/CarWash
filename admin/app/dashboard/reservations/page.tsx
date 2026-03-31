'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { reservations } from '@/lib/mock-data';
import { Search, Plus, Calendar, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReservations, setFilteredReservations] = useState(reservations);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = reservations.filter(
      (res) =>
        res.id.toLowerCase().includes(value.toLowerCase()) ||
        res.customer.toLowerCase().includes(value.toLowerCase()) ||
        res.center.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredReservations(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Cancelled':
        return 'bg-destructive/20 text-destructive dark:bg-destructive/30';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1">Track and manage all car wash reservations</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Reservation
        </Button>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by reservation ID, customer, or center..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Reservations Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Center</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr key={res.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-medium text-foreground">{res.id}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{res.center}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{res.customer}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{res.service}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {res.date} {res.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">${res.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="p-2 hover:bg-muted rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                    No reservations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
