import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Ali Yılmaz', email: 'ali@example.com', phone: '0555 111 11 11', role: 'Admin' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '0555 222 22 22', role: 'Kullanıcı' },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '0555 333 33 33', role: 'Kullanıcı' },
  ]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'Kullanıcı' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setUsers(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
      },
    ]);
    setForm({ name: '', email: '', phone: '', role: 'Kullanıcı' });
  };

  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-6 text-center">Kullanıcılar Yönetimi</h2>
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Ad Soyad"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="E-posta"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Telefon"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <select
          className="px-4 py-2 rounded bg-gray-800 text-white"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Kullanıcı">Kullanıcı</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="bg-[#07B1FF] hover:bg-[#0596d6] text-white font-bold py-2 px-6 rounded col-span-1 md:col-span-4">Ekle</button>
      </form>
      <div className="bg-[#232c3d] p-6 rounded-lg max-w-4xl mx-auto overflow-x-auto">
        <h3 className="text-lg text-white font-semibold mb-4">Kullanıcılar</h3>
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-[#181f2a]">
              <th className="px-4 py-2">Ad Soyad</th>
              <th className="px-4 py-2">E-posta</th>
              <th className="px-4 py-2">Telefon</th>
              <th className="px-4 py-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.phone}</td>
                <td className="px-4 py-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
