'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useData } from '@/lib/data-context';
import { X } from 'lucide-react';

interface AddCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCenterModal({ isOpen, onClose }: AddCenterModalProps) {
  const { addCenter } = useData();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
    rating: 4.5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.city) {
      addCenter({
        name: formData.name,
        city: formData.city,
        address: formData.address,
        phone: formData.phone,
        rating: formData.rating,
        reservations: 0,
        lat: Math.random() * (40.9 - 40.7) + 40.7,
        lng: Math.random() * (-73.9 + 74.0) - 74.0,
      });
      setFormData({ name: '', city: '', address: '', phone: '', rating: 4.5 });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add Car Wash Center</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Center Name</label>
            <Input
              type="text"
              placeholder="Premium Car Wash"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Input
              type="text"
              placeholder="New York"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <Input
              type="text"
              placeholder="123 Main St"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Input
              type="tel"
              placeholder="+1-XXX-XXX-XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <Input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Center
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
