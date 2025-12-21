import React, { useState } from "react";

const DataExport: React.FC<{ userId: string }> = ({ userId }) => {
  const [status, setStatus] = useState("");

  const handleExport = async () => {
    const res = await fetch('/api/user/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'verilerim.json';
      a.click();
      setStatus("Veriler indirildi.");
    } else {
      setStatus("Bir hata oluştu.");
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Veri Dışa Aktar</h4>
      <button className="py-2 px-4 rounded bg-[#07B1FF] text-black font-bold" onClick={handleExport}>
        Verilerimi İndir
      </button>
      {status && <div className="mt-2 text-white">{status}</div>}
    </div>
  );
};

export default DataExport;
