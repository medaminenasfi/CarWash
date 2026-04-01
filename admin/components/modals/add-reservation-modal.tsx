'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useData } from '@/lib/data-context';
import { X } from 'lucide-react';

interface AddReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddReservationModal({ isOpen, onClose }: AddReservationModalProps) {
  const { addReservation, centers, services } = useData();
  const [formData, setFormData] = useState({
    center: '',
    customer: '',
    date: '',
    time: '',
    service: '',
    amount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.center && formData.customer && formData.date && formData.time && formData.service) {
      addReservation({
        center: formData.center,
        customer: formData.customer,
        date: formData.date,
        time: formData.time,
        service: formData.service,
        status: 'Pending',
        amount: formData.amount,
      });
      setFormData({ center: '', customer: '', date: '', time: '', service: '', amount: 0 });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Reservation</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Car Wash Center</label>
            <select
              value={formData.center}
              onChange={(e) => setFormData({ ...formData, center: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            >
              <option value="">Select center</option>
              {centers.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Customer Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Service</label>
            <select
              value={formData.service}
              onChange={(e) => {
                const service = services.find(s => s.name === e.target.value);
                setFormData({ ...formData, service: e.target.value, amount: service?.price || 0 });
              }}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            >
              <option value="">Select service</option>
              {services.map(s => (
                <option key={s.id} value={s.name}>{s.name} - ${s.price}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
