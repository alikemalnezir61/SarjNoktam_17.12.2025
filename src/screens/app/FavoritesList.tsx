import React, { useEffect, useState } from "react";

const FavoritesList: React.FC<{ userId: string }> = ({ userId }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [stations, setStations] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/user/${userId}/favorites`)
      .then(res => res.json())
      .then(setFavorites);
    fetch('/api/status')
      .then(res => res.json())
      .then(setStations);
  }, [userId]);

  const favoriteStations = stations.filter(s => favorites.includes(s.id));

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Favori İstasyonlarım</h4>
      {favoriteStations.length === 0 ? (
        <div className="text-gray-400">Favori istasyonunuz yok.</div>
      ) : (
        <ul>
          {favoriteStations.map(s => (
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

export default FavoritesList;
