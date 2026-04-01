'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useData, CarWashCenter } from '@/lib/data-context';
import { Search, Plus, MoreVertical, Trash2, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { AddCenterModal } from '@/components/modals/add-center-modal';
import { EditCenterModal } from '@/components/modals/edit-center-modal';
import { CentersMap } from '@/components/dashboard/centers-map';

export default function CentersPage() {
  const { centers, deleteCenter } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<CarWashCenter | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);

  const filteredCenters = centers.filter(
    (center) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Car Wash Centers</h1>
          <p className="text-muted-foreground mt-1">Manage all car wash centers</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" />
          Add Center
        </Button>
      </div>

      {/* Search Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showMap ? 'default' : 'outline'}
            onClick={() => setShowMap(!showMap)}
            className="gap-2 w-full md:w-auto"
          >
            <MapPin className="w-4 h-4" />
            {showMap ? 'Hide Map' : 'Show Map'}
          </Button>
        </div>
      </Card>

      {/* Map View */}
      {showMap && (
        <div>
          <CentersMap />
        </div>
      )}

      {/* Centers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-foreground">City</th>
                <th className="hidden sm:table-cell px-4 md:px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-foreground">Reservations</th>
                <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center) => (
                  <tr key={center.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm text-foreground font-medium">{center.name}</td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-muted-foreground">{center.city}</td>
                    <td className="hidden sm:table-cell px-4 md:px-6 py-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-foreground">{center.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-foreground">{center.reservations}</td>
                    <td className="px-4 md:px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCenter(center);
                            setIsEditModalOpen(true);
                          }}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCenter(center.id)}
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
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No centers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AddCenterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditCenterModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCenter(null);
        }}
        center={editingCenter}
      />
    </div>
  );
}
