import React, { useState, useEffect } from 'react';
import { Icons } from '../../ui/Icons';

// Kamera/Flaş ikonları
const ScannerIcons = {
  Flash: ({ on }: { on: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={on ? "#fbbf24" : "none"} stroke={on ? "#fbbf24" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  CameraSwitch: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 4v5h-5"/><path d="M4 20v-5h5"/><path d="m3.51 9a9 9 0 0 1 14.85-3.36L20 9"/><path d="m16.96 15a9 9 0 0 1-1.37 4.95L20 20"/><path d="M3.51 15 4 20a9 9 0 0 1-1.37-4.95"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Keyboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" ry="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M6 12h.001"/><path d="M10 12h.001"/><path d="M14 12h.001"/><path d="M18 12h.001"/><path d="M7 16h10"/></svg>
  )
};

type Props = {
  onScanSuccess: (code: string) => void;
  onClose: () => void;
};

export default function QRScannerView({ onScanSuccess, onClose }: Props) {
  const [flash, setFlash] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [simulating, setSimulating] = useState(true);

  // Simülasyon: 3 saniye sonra otomatik "buldu" taklidi yapar
  // Gerçek uygulamada buraya kamera kütüphanesi (react-qr-reader) gelecek.
  useEffect(() => {
    // Tarama animasyonunu başlat
    const timer = setTimeout(() => {
      // Bu kısmı test etmek için butona bağlayacağız, otomatik tetiklenmesin şimdilik
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateScan = () => {
    // Başarılı ses efekti veya titreşim burada tetiklenebilir
    if (navigator.vibrate) navigator.vibrate(200);
    onScanSuccess("AC-TR-34-001"); // Örnek bir istasyon ID'si
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Arka Plan (Kamera Görüntüsü Yerine) */}
      <div className="absolute inset-0 bg-gray-900">
        {/* Hareketli Arka Plan Efekti (Kamera gürültüsü gibi) */}
        <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] animate-pulse" />
      </div>

      {/* Üst Kontroller */}
      <div className="relative z-10 flex justify-between items-center p-6 pt-12">
        <button onClick={() => setFlash(!flash)} className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <ScannerIcons.Flash on={flash} />
        </button>
        <div className="text-white font-bold bg-black/40 px-4 py-1 rounded-full text-sm backdrop-blur-md">
          QR Tara
        </div>
        <button onClick={onClose} className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <ScannerIcons.X />
        </button>
      </div>

      {/* Tarama Alanı */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-8">
        <div className="relative w-64 h-64">
          {/* Köşe Çizgileri */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#07B1FF] rounded-tl-xl shadow-[0_0_15px_#07B1FF]" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#07B1FF] rounded-tr-xl shadow-[0_0_15px_#07B1FF]" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#07B1FF] rounded-bl-xl shadow-[0_0_15px_#07B1FF]" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#07B1FF] rounded-br-xl shadow-[0_0_15px_#07B1FF]" />

          {/* Lazer Tarama Çizgisi (Animasyonlu) */}
          <div className="absolute top-0 left-4 right-4 h-0.5 bg-red-500 shadow-[0_0_20px_red] animate-[scan_2s_infinite_ease-in-out]" />
          
          {/* Rehber Yazısı */}
          <p className="absolute -bottom-16 w-full text-center text-gray-300 text-sm font-medium">
            Kodu çerçevenin içine hizalayın
          </p>
        </div>
      </div>

      {/* Manuel Giriş ve Simülasyon */}
      <div className="relative z-10 p-6 pb-24 bg-gradient-to-t from-black via-black/80 to-transparent space-y-4">
        
        {/* Manuel Kod Girişi */}
        <div className="flex items-center bg-[#1a1a1a] border border-white/20 rounded-xl p-1 pr-2">
           <div className="p-3 text-gray-400">
             <ScannerIcons.Keyboard />
           </div>
           <input 
             type="text" 
             placeholder="İstasyon kodunu elle girin (örn: 3401)" 
             className="bg-transparent text-white w-full focus:outline-none text-sm"
             value={manualCode}
             onChange={(e) => setManualCode(e.target.value)}
           />
           {manualCode.length > 0 && (
             <button onClick={() => onScanSuccess(manualCode)} className="bg-[#07B1FF] text-black px-4 py-1.5 rounded-lg text-xs font-bold">
               GİT
             </button>
           )}
        </div>

        {/* Geliştirici İçin Simülasyon Butonu */}
        <button 
          onClick={handleSimulateScan}
          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-xs hover:bg-white/10 transition-colors"
        >
          (Simülasyon: QR Okutulmuş Gibi Yap)
        </button>
      </div>
      
      {/* CSS Animasyonu için Style */}
      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}