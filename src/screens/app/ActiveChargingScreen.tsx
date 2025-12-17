import React, { useState, useEffect } from 'react';
import { Icons } from '../../ui/Icons';

type Props = {
  onStopCharging: () => void; // Bu fonksiyon AppShell'de zaten modal açıyor
};

export default function ActiveChargingScreen({ onStopCharging }: Props) {
  const [percentage, setPercentage] = useState(24);
  const [kwh, setKwh] = useState(12.4);
  const [cost, setCost] = useState(98.5);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage(p => (p < 100 ? p + 1 : 100));
      setKwh(k => k + 0.1);
      setCost(c => c + 0.8);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-[#0B0F17] flex flex-col items-center justify-between p-6 relative overflow-hidden animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#07B1FF]/20 via-[#0B0F17] to-[#0B0F17] animate-pulse"></div>

      <div className="z-10 w-full flex justify-between items-center mt-4">
        <div><h2 className="text-white text-2xl font-bold">Şarj Oluyor</h2><p className="text-gray-400 text-sm">ZES - Zorlu Center</p></div>
        <div className="bg-[#07B1FF]/20 px-3 py-1 rounded-full border border-[#07B1FF]/50 text-[#07B1FF] text-xs font-bold animate-pulse">⚡ DC Hızlı Şarj</div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-64 h-64 rounded-full border-8 border-gray-800 flex items-center justify-center relative shadow-[0_0_50px_rgba(7,177,255,0.2)]">
           <div className="absolute inset-0 rounded-full border-8 border-[#07B1FF] border-t-transparent animate-spin duration-[3s]"></div>
           <div className="text-center"><span className="text-6xl font-bold text-white block">%{percentage}</span><span className="text-gray-400 text-sm">DOLULUK</span></div>
        </div>
        <p className="mt-6 text-gray-400 animate-pulse">Batarya doluyor...</p>
      </div>

      <div className="z-10 w-full grid grid-cols-3 gap-4 mb-8">
         <div className="bg-[#1e293b]/50 p-4 rounded-2xl text-center border border-white/5"><p className="text-gray-400 text-xs">GÜÇ</p><p className="text-xl font-bold text-white">120 <span className="text-sm font-normal">kW</span></p></div>
         <div className="bg-[#1e293b]/50 p-4 rounded-2xl text-center border border-white/5"><p className="text-gray-400 text-xs">TÜKETİM</p><p className="text-xl font-bold text-[#07B1FF]">{kwh.toFixed(1)} <span className="text-sm font-normal">kWh</span></p></div>
         <div className="bg-[#1e293b]/50 p-4 rounded-2xl text-center border border-white/5"><p className="text-gray-400 text-xs">TUTAR</p><p className="text-xl font-bold text-green-400">{cost.toFixed(2)} <span className="text-sm font-normal">₺</span></p></div>
      </div>

      <div className="z-10 w-full mb-20">
         <button 
            onClick={onStopCharging} // Direkt çağır, çünkü AppShell içinde modal açılıyor
            className="w-full py-5 bg-red-500 hover:bg-red-600 rounded-2xl text-white font-bold text-lg shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all active:scale-95"
         >
            Şarjı Bitir
         </button>
      </div>
    </div>
  );
}