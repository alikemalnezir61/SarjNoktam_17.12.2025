import React, { useEffect, useState } from "react";

const PrivacySettings: React.FC<{ userId: string }> = ({ userId }) => {
  const [status, setStatus] = useState("");

  const handleDelete = async () => {
    const res = await fetch('/api/user/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (res.ok) setStatus("Verileriniz silindi.");
    else setStatus("Bir hata oluştu.");
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Gizlilik & Veri Silme</h4>
      <button className="py-2 px-4 rounded bg-red-500 text-white font-bold" onClick={handleDelete}>
        Tüm Verilerimi Sil
      </button>
      {status && <div className="mt-2 text-white">{status}</div>}
    </div>
  );
};

export default PrivacySettings;
