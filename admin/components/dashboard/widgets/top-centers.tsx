'use client';

import { Star, MapPin } from 'lucide-react';

interface Center {
  id: string;
  name: string;
  city: string;
  reservations: number;
  rating: number;
}

export default function TopCentersWidget({ centers }: { centers: Center[] }) {
  return (
    <div className="space-y-3">
      {centers.map((center, index) => (
        <div key={center.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold text-sm">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">{center.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {center.city}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{center.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {center.reservations.toLocaleString()} bookings
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
