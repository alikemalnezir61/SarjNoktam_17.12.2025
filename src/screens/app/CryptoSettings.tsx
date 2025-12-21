import React, { useState } from "react";

const CryptoSettings: React.FC<{ userId: string }> = ({ userId }) => {
  const [status, setStatus] = useState("");

  const handleEncrypt = async () => {
    const res = await fetch('/api/user/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (res.ok) setStatus("Verileriniz şifrelendi.");
    else setStatus("Bir hata oluştu.");
  };

  const handleDecrypt = async () => {
    const res = await fetch('/api/user/decrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (res.ok) setStatus("Verileriniz çözüldü.");
    else setStatus("Bir hata oluştu.");
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Veri Şifreleme</h4>
      <div className="flex gap-2 mb-2">
        <button className="py-2 px-4 rounded bg-[#07B1FF] text-black font-bold" onClick={handleEncrypt}>
          Verilerimi Şifrele
        </button>
        <button className="py-2 px-4 rounded bg-[#222c3a] text-white font-bold" onClick={handleDecrypt}>
          Şifreyi Çöz
        </button>
      </div>
      {status && <div className="mt-2 text-white">{status}</div>}
    </div>
  );
};

export default CryptoSettings;
