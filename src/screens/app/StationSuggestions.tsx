import React, { useEffect, useState } from "react";

const StationSuggestions: React.FC<{ userId: string }> = ({ userId }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    // Mock öneri algoritması: En yakın ve müsait istasyonları öner
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        const available = data.filter((s: any) => s.status === 'AVAILABLE');
        setSuggestions(available.slice(0, 3));
      });
  }, [userId]);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Sizin İçin Önerilen İstasyonlar</h4>
      {suggestions.length === 0 ? (
        <div className="text-gray-400">Şu anda öneri yok.</div>
      ) : (
        <ul>
          {suggestions.map(s => (
            <li key={s.id} className="mb-2 p-2 rounded bg-[#071126] text-white">
              <div className="font-bold">{s.name}</div>
              <div className="text-xs text-gray-400">Durum: {s.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StationSuggestions;
