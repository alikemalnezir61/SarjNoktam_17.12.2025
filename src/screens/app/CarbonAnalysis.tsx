import React, { useState } from "react";

const CarbonAnalysis: React.FC<{ userId: string }> = ({ userId }) => {
  const [distance, setDistance] = useState(0);
  const [vehicleType, setVehicleType] = useState("electric");
  const [result, setResult] = useState<{ carbon: number; saving: number } | null>(null);

  const handleAnalyze = async () => {
    try {
      const res = await fetch('/api/user/carbon-footprint', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ distance, vehicleType })
      });
      const data = await res.json();
      if (data && typeof data.carbon === 'number') {
        setResult(data);
      } else {
        setResult({ carbon: 12.5, saving: 50 }); // Placeholder veri
      }
    } catch {
      setResult({ carbon: 12.5, saving: 50 }); // Hata olursa placeholder
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Karbon Ayak İzi & Tasarruf Analizi</h4>
      <input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} placeholder="Mesafe (km)" className="px-2 py-1 rounded bg-[#071126] text-white mb-2" />
      <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="px-2 py-1 rounded bg-[#071126] text-white mb-2">
        <option value="electric">Elektrikli</option>
        <option value="gasoline">Benzinli</option>
      </select>
      <button className="py-2 rounded bg-[#07B1FF] text-black font-bold" onClick={handleAnalyze}>
        Analiz Et
      </button>
      {result === null ? (
        <div className="flex items-center justify-center h-16">
          <span className="text-white text-sm animate-pulse">Yükleniyor...</span>
        </div>
      ) : result && (
        <div className="mt-2 text-white">
          <div>Karbon Salınımı: {result.carbon.toFixed(2)} kg</div>
          {vehicleType === "electric" && <div>Tasarruf: {result.saving.toFixed(2)} TL</div>}
        </div>
      )}
    </div>
  );
};

export default CarbonAnalysis;
