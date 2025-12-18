import React, { useState } from 'react';

type Favorite = {
  id: number;
  type: 'Firma' | 'İstasyon';
  name: string;
};

export default function AdminFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([
    { id: 1, type: 'Firma', name: 'ZES' },
    { id: 2, type: 'İstasyon', name: 'Zorlu Center' },
  ]);
  const [form, setForm] = useState({ type: 'Firma', name: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setFavorites(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: form.type as 'Firma' | 'İstasyon',
        name: form.name.trim(),
      },
    ]);
    setForm({ type: 'Firma', name: '' });
  };

  const handleRemove = (id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-6 text-center">Favoriler Yönetimi</h2>
      <form onSubmit={handleAdd} className="flex gap-4 max-w-xl mx-auto mb-8">
        <select
          className="px-4 py-2 rounded bg-gray-800 text-white"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="Firma">Firma</option>
          <option value="İstasyon">İstasyon</option>
        </select>
        <input
          className="flex-1 px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Ad (Firma/İstasyon)"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-[#07B1FF] hover:bg-[#0596d6] text-white font-bold py-2 px-6 rounded">Ekle</button>
      </form>
      <div className="bg-[#232c3d] p-6 rounded-lg max-w-xl mx-auto">
        <h3 className="text-lg text-white font-semibold mb-4">Favoriler</h3>
        <ul className="divide-y divide-gray-700">
          {favorites.map(f => (
            <li key={f.id} className="py-2 flex justify-between items-center text-white">
              <span><span className="font-bold">[{f.type}]</span> {f.name}</span>
              <button onClick={() => handleRemove(f.id)} className="text-red-400 hover:underline">Kaldır</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
