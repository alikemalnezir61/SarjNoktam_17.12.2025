import React, { useEffect, useState } from "react";

const OccupancyForecast: React.FC<{ stationId: number }> = ({ stationId }) => {
  const [forecast, setForecast] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/station/${stationId}/occupancy-forecast`)
      .then(res => res.json())
      .then(setForecast);
  }, [stationId]);

  if (!forecast) {
    return <div className="text-gray-400">Doluluk tahmini verisi yok.</div>;
  }

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Doluluk Tahmini</h4>
      <div className="bg-[#071126] rounded p-4 text-white">
        <div className="font-bold text-lg mb-1">Bugün: {forecast.today}%</div>
        <div className="text-sm">Yarın: {forecast.tomorrow}%</div>
        <div className="text-sm">Hafta Sonu: {forecast.weekend}%</div>
      </div>
    </div>
  );
};

export default OccupancyForecast;
