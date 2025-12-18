import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// Demo/mock veriler
const stats = {
  totalUsers: 1200,
  activeUsers: 320,
  totalStations: 48,
  totalFavorites: 210,
};

const brandData = [
  { name: 'ZES', value: 18 },
  { name: 'Tesla', value: 12 },
  { name: 'Eşarj', value: 8 },
  { name: 'Trugo', value: 6 },
  { name: 'Voltrun', value: 4 },
];
const COLORS = ['#07B1FF', '#FF6384', '#FFCE56', '#36A2EB', '#8B5CF6'];

const topStations = [
  { name: 'Zorlu Center', uses: 54 },
  { name: 'Kanyon AVM', uses: 41 },
  { name: 'Maltepe Park', uses: 33 },
  { name: 'Bolu Highway', uses: 27 },
  { name: 'Ataşehir', uses: 19 },
];

const userGrowth = [
  { month: 'Tem', users: 800 },
  { month: 'Ağu', users: 900 },
  { month: 'Eyl', users: 1000 },
  { month: 'Eki', users: 1100 },
  { month: 'Kas', users: 1200 },
];

export default function AdminMain({ setActivePage }: { setActivePage?: (p: string) => void }) {
  const handleQuickAction = (action: string) => {
    if (!setActivePage) return;
    if (action === 'company') setActivePage('Firmalar');
    else if (action === 'user') setActivePage('Kullanıcılar');
    else if (action === 'favorite') setActivePage('Favoriler');
    else if (action === 'notification') setActivePage('Bildirimler');
    else if (action === 'settings') setActivePage('Ayarlar');
    else if (action === 'report') alert('Rapor alma özelliği yakında!');
  };
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Yönetim Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col items-center">
          <div className="text-4xl mb-2">👤</div>
          <div className="text-lg font-bold">Toplam Kullanıcı</div>
          <div className="text-2xl mt-1">{stats.totalUsers}</div>
        </div>
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col items-center">
          <div className="text-4xl mb-2">🟢</div>
          <div className="text-lg font-bold">Aktif Kullanıcı</div>
          <div className="text-2xl mt-1">{stats.activeUsers}</div>
        </div>
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col items-center">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-lg font-bold">İstasyon Adedi</div>
          <div className="text-2xl mt-1">{stats.totalStations}</div>
        </div>
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col items-center">
          <div className="text-4xl mb-2">❤️</div>
          <div className="text-lg font-bold">Favoriler</div>
          <div className="text-2xl mt-1">{stats.totalFavorites}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col">
          <div className="font-bold mb-4">Marka Dağılımı</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={brandData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {brandData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col">
          <div className="font-bold mb-4">Kullanıcı Büyümesi (Son 5 Ay)</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={userGrowth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#07B1FF" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col">
          <div className="font-bold mb-4">En Çok Kullanılan İstasyonlar</div>
          <ol className="list-decimal pl-6 space-y-2">
            {topStations.map((s, i) => (
              <li key={s.name} className="flex justify-between"><span>{s.name}</span><span className="font-bold text-[#07B1FF]">{s.uses} kez</span></li>
            ))}
          </ol>
        </div>
        <div className="bg-[#232c3d] rounded-xl p-6 shadow flex flex-col">
          <div className="font-bold mb-4">Hızlı Aksiyonlar</div>
          <div className="flex flex-wrap gap-3">
            <button
              className="bg-[#07B1FF] hover:bg-[#0590d1] text-white font-bold py-2 px-4 rounded transition"
              onClick={() => handleQuickAction('company')}
            >
              Yeni Firma Ekle
            </button>
            <button
              className="bg-[#181f2a] hover:bg-[#232c3d] text-white font-bold py-2 px-4 rounded transition"
              onClick={() => handleQuickAction('user')}
            >
              Kullanıcı Yönet
            </button>
            <button
              className="bg-[#181f2a] hover:bg-[#232c3d] text-white font-bold py-2 px-4 rounded transition"
              onClick={() => handleQuickAction('favorite')}
            >
              Favoriler
            </button>
            <button
              className="bg-[#181f2a] hover:bg-[#232c3d] text-white font-bold py-2 px-4 rounded transition"
              onClick={() => handleQuickAction('notification')}
            >
              Bildirimler
            </button>
            <button
              className="bg-[#181f2a] hover:bg-[#232c3d] text-white font-bold py-2 px-4 rounded transition"
              onClick={() => handleQuickAction('settings')}
            >
              Ayarlar
            </button>
            <button
              className="bg-[#181f2a] hover:bg-[#232c3d] text-white font-bold py-2 px-4 rounded transition"
              onClick={() => handleQuickAction('report')}
            >
              Rapor Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
