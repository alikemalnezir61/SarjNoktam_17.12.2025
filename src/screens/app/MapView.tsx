import React, { useState, useMemo, useEffect } from "react";
import ListView from "./ListView";
import GeminiChatBar from "../../ui/GeminiChatBar";
import { Icons } from "../../ui/Icons";
import { useStations, type Station } from "../../hooks/useStations";
import { useFavorites } from '../../context/FavoritesContext';
import { useModal } from "../../context/ModalContext";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from 'react-leaflet';
// Marker cluster için import
// @ts-ignore
import MarkerClusterGroup from 'react-leaflet-markercluster';
import '../../styles/markercluster.css';
import L from 'leaflet';
import { Polyline } from 'react-leaflet';

type MapViewProps = {
  onStartCharge?: () => void;
};

const getStationBrand = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("zes")) return { id: "zes", logo: "/logos/zes.svg", bg: "bg-white" };
  if (n.includes("esarj") || n.includes("eşarj")) return { id: "esarj", logo: "/logos/esarj.svg", bg: "bg-white" };
  if (n.includes("tesla")) return { id: "tesla", logo: "/logos/tesla.svg", bg: "bg-black" };
  return { id: "default", logo: "/logos/default.svg", bg: "bg-white" };
};

const BrandLogo: React.FC<{ brand: ReturnType<typeof getStationBrand>; name: string; size?: number }> = ({ brand, name, size = 40 }) => {
  const [errored, setErrored] = useState(false);
  const initials = useMemo(() => {
    const cleaned = name.replace(/[^\p{L}\s]/gu, "").trim();
    if (!cleaned) return null;
    const parts = cleaned.split(/\s+/);
    return (parts[0][0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase();
  }, [name]);

  if (brand.logo && !errored) {
    return <img src={brand.logo} alt={name} onError={() => setErrored(true)} style={{ width: size, height: size }} className="object-contain" />;
  }

  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center rounded-md bg-gray-800 text-white font-bold">
      {initials || <Icons.Zap className="w-4 h-4 text-[#07B1FF]" />}
    </div>
  );
};

function FlyTo({ lat, lng, zoom }: { lat: number; lng: number; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom ?? 15, { duration: 0.6 });
  }, [lat, lng, zoom, map]);
  return null;
}

export default function MapView({ onStartCharge }: MapViewProps) {
  const [chatQ, setChatQ] = useState("");
  const [chatA, setChatA] = useState("");
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPrice, setFilterPrice] = useState<[number, number] | null>(null);
  const [filterBrand, setFilterBrand] = useState('');
  const { items: stations } = useStations({});
  const { showConfirm } = useModal();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const { isFavorite, toggleFavorite } = useFavorites();
  const userLocation: [number, number] = [41.0082, 28.9784];
  const [navMode, setNavMode] = useState(false);
  const [stationsData, setStationsData] = useState(stations);

  // Canlı güncelleme için polling
  useEffect(() => {
    const interval = setInterval(() => {
      // Burada gerçek API'den veri çekilecek, şimdilik mock ile güncelliyoruz
      setStationsData([...useStations({}).items]);
    }, 10000); // 10 saniyede bir güncelle
    return () => clearInterval(interval);
  }, []);

  // Yapay zeka API entegrasyonu burada olacak (şimdilik demo Türkçe cevap)
  const handleGeminiSend = async (q: string) => {
    setChatQ(q);
    setChatA("Yanıt hazırlanıyor...");
    // TODO: Burada gerçek Gemini API çağrısı yapılacak
    setTimeout(() => {
      setChatA(`(Demo cevap) Sorduğunuz soru: "${q}"\nElektrikli araçlar hakkında genel bilgi: Elektrikli araçlar çevre dostu, sessiz ve ekonomik ulaşım sağlar. Şarj istasyonları ile kolayca enerji alabilirsiniz.`);
    }, 1200);
  };

  const filtered = stationsData.filter((s) => {
    let match = s.name.toLowerCase().includes(query.toLowerCase());
    if (filterType) match = match && s.type === filterType;
    if (filterStatus) match = match && s.status === filterStatus;
    if (filterPrice) match = match && s.price >= filterPrice[0] && s.price <= filterPrice[1];
    if (filterBrand) match = match && getStationBrand(s.name).id === filterBrand;
    return match;
  });
  const center: [number, number] = stations.length ? [stations[0].lat, stations[0].lng] : [41.01, 28.97];

  const makeDivIcon = (logo?: string, size = 52) => {
    const html = logo
      ? `<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:rgba(11,17,26,0.9);box-shadow:0 6px 20px rgba(7,177,255,0.12);border:1px solid rgba(255,255,255,0.06)"><img src='${logo}' style='width:78%;height:78%;object-fit:contain;display:block' alt='logo'/></div>`
      : `<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#071126;color:#07B1FF;font-weight:700">EV</div>`;
    return L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size] });
  };

  // Eğer viewMode 'list' ise sadece ListView'u göster
  if (viewMode === 'list') {
    return (
      <div className="relative h-full w-full bg-[#0b1220]">
        <div className="absolute top-3 right-4 z-50 flex gap-2">
          <button
            className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-white/10 transition-all duration-150 bg-[#071126] text-white/80 hover:bg-[#0b1a2a]`}
            onClick={() => setViewMode('map')}
          >
            Harita
          </button>
          <button
            className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-white/10 transition-all duration-150 bg-[#07B1FF] text-black`}
            disabled
          >
            Liste
          </button>
        </div>
        <ListView />
        {/* Arama barı */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto w-full px-4 max-w-lg">
          <div className="flex items-center bg-[#071022]/70 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-white/10">
            <Icons.Search className="w-5 h-5 text-gray-300 mr-2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="İstasyon ara..." className="flex-1 bg-transparent outline-none text-white placeholder-gray-400" />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400 ml-2"><Icons.X className="w-4 h-4" /></button>
            )}
          </div>
        </div>
        <GeminiChatBar onSend={handleGeminiSend} />
        {chatQ && (
          <div className="fixed bottom-44 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
            <div className="bg-[#222c3a] border border-[#07B1FF]/30 rounded-2xl p-4 text-white shadow-xl animate-in fade-in duration-300">
              <div className="text-xs text-[#07B1FF] mb-1">Soru:</div>
              <div className="font-bold mb-2">{chatQ}</div>
              <div className="text-xs text-[#07B1FF] mb-1 mt-2">Cevap:</div>
              <div>{chatA}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-[#0b1220]">
      {/* Sağ üstte Harita/Liste butonları ve legend */}
      <div className="absolute top-3 right-4 z-50 flex flex-col items-end gap-2">
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-white/10 transition-all duration-150 ${viewMode === 'map' ? 'bg-[#07B1FF] text-black' : 'bg-[#071126] text-white/80 hover:bg-[#0b1a2a]'}`}
            onClick={() => setViewMode('map')}
          >
            Harita
          </button>
          <button
            className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-white/10 transition-all duration-150 ${viewMode === 'list' ? 'bg-[#07B1FF] text-black' : 'bg-[#071126] text-white/80 hover:bg-[#0b1a2a]'}`}
            onClick={() => setViewMode('list')}
          >
            Liste
          </button>
        </div>
        {/* Legend */}
        <div className="bg-[#071126]/90 rounded-xl px-3 py-2 shadow border border-white/10 flex flex-row gap-3 text-xs text-white overflow-x-auto">
          <div className="font-bold text-[#07B1FF] mb-1">Açıklama</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Müsait</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Dolu</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-500 inline-block"></span> Bakım</div>
          <div className="flex items-center gap-2"><img src="/logos/zes.svg" alt="ZES" className="w-5 h-5"/> ZES</div>
          <div className="flex items-center gap-2"><img src="/logos/esarj.svg" alt="Eşarj" className="w-5 h-5"/> Eşarj</div>
          <div className="flex items-center gap-2"><img src="/logos/tesla.svg" alt="Tesla" className="w-5 h-5"/> Tesla</div>
        </div>
      </div>
      {/* Filtre barı */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto w-full px-2 max-w-full overflow-x-auto">
        <div className="flex flex-nowrap gap-2 items-center bg-[#071022]/70 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-white/10 overflow-x-auto">
          <Icons.Search className="w-5 h-5 text-gray-300 mr-2" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="İstasyon ara..." className="flex-1 bg-transparent outline-none text-white placeholder-gray-400" />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-[#071126] text-white text-xs rounded px-2 py-1">
            <option value="">Tip</option>
            <option value="AC">AC</option>
            <option value="DC">DC</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-[#071126] text-white text-xs rounded px-2 py-1">
            <option value="">Durum</option>
            <option value="AVAILABLE">Müsait</option>
            <option value="BUSY">Dolu</option>
            <option value="OFFLINE">Bakım</option>
          </select>
          <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)} className="bg-[#071126] text-white text-xs rounded px-2 py-1">
            <option value="">Marka</option>
            <option value="zes">ZES</option>
            <option value="esarj">Eşarj</option>
            <option value="tesla">Tesla</option>
          </select>
          <input type="number" min="0" max="100" value={filterPrice?.[0] ?? ""} onChange={e => setFilterPrice([Number(e.target.value), filterPrice?.[1] ?? 100])} placeholder="Min ₺" className="bg-[#071126] text-white text-xs rounded px-2 py-1 w-16" />
          <span className="text-white text-xs">-</span>
          <input type="number" min="0" max="100" value={filterPrice?.[1] ?? ""} onChange={e => setFilterPrice([filterPrice?.[0] ?? 0, Number(e.target.value)])} placeholder="Max ₺" className="bg-[#071126] text-white text-xs rounded px-2 py-1 w-16" />
          <button onClick={() => { setFilterType(""); setFilterStatus(""); setFilterPrice(null); setFilterBrand(''); }} className="text-gray-400 ml-2 text-xs px-2 py-1 rounded hover:bg-[#07B1FF]/10">Temizle</button>
        </div>
      </div>
      <GeminiChatBar onSend={handleGeminiSend} />
      {/* Harita kutusu tam ekran (alt bar hariç) */}
      <MapContainer
        center={center}
        zoom={12}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 96,
          width: '100%',
          height: 'auto',
          minHeight: 400,
          borderRadius: 0,
          background: '#222'
        }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          detectRetina={true}
        />
        <MarkerClusterGroup>
          {filtered.map((s) => {
            const b = getStationBrand(s.name);
            const icon = makeDivIcon(b.logo, selectedStation?.id === s.id ? 72 : 52);
            return (
              <Marker key={s.id} position={[s.lat, s.lng]} icon={icon as any} eventHandlers={{ click: () => setSelectedStation(s) }} />
            );
          })}
        </MarkerClusterGroup>
        {/* Rota çizimi: kullanıcıdan seçili istasyona polyline */}
        {selectedStation && navMode && (
          <Polyline positions={[userLocation, [selectedStation.lat, selectedStation.lng]]} color="#07B1FF" weight={6} />
        )}
        {selectedStation && <FlyTo lat={selectedStation.lat} lng={selectedStation.lng} zoom={15} />}
      </MapContainer>
      {/* Gemini Sohbet Barı */}
      <GeminiChatBar onSend={handleGeminiSend} />
      {chatQ && (
        <div className="fixed bottom-44 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
          <div className="bg-[#222c3a] border border-[#07B1FF]/30 rounded-2xl p-4 text-white shadow-xl animate-in fade-in duration-300">
            <div className="text-xs text-[#07B1FF] mb-1">Soru:</div>
            <div className="font-bold mb-2">{chatQ}</div>
            <div className="text-xs text-[#07B1FF] mb-1 mt-2">Cevap:</div>
            <div>{chatA}</div>
          </div>
        </div>
      )}
      {/* DETAIL CARD */}
      {selectedStation && (
        <div className="absolute bottom-0 left-0 w-full z-50">
          <div className="mx-auto max-w-3xl bg-[#0B0F17] border-t border-[#07B1FF]/30 rounded-t-3xl p-6 pb-28 shadow-2xl relative">
            <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-4 opacity-60" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#071126] to-[#072b3a] p-2 flex items-center justify-center shadow-xl border border-white/10 overflow-hidden">
                  <BrandLogo brand={getStationBrand(selectedStation.name)} name={selectedStation.name} size={56} />
                  <button
                    onClick={() => toggleFavorite(selectedStation.id)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-[#0B0F17]/80 hover:bg-pink-500/20 transition-colors"
                    title={isFavorite(selectedStation.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                  >
                    <Icons.Heart className={isFavorite(selectedStation.id) ? 'w-6 h-6 text-pink-400' : 'w-6 h-6 text-gray-400'} filled={isFavorite(selectedStation.id)} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {selectedStation.name}
                  </h3>
                  <div className="text-sm text-gray-400 mt-1 flex items-center gap-2"><Icons.MapPin className="w-4 h-4 text-[#07B1FF]" />{selectedStation.address || 'Konum'}</div>
                </div>
              </div>
              <button onClick={() => setSelectedStation(null)} className="text-gray-400 p-2 rounded-full hover:bg-white/3"><Icons.X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-[#121826] p-3 rounded-xl border border-white/6 flex flex-col items-center">
                <Icons.Zap className="text-yellow-400 mb-1 w-5 h-5" />
                <div className="text-white font-bold">{selectedStation.power ?? '-'} kW</div>
                <div className="text-xs text-gray-400">{selectedStation.type ?? 'Çeşit'}</div>
              </div>
              <div className="bg-[#121826] p-3 rounded-xl border border-white/6 flex flex-col items-center">
                <div className="text-green-400 font-bold text-lg mb-0">{selectedStation.price ?? '-'}₺</div>
                <div className="text-white font-bold text-[10px]">Birim Fiyat</div>
                <div className="text-[10px] text-gray-400">/ kWh</div>
              </div>
              <div className="bg-[#121826] p-3 rounded-xl border border-white/6 flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mb-2 ${selectedStation.status === 'AVAILABLE' ? 'bg-green-400' : selectedStation.status === 'OFFLINE' ? 'bg-gray-500' : 'bg-red-500'}`}></div>
                <div className="text-white font-bold text-sm">{selectedStation.status === 'AVAILABLE' ? 'Müsait' : selectedStation.status === 'OFFLINE' ? 'Bakım' : 'Dolu'}</div>
                <div className="text-[10px] text-gray-400">Durum</div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setNavMode(true)} className="flex-1 py-3 rounded-xl bg-gray-800 text-white font-bold border border-white/6">Rota Çiz</button>
              <button onClick={() => { showConfirm('Şarjı Başlat', `${selectedStation.name} istasyonunda şarj başlatılsın mı?`, () => onStartCharge && onStartCharge()); }} disabled={selectedStation.status !== 'AVAILABLE'} className={`flex-[2] py-3 rounded-xl font-bold ${selectedStation.status === 'AVAILABLE' ? 'bg-[#07B1FF] text-black' : 'bg-gray-600 text-white opacity-60 cursor-not-allowed'}`}>
                Şarjı Başlat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}