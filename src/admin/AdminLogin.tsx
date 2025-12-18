import React, { useState } from 'react';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Her giriş başarılı
    if (username && password) {
      onLogin();
    } else {
      setError('Kullanıcı adı ve şifre giriniz.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-[#181f2a] p-8 rounded-xl shadow-lg w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-white mb-2">Admin Girişi</h2>
        <input
          className="p-3 rounded bg-gray-800 text-white focus:outline-none"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="p-3 rounded bg-gray-800 text-white focus:outline-none"
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-[#07B1FF] hover:bg-[#0590d1] text-white font-bold py-2 rounded transition">Giriş Yap</button>
      </form>
    </div>
  );
}
