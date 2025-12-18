import React, { useState } from "react";

// Basit bir Gemini sohbet barı bileşeni
export default function GeminiChatBar({ onSend }: { onSend: (q: string) => void }) {
  const [input, setInput] = useState("");
  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
      <form
        className="flex bg-[#121826] border border-white/10 rounded-full shadow-lg overflow-hidden"
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            onSend(input);
            setInput("");
          }
        }}
      >
        <input
          className="flex-1 px-4 py-3 bg-transparent text-white outline-none"
          placeholder="Şarjlı araçlarla ilgili bir soru sor..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="px-5 py-3 bg-[#07B1FF] text-black font-bold">Sor</button>
      </form>
    </div>
  );
}
