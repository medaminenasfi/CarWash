'use client';

import { useState } from 'react';
import { useData, CarWashCenter } from '@/lib/data-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  center: CarWashCenter | null;
}

export function EditCenterModal({ isOpen, onClose, center }: EditCenterModalProps) {
  const { updateCenter } = useData();
  const [formData, setFormData] = useState<CarWashCenter | null>(center);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    updateCenter(formData.id, {
      name: formData.name,
      city: formData.city,
      address: formData.address,
      phone: formData.phone,
      rating: formData.rating,
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Car Wash Center</DialogTitle>
          <DialogDescription>Update center information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Center Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Center Name
            </label>
            <Input
              name="name"
              value={formData?.name || ''}
              onChange={handleChange}
              placeholder="Downtown Wash Center"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              City
            </label>
            <Input
              name="city"
              value={formData?.city || ''}
              onChange={handleChange}
              placeholder="New York"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Address
            </label>
            <Input
              name="address"
              value={formData?.address || ''}
              onChange={handleChange}
              placeholder="123 Main Street, NY 10001"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone
            </label>
            <Input
              name="phone"
              value={formData?.phone || ''}
              onChange={handleChange}
              placeholder="+1-555-0123"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rating (0-5)
            </label>
            <Input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData?.rating || ''}
              onChange={handleChange}
              placeholder="4.5"
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
