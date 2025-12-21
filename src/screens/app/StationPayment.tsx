import React, { useEffect, useState } from "react";

const StationPayment: React.FC<{ stationId: number; userId: string }> = ({ stationId, userId }) => {
  const [providers, setProviders] = useState<string[]>([]);
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch('/api/payment/providers')
      .then(res => res.json())
      .then(setProviders);
  }, []);

  const handlePay = async () => {
    setStatus("");
    const res = await fetch('/api/payment/pay', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, stationId, provider, amount })
    });
    const data = await res.json();
    setStatus(data.status === 'success' ? 'Ödeme başarılı!' : 'Ödeme başarısız!');
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold text-white mb-2">Ödeme & Sağlayıcı Seçimi</h4>
      <select value={provider} onChange={e => setProvider(e.target.value)} className="px-2 py-1 rounded bg-[#071126] text-white mb-2">
        <option value="">Sağlayıcı Seçin</option>
        {providers.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Tutar" className="px-2 py-1 rounded bg-[#071126] text-white mb-2" />
      <button className="py-2 rounded bg-[#07B1FF] text-black font-bold" onClick={handlePay} disabled={!provider || amount <= 0}>
        Ödeme Yap
      </button>
      {status && <div className="mt-2 text-white">{status}</div>}
    </div>
  );
};

export default StationPayment;
