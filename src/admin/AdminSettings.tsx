import React, { useState } from 'react';

export default function AdminSettings() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('tr');

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl text-white font-bold mb-6 text-center">Ayarlar</h2>
      <div className="bg-[#232c3d] p-6 rounded-lg flex flex-col gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">Tema</label>
          <select
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="dark">Koyu</option>
            <option value="light">Açık</option>
          </select>
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Dil</label>
          <select
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            value={lang}
            onChange={e => setLang(e.target.value)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}
