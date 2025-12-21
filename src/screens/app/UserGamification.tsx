import React, { useEffect, useState } from "react";

const UserGamification: React.FC<{ userId: string }> = ({ userId }) => {
  const [data, setData] = useState<{ badges: string[]; level: number; points: number }>({ badges: [], level: 1, points: 0 });

  useEffect(() => {
    fetch(`/api/user/${userId}/gamification`)
      .then(res => res.json())
      .then(setData);
  }, [userId]);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Rozetler & Seviye & Puan</h4>
      <div className="text-white mb-2">Seviye: {data.level} | Puan: {data.points}</div>
      <div className="flex gap-2 flex-wrap">
        {data.badges.length === 0 ? (
          <span className="text-gray-400">Rozetiniz yok.</span>
        ) : (
          data.badges.map((badge, i) => (
            <span key={i} className="px-3 py-1 rounded bg-[#07B1FF] text-black font-bold">{badge}</span>
          ))
        )}
      </div>
    </div>
  );
};

export default UserGamification;
