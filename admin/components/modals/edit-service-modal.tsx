'use client';

import { useState } from 'react';
import { useData, Service } from '@/lib/data-context';
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

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const CATEGORIES = ['Wash', 'Interior', 'Detailing', 'Protection', 'Maintenance'];

export function EditServiceModal({ isOpen, onClose, service }: EditServiceModalProps) {
  const { updateService } = useData();
  const [formData, setFormData] = useState<Service | null>(service);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: name === 'price' || name === 'duration' ? parseFloat(value) : value
    } : null);
  };

  const handleCategoryChange = (value: string) => {
    if (!formData) return;
    setFormData(prev => prev ? { ...prev, category: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    updateService(formData.id, {
      name: formData.name,
      price: formData.price,
      duration: formData.duration,
      category: formData.category,
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>Update the service details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Service Name
            </label>
            <Input
              name="name"
              value={formData?.name || ''}
              onChange={handleChange}
              placeholder="e.g., Premium Wash"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <Select value={formData?.category || ''} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Price ($)
            </label>
            <Input
              name="price"
              type="number"
              step="0.01"
              value={formData?.price || ''}
              onChange={handleChange}
              placeholder="29.99"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Duration (minutes)
            </label>
            <Input
              name="duration"
              type="number"
              value={formData?.duration || ''}
              onChange={handleChange}
              placeholder="30"
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
