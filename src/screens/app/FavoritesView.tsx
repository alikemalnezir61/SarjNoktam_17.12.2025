import React from "react";

export default function FavoritesView() {
  // Favori istasyonlar burada listelenecek (state/context ile bağlanacak)
  return (
    <div className="h-full bg-[#1a1a1a] pb-32 text-white overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Favori İstasyonlarım</h2>
      <div className="text-gray-400">Henüz favori eklemediniz.</div>
    </div>
  );
}
