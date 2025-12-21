import React, { useEffect, useState } from "react";

const TripGroups: React.FC<{ groupId: string; user: string }> = ({ groupId, user }) => {
  const [trip, setTrip] = useState<{ users: string[]; route: string }>({ users: [], route: "" });
  const [newRoute, setNewRoute] = useState("");

  useEffect(() => {
    fetch(`/api/user/${groupId}/trip`)
      .then(res => res.json())
      .then(setTrip);
  }, [groupId]);

  const handleJoin = async () => {
    await fetch(`/api/user/${groupId}/trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, route: newRoute || trip.route })
    });
    fetch(`/api/user/${groupId}/trip`)
      .then(res => res.json())
      .then(setTrip);
  };

  const handleLeave = async () => {
    await fetch(`/api/user/${groupId}/trip`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    });
    fetch(`/api/user/${groupId}/trip`)
      .then(res => res.json())
      .then(setTrip);
  };

  const isMember = trip.users.includes(user);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Grup Yolculuk & Paylaşım</h4>
      <div className="mb-2 text-white">Grup üyeleri: {trip.users.join(", ") || "Yok"}</div>
      <div className="mb-2 text-white">Rota: {trip.route || "Belirtilmemiş"}</div>
      <input type="text" value={newRoute} onChange={e => setNewRoute(e.target.value)} placeholder="Yeni rota (isteğe bağlı)" className="px-2 py-1 rounded bg-[#071126] text-white mb-2" />
      {isMember ? (
        <button className="py-2 rounded bg-red-500 text-white font-bold" onClick={handleLeave}>
          Gruptan Ayrıl
        </button>
      ) : (
        <button className="py-2 rounded bg-[#07B1FF] text-black font-bold" onClick={handleJoin}>
          Gruba Katıl
        </button>
      )}
    </div>
  );
};

export default TripGroups;
