import React, { useEffect, useState } from "react";

const Notifications: React.FC<{ userId: string }> = ({ userId }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/user/notifications?userId=' + userId)
      .then(res => res.json())
      .then(setNotifications);
  }, [userId]);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Bildirimler</h4>
      {notifications.length === 0 ? (
        <div className="text-gray-400">Henüz bildiriminiz yok.</div>
      ) : (
        <ul className="text-white">
          {notifications.map((n, i) => (
            <li key={i} className="mb-2 p-2 rounded bg-[#071126]">
              <span className="font-bold">{n.title}</span>
              <div className="text-xs text-gray-400">{n.time}</div>
              <div>{n.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
