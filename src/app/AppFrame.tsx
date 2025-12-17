import React from 'react';

export default function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 font-sans p-4">
      <div className="relative w-[390px] h-[844px] bg-[#0B0F17] rounded-[45px] overflow-hidden shadow-[0_0_60px_rgba(7,177,255,0.1)] border-[8px] border-[#1a1f2e]">
        {children}
      </div>
    </div>
  );
}
