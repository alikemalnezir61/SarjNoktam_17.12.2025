import React, { useState } from 'react';
import MapView from './MapView';
import ListView from './ListView';
import HistoryView from './HistoryView';
import QRScannerView from './QRScannerView';
import ProfileView from './ProfileView';
import ActiveChargingScreen from './ActiveChargingScreen';
import { Icons } from '../../ui/Icons';
import { useModal } from '../../context/ModalContext'; // <--- YENİ EKLENTİ

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'history' | 'profile'>('map');
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
        {activeTab === 'map' && (
          <div style={{ position: 'absolute', left: 12, top: 12, zIndex: 60, background: 'rgba(7,177,255,0.12)', color: '#07B1FF', padding: '6px 10px', borderRadius: 8, fontSize: 12, pointerEvents: 'none' }}>
            activeTab: map
          </div>
        )}
        {activeTab === 'map' && <div className="w-full h-full"><MapView onStartCharge={handleStartCharge} /></div>}
        {activeTab === 'list' && <div className="w-full h-full"><ListView /></div>}
        {activeTab === 'history' && <div className="w-full h-full"><HistoryView /></div>}
        {activeTab === 'profile' && <div className="w-full h-full"><ProfileView /></div>}
      </div>

      {/* ALT MENÜ */}
      <div className="h-24 bg-[#121826]/95 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-2 pb-6 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        
        <button onClick={() => setActiveTab('map')} className={`flex flex-col items-center gap-1 w-14 ${activeTab === 'map' ? 'text-[#07B1FF]' : 'text-gray-500'}`}>
          <div className="w-6 h-6"><Icons.MapPin /></div>
          <span className="text-[10px] font-bold">Harita</span>
        </button>

        <button onClick={() => setActiveTab('list')} className={`flex flex-col items-center gap-1 w-14 ${activeTab === 'list' ? 'text-[#07B1FF]' : 'text-gray-500'}`}>
          <div className="w-6 h-6"><Icons.Menu /></div>
          <span className="text-[10px] font-bold">Liste</span>
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
        </button>
      </div>
    </div>
  );
}