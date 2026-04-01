'use client';

import { useState } from 'react';
import { useData, Reservation } from '@/lib/data-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

const STATUSES = ['Completed', 'Pending', 'Cancelled'];

export function EditReservationModal({ isOpen, onClose, reservation }: EditReservationModalProps) {
  const { updateReservation } = useData();
  const [formData, setFormData] = useState<Reservation | null>(reservation);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    } : null);
  };

  const handleStatusChange = (value: string) => {
    if (!formData) return;
    setFormData(prev => prev ? { ...prev, status: value as 'Completed' | 'Pending' | 'Cancelled' } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    updateReservation(formData.id, {
      center: formData.center,
      customer: formData.customer,
      date: formData.date,
      time: formData.time,
      service: formData.service,
      status: formData.status,
      amount: formData.amount,
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Reservation</DialogTitle>
          <DialogDescription>Update reservation details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Center */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Center Name
            </label>
            <Input
              name="center"
              value={formData?.center || ''}
              onChange={handleChange}
              placeholder="Downtown Wash Center"
              required
            />
          </div>

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Customer Name
            </label>
            <Input
              name="customer"
              value={formData?.customer || ''}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date
            </label>
            <Input
              name="date"
              type="date"
              value={formData?.date || ''}
              onChange={handleChange}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Time
            </label>
            <Input
              name="time"
              type="time"
              value={formData?.time || ''}
              onChange={handleChange}
              required
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Service
            </label>
            <Input
              name="service"
              value={formData?.service || ''}
              onChange={handleChange}
              placeholder="Premium Wash"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <Select value={formData?.status || ''} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Amount ($)
            </label>
            <Input
              name="amount"
              type="number"
              step="0.01"
              value={formData?.amount || ''}
              onChange={handleChange}
              placeholder="49.99"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
