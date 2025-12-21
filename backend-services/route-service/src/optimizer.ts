// Akıllı rota optimizasyonu için mock algoritma
export type Station = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price?: number;
  status?: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
};

export type OptimizeParams = {
  start: [number, number];
  end: [number, number];
  stations: Station[];
  batteryLevel: number; // 0-100
};

export function optimizeRoute({ start, end, stations, batteryLevel }: OptimizeParams) {
  // Mock: Sadece müsait ve en ucuz istasyonları seç
  const availableStations = stations.filter(s => s.status === 'AVAILABLE');
  const sorted = availableStations.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  // Mock: Sadece ilk 2 istasyonu öner
  const routeStations = sorted.slice(0, 2);
  return {
    route: [start, ...routeStations.map(s => [s.lat, s.lng]), end],
    stations: routeStations
  };
}
