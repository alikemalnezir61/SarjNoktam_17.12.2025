import React, { useEffect, useState } from "react";

const StationReservation: React.FC<{ stationId: number; user: string }> = ({ stationId, user }) => {
  const [reservations, setReservations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/station/${stationId}/reservations`)
      .then(res => res.json())
      .then(setReservations);
  }, [stationId]);

  const handleReserve = async () => {
    setLoading(true);
    await fetch(`/api/station/${stationId}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    });
    fetch(`/api/station/${stationId}/reservations`)
      .then(res => res.json())
      .then(setReservations);
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    await fetch(`/api/station/${stationId}/reservations`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    });
    fetch(`/api/station/${stationId}/reservations`)
      .then(res => res.json())
      .then(setReservations);
    setLoading(false);
  };

  const isReserved = reservations.includes(user);

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold text-white mb-2">Rezervasyon & Sıra Takibi</h4>
      <div className="mb-2 text-white">Sıradakiler: {reservations.join(", ") || "Yok"}</div>
      {isReserved ? (
        <button className="py-2 rounded bg-red-500 text-white font-bold" onClick={handleCancel} disabled={loading}>
          Rezervasyonu İptal Et
        </button>
      ) : (
        <button className="py-2 rounded bg-[#07B1FF] text-black font-bold" onClick={handleReserve} disabled={loading}>
          Rezervasyon Yap
        </button>
      )}
    </div>
  );
};

export default StationReservation;
