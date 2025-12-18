import React from 'react';

const menu = [
  { label: 'Dashboard', icon: '🏠' },
  { label: 'Firmalar', icon: '🏢' },
  { label: 'Kullanıcılar', icon: '👤' },
  { label: 'Favoriler', icon: '❤️' },
  { label: 'Bildirimler', icon: '🔔' },
  { label: 'Ayarlar', icon: '⚙️' },
];

export default function AdminSidebar({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) {
  return (
    <aside className="w-64 bg-[#181f2a] text-white flex flex-col py-8 px-4 min-h-screen">
      <div className="text-2xl font-bold mb-8 text-[#07B1FF] text-center">SarjNoktam Admin</div>
      <nav className="flex-1 flex flex-col gap-2">
        {menu.map(item => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${activePage === item.label ? 'bg-[#232c3d] font-bold text-[#07B1FF]' : 'hover:bg-[#232c3d]'}`}
            onClick={() => setActivePage(item.label)}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
