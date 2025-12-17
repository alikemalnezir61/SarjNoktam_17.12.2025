import { useState, useEffect } from 'react';

// İstasyon Tipi Tanımı (Interface olarak güncellendi)
// Hata buradaydı: Başındaki 'export' kelimesi, bu yapının diğer dosyalarda kullanılmasını sağlar.
export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  type: 'AC' | 'DC';
  power: number;
  price: number;
  address: string;
  mapX: number; // Harita üzerindeki % konumu (Simülasyon için)
  mapY: number;
  distKm: number;
}

// SAHTE VERİLER (GERÇEK MARKA İSİMLERİYLE)
const MOCK_STATIONS: Station[] = [
  {
    id: '1',
    name: "ZES - Zorlu Center",
    lat: 41.06, lng: 29.01,
    status: 'AVAILABLE',
    type: 'DC',
    power: 120,
    price: 7.95,
    address: "Levazım, Koru Sokağı No:2, Beşiktaş/İst",
    mapX: 50, mapY: 50, // Tam ortada
    distKm: 1.2
  },
  {
    id: '2',
    name: "Tesla Supercharger - Kanyon",
    lat: 41.07, lng: 29.00,
    status: 'BUSY',
    type: 'DC',
    power: 250,
    price: 8.50,
    address: "Büyükdere Cd. No:185, Şişli/İst",
    mapX: 30, mapY: 40, // Sol üstte
    distKm: 3.5
  },
  {
    id: '3',
    name: "Eşarj - Maltepe Park",
    lat: 40.92, lng: 29.15,
    status: 'AVAILABLE',
    type: 'AC',
    power: 22,
    price: 6.40,
    address: "Cevizli, Tugay Yolu Cd., Maltepe/İst",
    mapX: 70, mapY: 60, // Sağ altta
    distKm: 12.4
  },
  {
    id: '4',
    name: "Trugo - Bolu Highway",
    lat: 40.75, lng: 31.60,
    status: 'AVAILABLE',
    type: 'DC',
    power: 180,
    price: 7.80,
    address: "TEM Otoyolu, Elmalık Mevkii, Bolu",
    mapX: 80, mapY: 20, // Sağ üstte
    distKm: 240
  },
  {
    id: '5',
    name: "Voltrun - Ataşehir",
    lat: 40.99, lng: 29.10,
    status: 'OFFLINE',
    type: 'AC',
    power: 11,
    price: 5.90,
    address: "Barbaros, Mor Sümbül Sk., Ataşehir/İst",
    mapX: 40, mapY: 70, // Sol altta
    distKm: 8.1
  }
];

export function useStations(filters: any) {
  const [items, setItems] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API isteği simülasyonu
    const timer = setTimeout(() => {
      // Eğer arama yapılıyorsa filtrele
      if (filters && filters.search) {
        const lowerSearch = filters.search.toLowerCase();
        const filtered = MOCK_STATIONS.filter(s => 
          s.name.toLowerCase().includes(lowerSearch) || 
          s.address.toLowerCase().includes(lowerSearch)
        );
        setItems(filtered);
      } else {
        setItems(MOCK_STATIONS);
      }
      setLoading(false);
    }, 500); // Yarım saniye gecikme efekti

    return () => clearTimeout(timer);
  }, [filters]); // filters.search yerine filters objesini izlemek daha güvenlidir

  return { items, loading };
}