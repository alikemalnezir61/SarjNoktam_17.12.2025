
import React, { useState } from 'react';

type Company = {
  id: number;
  name: string;
  address: string;
  phone: string;
  contact: string;
  website: string;
};

export default function AdminStations() {
  const [companies, setCompanies] = useState<Company[]>([
    { id: 1, name: 'ZES', address: 'İstanbul, Levent', phone: '0212 000 00 00', contact: 'Ahmet Yılmaz', website: 'https://zes.com' },
    { id: 2, name: 'Tesla', address: 'Ankara, Çankaya', phone: '0312 000 00 00', contact: 'Elon Musk', website: 'https://tesla.com' },
    { id: 3, name: 'Eşarj', address: 'İzmir, Bornova', phone: '0232 000 00 00', contact: 'Mehmet Demir', website: 'https://esarj.com' },
    { id: 4, name: 'Trugo', address: 'Bursa, Nilüfer', phone: '0224 000 00 00', contact: 'Ayşe Kaya', website: 'https://trugo.com' },
    { id: 5, name: 'Voltrun', address: 'Antalya, Muratpaşa', phone: '0242 000 00 00', contact: 'Canan Aksoy', website: 'https://voltrun.com' },
  ]);
  const [form, setForm] = useState({ name: '', address: '', phone: '', contact: '', website: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setCompanies(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        contact: form.contact.trim(),
        website: form.website.trim(),
      },
    ]);
    setForm({ name: '', address: '', phone: '', contact: '', website: '' });
  };

  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-6 text-center">Firmalar Yönetimi</h2>
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-8">
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Firma adı"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Adres"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Telefon"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Kontak Kişi"
          name="contact"
          value={form.contact}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Web sitesi"
          name="website"
          value={form.website}
          onChange={handleChange}
        />
        <button type="submit" className="bg-[#07B1FF] hover:bg-[#0596d6] text-white font-bold py-2 px-6 rounded col-span-1 md:col-span-5">Ekle</button>
      </form>
      <div className="bg-[#232c3d] p-6 rounded-lg max-w-5xl mx-auto overflow-x-auto">
        <h3 className="text-lg text-white font-semibold mb-4">Firmalar</h3>
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-[#181f2a]">
              <th className="px-4 py-2">Adı</th>
              <th className="px-4 py-2">Adres</th>
              <th className="px-4 py-2">Telefon</th>
              <th className="px-4 py-2">Kontak</th>
              <th className="px-4 py-2">Web Sitesi</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id} className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{c.name}</td>
                <td className="px-4 py-2">{c.address}</td>
                <td className="px-4 py-2">{c.phone}</td>
                <td className="px-4 py-2">{c.contact}</td>
                <td className="px-4 py-2">
                  {c.website ? (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-[#07B1FF] underline">{c.website}</a>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
