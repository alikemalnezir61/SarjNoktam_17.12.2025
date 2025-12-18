import React, { useState, useMemo } from 'react';
import { useStations } from '../../hooks/useStations';
import { Icons } from '../../ui/Icons';
import { useModal } from '../../context/ModalContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function ListView() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<'price-asc' | 'price-desc' | 'brand-asc' | 'brand-desc'>('price-asc');
  const { items: stations, loading } = useStations({ search });
  const { showAlert } = useModal(); // <--- HOOK

  const { isFavorite, toggleFavorite } = useFavorites();
  // Sıralama fonksiyonu
  const sortedStations = useMemo(() => {
    const arr = [...stations];
    switch (sortKey) {
      case 'price-asc':
        arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price-desc':
        arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'brand-asc':
        arr.sort((a, b) => (a.name.localeCompare(b.name, 'tr')));
        break;
      case 'brand-desc':
        arr.sort((a, b) => (b.name.localeCompare(a.name, 'tr')));
        break;
    }
    return arr;
  }, [stations, sortKey]);

  return (
    <div className="h-full bg-[#1a1a1a] pb-32 text-white overflow-y-auto animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold pl-2 border-l-4 border-[#07B1FF]">İstasyonlar</h2>
            <div className="text-xs text-gray-400 font-mono">{stations.length} Sonuç</div>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              value={sortKey}
              onChange={e => setSortKey(e.target.value as any)}
            >
              <option value="price-asc">Fiyat (Artan)</option>
              <option value="price-desc">Fiyat (Azalan)</option>
              <option value="brand-asc">Marka (A-Z)</option>
              <option value="brand-desc">Marka (Z-A)</option>
            </select>
          </div>
        </div>
        <div className="bg-[#121826] border border-white/10 rounded-xl flex items-center px-4 gap-3"><div className="w-5 h-5 text-gray-400"><Icons.Search /></div><input type="text" placeholder="İstasyon ara..." className="bg-transparent text-white w-full text-sm focus:outline-none py-3" value={search} onChange={(e) => setSearch(e.target.value)}/></div>
      </div>

      {loading && <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4"><div className="w-8 h-8 border-2 border-[#07B1FF] border-t-transparent rounded-full animate-spin"></div><p>İstasyonlar taranıyor...</p></div>}

      <div className="p-4 space-y-4">
        {sortedStations.map((station) => (
          <div key={station.id} className="group bg-[#1e293b]/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-lg hover:border-[#07B1FF]/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight flex items-center gap-2">
                  {station.name}
                  <button
                    onClick={() => toggleFavorite(station.id)}
                    className="ml-1 p-1 rounded-full hover:bg-pink-500/10 transition-colors"
                    title={isFavorite(station.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                  >
                    <Icons.Heart className={isFavorite(station.id) ? 'w-5 h-5 text-pink-400' : 'w-5 h-5 text-gray-400'} filled={isFavorite(station.id)} />
                  </button>
                </h3>
                <div className="flex items-center text-gray-400 text-xs mt-1.5"><Icons.MapPin className="w-3 h-3 mr-1" /><span>{station.distKm?.toFixed(1)} km • {station.address || "İstanbul"}</span></div>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${station.status === 'AVAILABLE' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>{station.status === 'AVAILABLE' ? 'Müsait' : 'Dolu'}</div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5 text-gray-300 bg-black/20 px-2 py-1 rounded text-xs font-medium"><div className="w-3 h-3 text-yellow-400"><Icons.Zap /></div><span>120 kW</span></div>
                 <div className="flex items-center gap-1.5 text-[#07B1FF] bg-[#07B1FF]/10 px-2 py-1 rounded text-xs font-bold border border-[#07B1FF]/20"><span>7.95 ₺/kWh</span></div>
              </div>
              <button 
                onClick={() => showAlert("Navigasyon", `${station.name} için rota oluşturuluyor...`)}
                className="bg-[#07B1FF] hover:bg-[#0590d1] text-black px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-colors shadow-[0_0_10px_rgba(7,177,255,0.2)]"
              >
                Rota
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}