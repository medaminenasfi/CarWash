'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useData, Reservation } from '@/lib/data-context';
import { Search, Plus, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';
import { AddReservationModal } from '@/components/modals/add-reservation-modal';
import { EditReservationModal } from '@/components/modals/edit-reservation-modal';

export default function ReservationsPage() {
  const { reservations, deleteReservation } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredReservations = reservations.filter(
    (res) =>
      res.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.center.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1">Manage all customer reservations</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" />
          New Reservation
        </Button>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer, center, or reservation ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Reservations Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 md:px-6 py-4 text-left font-semibold text-foreground">ID</th>
                <th className="hidden md:table-cell px-6 py-4 text-left font-semibold text-foreground">Customer</th>
                <th className="hidden lg:table-cell px-6 py-4 text-left font-semibold text-foreground">Center</th>
                <th className="hidden sm:table-cell px-4 md:px-6 py-4 text-left font-semibold text-foreground">Date/Time</th>
                <th className="hidden md:table-cell px-6 py-4 text-left font-semibold text-foreground">Service</th>
                <th className="hidden xl:table-cell px-6 py-4 text-left font-semibold text-foreground">Amount</th>
                <th className="px-4 md:px-6 py-4 text-left font-semibold text-foreground">Status</th>
                <th className="px-4 md:px-6 py-4 text-left font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr key={res.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-medium text-foreground">{res.id}</td>
                    <td className="hidden md:table-cell px-6 py-4 text-muted-foreground">{res.customer}</td>
                    <td className="hidden lg:table-cell px-6 py-4 text-muted-foreground text-xs">{res.center}</td>
                    <td className="hidden sm:table-cell px-4 md:px-6 py-4 text-muted-foreground text-xs">
                      {res.date} {res.time}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-muted-foreground text-xs">{res.service}</td>
                    <td className="hidden xl:table-cell px-6 py-4 font-semibold text-foreground">${res.amount}</td>
                    <td className="px-4 md:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(res.status)}`}>
                        {getStatusIcon(res.status)}
                        {res.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingReservation(res);
                            setIsEditModalOpen(true);
                          }}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteReservation(res.id)}
                          className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

      <AddReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditReservationModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingReservation(null);
        }}
        reservation={editingReservation}
      />
    </div>
  );
}
