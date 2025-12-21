import React, { useEffect, useState } from "react";

const VehicleInfo: React.FC<{ userId: string }> = ({ userId }) => {
  const [vehicle, setVehicle] = useState<{ battery: number; range: number } | null>(null);
  const [battery, setBattery] = useState(80);
  const [range, setRange] = useState(250);

  useEffect(() => {
    fetch(`/api/user/${userId}/vehicle`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.battery === 'number' && typeof data.range === 'number') {
          setVehicle(data);
        } else {
          setVehicle({ battery: 80, range: 250 }); // Placeholder veri
        }
      })
      .catch(() => setVehicle({ battery: 80, range: 250 })); // Hata olursa placeholder
  }, [userId]);

  const handleUpdate = async () => {
    await fetch(`/api/user/${userId}/vehicle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ battery, range })
    });
    fetch(`/api/user/${userId}/vehicle`)
      .then(res => res.json())
      .then(setVehicle);
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Araç Bilgisi & API Entegrasyonu</h4>
      {!vehicle ? (
        <div className="flex items-center justify-center h-24">
          <span className="text-white text-sm animate-pulse">Yükleniyor...</span>
        </div>
      ) : (
        <>
          <div className="text-white mb-2">
            Batarya: {vehicle.battery}% | Menzil: {vehicle.range} km
            {!vehicle && <span className="ml-2 text-xs text-yellow-400">(Örnek veri)</span>}
          </div>
          <input type="number" value={battery} onChange={e => setBattery(Number(e.target.value))} placeholder="Batarya (%)" className="px-2 py-1 rounded bg-[#071126] text-white mb-2" />
          <input type="number" value={range} onChange={e => setRange(Number(e.target.value))} placeholder="Menzil (km)" className="px-2 py-1 rounded bg-[#071126] text-white mb-2" />
          <button className="py-2 rounded bg-[#07B1FF] text-black font-bold" onClick={handleUpdate}>
            Bilgileri Güncelle
          </button>
        </>
      )}
    </div>
  );
};

export default VehicleInfo;
