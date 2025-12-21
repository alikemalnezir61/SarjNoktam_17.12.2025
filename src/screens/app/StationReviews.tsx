import React, { useEffect, useState } from "react";

const StationReviews: React.FC<{ stationId: number }> = ({ stationId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`/api/station/${stationId}/reviews`)
      .then(res => res.json())
      .then(setReviews);
  }, [stationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/station/${stationId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, rating, comment })
    });
    setComment("");
    setUser("");
    setRating(5);
    // Refresh
    fetch(`/api/station/${stationId}/reviews`)
      .then(res => res.json())
      .then(setReviews);
  };

  return (
    <div>
      <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit}>
        <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="Adınız" className="px-2 py-1 rounded bg-[#071126] text-white" required />
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="px-2 py-1 rounded bg-[#071126] text-white">
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Yıldız</option>)}
        </select>
        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Yorumunuz" className="px-2 py-1 rounded bg-[#071126] text-white" />
        <button type="submit" className="py-2 rounded bg-[#07B1FF] text-black font-bold">Yorumu Gönder</button>
      </form>
      <div>
        {reviews.length === 0 ? <div className="text-gray-400">Henüz yorum yok.</div> : reviews.map((r, i) => (
          <div key={i} className="mb-2 p-2 rounded bg-[#071126] text-white">
            <div className="font-bold">{r.user} <span className="text-yellow-400">{"★".repeat(r.rating)}</span></div>
            <div>{r.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationReviews;
