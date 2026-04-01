'use client';

import { useEffect, useRef } from 'react';
import { useData } from '@/lib/data-context';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export function CentersMap() {
  const { centers } = useData();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Leaflet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.async = true;
    
    script.onload = () => {
      const L = (window as any).L;
      
      if (containerRef.current && centers.length > 0) {
        const map = L.map(containerRef.current).setView([40.7128, -74.0060], 10);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        centers.forEach((center) => {
          if (center.lat && center.lng) {
            const marker = L.marker([center.lat, center.lng]).addTo(map);
            marker.bindPopup(`
              <div class="p-2">
                <h3 class="font-semibold">${center.name}</h3>
                <p class="text-sm text-gray-600">${center.city}</p>
                <p class="text-sm text-gray-600">Rating: ${center.rating}</p>
                <p class="text-sm text-gray-600">Reservations: ${center.reservations}</p>
              </div>
            `);
          }
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [centers]);

  return (
    <Card className="h-96 md:h-[500px] overflow-hidden">
      <div ref={containerRef} className="w-full h-full" id="map" />
      
      {centers.length === 0 && (
        <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-muted">
          <MapPin className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground">No centers to display on map</p>
        </div>
      )}
    </Card>
  );
}
