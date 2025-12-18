import React, { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useStations } from '../../hooks/useStations';
import MapView from './MapView';
import ListView from './ListView';
import HistoryView from './HistoryView';
import QRScannerView from './QRScannerView';
import ProfileView from './ProfileView';
import ActiveChargingScreen from './ActiveChargingScreen';
import { Icons } from '../../ui/Icons';
import { useModal } from '../../context/ModalContext'; // <--- YENİ EKLENTİ

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<'map' | 'favorites' | 'history' | 'profile'>('map');
  const { favorites } = useFavorites();
  const { items: stations } = useStations({});
    const [showScanner, setShowScanner] = useState(false);
    const [isCharging, setIsCharging] = useState(false);

  // Hook'u çağırıyoruz
  const { showAlert, showConfirm } = useModal();

  const handleStartCharge = () => {
    setIsCharging(true);
  };

  // Şarjı Bitirme İsteği (Artık havalı modal soracak)
  const handleStopRequest = () => {
    showConfirm(
      "Şarjı Bitir", 
      "Dolum işlemini sonlandırmak istediğinize emin misiniz?", 
      () => {
        setIsCharging(false);
        showAlert("İşlem Tamamlandı", "Şarj işlemi başarıyla sonlandırıldı. Faturanız e-posta adresinize gönderildi.");
      }, 
      true // Kırmızı buton (Tehlikeli işlem)
    );
  };

  const handleScanSuccess = (code: string) => {
    setShowScanner(false);
    // Eski alert yerine bizim modal
    showAlert("QR Başarılı", `İstasyon (${code}) ile bağlantı kuruldu.`, () => {
        handleStartCharge();
    });
  };

  // Eğer Şarj Oluyorsa
  if (isCharging) {
    // onStopCharging prop'una artık yeni fonksiyonumuzu veriyoruz
    return <ActiveChargingScreen onStopCharging={handleStopRequest} />;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-[#1a1a1a] text-white">
      
      {showScanner && (
        <QRScannerView 
          onScanSuccess={handleScanSuccess} 
          onClose={() => setShowScanner(false)} 
        />
      )}

      <div className="flex-1 relative overflow-hidden">
        {/* Visible debug badge to confirm which tab is active */}
        {/* activeTab: map debug yazısı kaldırıldı */}
        {activeTab === 'map' && (
          <div className="w-full h-full">
            <MapView onStartCharge={handleStartCharge} />
          </div>
        )}
        {activeTab === 'favorites' && (
          <div className="w-full h-full overflow-y-auto">
            <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-2">
              <div className="w-7 h-7 text-pink-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-pink-400"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75C4.462 3.75 2 6.213 2 9.25c0 7.19 9.25 11 9.25 11s9.25-3.81 9.25-11c0-3.037-2.462-5.5-5.5-5.5z" /></svg></div>
              <h2 className="text-xl font-bold text-white">Favoriler</h2>
              <span className="text-xs text-gray-400 font-mono">{favorites.length} Sonuç</span>
            </div>
            <div className="p-4 space-y-4">
              {favorites.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                  <div className="w-10 h-10 text-pink-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-pink-400"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75C4.462 3.75 2 6.213 2 9.25c0 7.19 9.25 11 9.25 11s9.25-3.81 9.25-11c0-3.037-2.462-5.5-5.5-5.5z" /></svg></div>
                  <div className="text-lg font-semibold">Henüz favori eklemediniz.</div>
                  <div className="text-sm">İstasyonları favorilere ekleyin, burada listelensin.</div>
                </div>
              )}
              {favorites.length > 0 && stations.filter(s => favorites.includes(s.id)).map(station => (
                <div key={station.id} className="group bg-[#1e293b]/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-lg hover:border-pink-400/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight flex items-center gap-2">
                        {station.name}
                        <button
                          onClick={() => {
                            // Remove from favorites
                            const { toggleFavorite } = require('../../context/FavoritesContext');
                            toggleFavorite(station.id);
                          }}
                          className="ml-1 p-1 rounded-full hover:bg-pink-500/10 transition-colors"
                          title={'Favorilerden çıkar'}
                        >
                          <Icons.Heart className={'w-5 h-5 text-pink-400'} filled={true} />
                        </button>
                      </h3>
                      <div className="flex items-center text-gray-400 text-xs mt-1.5"><Icons.MapPin className="w-3 h-3 mr-1" /><span>{station.distKm?.toFixed(1)} km • {station.address || "İstanbul"}</span></div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${station.status === 'AVAILABLE' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>{station.status === 'AVAILABLE' ? 'Müsait' : 'Dolu'}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-gray-300 bg-black/20 px-2 py-1 rounded text-xs font-medium"><div className="w-3 h-3 text-yellow-400"><Icons.Zap /></div><span>{station.power} kW</span></div>
                      <div className="flex items-center gap-1.5 text-[#07B1FF] bg-[#07B1FF]/10 px-2 py-1 rounded text-xs font-bold border border-[#07B1FF]/20"><span>{station.price} ₺/kWh</span></div>
                    </div>
                    <button 
                      onClick={() => {
                        const { useModal } = require('../../context/ModalContext');
                        const { showAlert } = useModal();
                        showAlert("Navigasyon", `${station.name} için rota oluşturuluyor...`);
                      }}
                      className="bg-[#07B1FF] hover:bg-[#0590d1] text-black px-4 py-2 rounded-lg text-xs font-bold flex items-center transition-colors shadow-[0_0_10px_rgba(7,177,255,0.2)]"
                    >
                      Rota
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'history' && <div className="w-full h-full"><HistoryView /></div>}
        {activeTab === 'profile' && <div className="w-full h-full"><ProfileView /></div>}
      </div>

      {/* ALT MENÜ */}
      <div className="h-24 bg-[#121826]/95 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-2 pb-6 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <button onClick={() => setActiveTab('map')} className={`flex flex-col items-center gap-1 w-14 ${activeTab === 'map' ? 'text-[#07B1FF]' : 'text-gray-500'}`}>
          <div className="w-6 h-6"><Icons.MapPin /></div>
          <span className="text-[10px] font-bold">Harita</span>
        </button>

        <button onClick={() => setActiveTab('favorites')} className={`flex flex-col items-center gap-1 w-14 ${activeTab === 'favorites' ? 'text-pink-400' : 'text-gray-500'}`}>
          <div className="w-6 h-6">
            {/* Heart icon for favorites */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75C4.462 3.75 2 6.213 2 9.25c0 7.19 9.25 11 9.25 11s9.25-3.81 9.25-11c0-3.037-2.462-5.5-5.5-5.5z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold">Favoriler</span>
        </button>

        <div className="relative -top-5">
          <button onClick={() => setShowScanner(true)} className="bg-[#07B1FF] shadow-[0_0_20px_rgba(7,177,255,0.4)] w-16 h-16 rounded-full flex items-center justify-center text-black border-4 border-[#1a1a1a] hover:scale-105 active:scale-95 transition-transform">
            <div className="w-8 h-8"><Icons.Zap /></div>
          </button>
        </div>

        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 w-14 ${activeTab === 'history' ? 'text-[#07B1FF]' : 'text-gray-500'}`}>
           <div className="w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg></div>
           <span className="text-[10px] font-bold">Geçmiş</span>
        </button>

        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 w-14 ${activeTab === 'profile' ? 'text-[#07B1FF]' : 'text-gray-500'}`}>
          <div className="w-6 h-6"><Icons.User /></div>
          <span className="text-[10px] font-bold">Profil</span>
          <button onClick={() => setActiveTab('campaigns')} className={`flex flex-col items-center gap-1 w-14 ${activeTab === 'campaigns' ? 'text-green-400' : 'text-gray-500'}`}>
            <div className="w-6 h-6">
              {/* Campaign icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464" />
              </svg>
            </div>
            <span className="text-[10px] font-bold">Kampanyalar</span>
          </button>
        </button>
      </div>
    </div>
  );
}