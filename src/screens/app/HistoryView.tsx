import React from 'react';
import { Icons } from '../../ui/Icons';

const historyData = [
  { id: 1, station: "ZES - Zorlu AVM", date: "14 Ara 2025", time: "14:30", kwh: "45.2", duration: "42dk", cost: "320.50", status: "Tamamlandı" },
  { id: 2, station: "Eşarj - Maltepe Park", date: "10 Ara 2025", time: "09:15", kwh: "22.8", duration: "25dk", cost: "185.00", status: "Tamamlandı" },
  { id: 3, station: "Trugo - Bolu Highway", date: "02 Ara 2025", time: "18:45", kwh: "58.0", duration: "55dk", cost: "480.90", status: "Tamamlandı" },
  { id: 4, station: "Voltrun - Ev", date: "28 Kas 2025", time: "22:00", kwh: "12.5", duration: "120dk", cost: "45.00", status: "İptal", isCancel: true },
  { id: 5, station: "ZES - Kanyon", date: "20 Kas 2025", time: "10:00", kwh: "30.0", duration: "35dk", cost: "240.00", status: "Tamamlandı" },
  { id: 6, station: "Eşarj - Ataşehir", date: "15 Kas 2025", time: "16:20", kwh: "50.0", duration: "60dk", cost: "400.00", status: "Tamamlandı" },
];

export default function HistoryView() {
  // NOT: Buraya da h-full ve overflow-y-auto ekledik.
  return (
    <div className="h-full bg-[#1a1a1a] pb-32 text-white overflow-y-auto animate-in slide-in-from-right duration-300">
      
      <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4">
        <h2 className="text-2xl font-bold pl-2 border-l-4 border-[#07B1FF]">
          İşlem Geçmişi
        </h2>
      </div>

      {/* Özet Kartı */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Icons.Zap className="w-24 h-24" /></div>
          <div className="relative z-10">
            <p className="text-gray-400 text-sm mb-1">Bu Ay Toplam Harcama</p>
            <h3 className="text-3xl font-bold text-white">986,40 ₺</h3>
            <div className="mt-4 flex gap-4 border-t border-white/5 pt-3">
               <div><p className="text-gray-500 text-xs">Enerji</p><p className="font-bold text-[#07B1FF]">126 kWh</p></div>
               <div><p className="text-gray-500 text-xs">İşlem</p><p className="font-bold text-[#07B1FF]">3 Adet</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="px-4 space-y-3">
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 ml-1">Geçmiş İşlemler</h3>
        {historyData.map((item) => (
          <div key={item.id} className="bg-[#1e293b]/40 border border-white/5 rounded-xl p-4 flex flex-col gap-3 hover:bg-[#1e293b]/60 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.isCancel ? 'bg-red-500/10 text-red-500' : 'bg-[#07B1FF]/10 text-[#07B1FF]'}`}>
                   <Icons.Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.station}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.date} • {item.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${item.isCancel ? 'text-gray-500 line-through' : 'text-white'}`}>{item.cost} ₺</p>
                <p className={`text-[10px] px-2 py-0.5 rounded inline-block mt-1 ${item.isCancel ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}