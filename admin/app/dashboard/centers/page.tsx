'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { topCenters } from '@/lib/mock-data';
import { Search, Plus, MapPin, Star, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function CentersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(topCenters);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = topCenters.filter(
      (center) =>
        center.name.toLowerCase().includes(value.toLowerCase()) ||
        center.city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCenters(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Car Wash Centers</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all car wash centers</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Center
        </Button>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or city..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <Card key={center.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{center.name}</h3>
                    <p className="text-sm text-muted-foreground">{center.city}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-muted rounded transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reservations</span>
                  <span className="font-semibold text-foreground">{center.reservations.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-foreground">{center.rating}</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                View Details
              </Button>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No centers found</p>
          </div>
        )}
      </div>
    </div>
  );
}
