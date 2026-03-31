'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { carWashServices } from '@/lib/mock-data';
import { Search, Plus, Clock, DollarSign, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(carWashServices);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = carWashServices.filter(
      (service) =>
        service.name.toLowerCase().includes(value.toLowerCase()) ||
        service.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Wash': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'Interior': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      'Detailing': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      'Protection': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      'Maintenance': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    };
    return colors[category] || colors['Wash'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage car wash services and pricing</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Services Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Service Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{service.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1 font-semibold text-foreground">
                        <DollarSign className="w-4 h-4" />
                        {service.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {service.duration} min
                      </div>
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
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No services found
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
