import React, { useEffect, useState } from "react";

const PriceComparison: React.FC = () => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/station/prices')
      .then(res => res.json())
      .then(setPrices);
  }, []);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-white mb-2">Dinamik Fiyat Takibi & Karşılaştırma</h4>
      {prices.length === 0 ? (
        <div className="text-gray-400">Fiyat verisi yok.</div>
      ) : (
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="text-left">İstasyon</th>
              <th className="text-left">Fiyat (₺/kWh)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PriceComparison;
