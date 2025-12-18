import React, { useState } from "react";
import type { StationType, StationStatus } from "../types/station";

export type Company = {
  id: number;
  name: string;
};

export type StationFormValues = {
  name: string;
  type: StationType;
  powerKw: number;
  status: StationStatus;
  companyId: number;
};

const initialForm: StationFormValues = {
  name: "",
  type: "AC",
  powerKw: 22,
  status: "ACTIVE",
  companyId: 1,
};

const companies: Company[] = [
  { id: 1, name: "ZES" },
  { id: 2, name: "Tesla" },
  { id: 3, name: "Eşarj" },
  { id: 4, name: "Trugo" },
  { id: 5, name: "Voltrun" },
];

export default function AdminStationsForm({ onAdd }: { onAdd: (station: StationFormValues) => void }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "powerKw" || name === "companyId" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#232c3d] p-6 rounded-lg flex flex-col gap-4 max-w-xl mx-auto">
      <div className="flex gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="İstasyon Adı"
          className="flex-1 px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <select
          name="companyId"
          value={form.companyId}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        >
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        >
          <option value="AC">AC</option>
          <option value="DC">DC</option>
        </select>
        <input
          name="powerKw"
          type="number"
          value={form.powerKw}
          onChange={handleChange}
          placeholder="Güç (kW)"
          className="w-32 px-4 py-2 rounded bg-gray-800 text-white"
          min={1}
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        >
          <option value="ACTIVE">Aktif</option>
          <option value="BUSY">Dolu</option>
          <option value="OFFLINE">Kapalı</option>
        </select>
      </div>
      <button type="submit" className="bg-[#07B1FF] hover:bg-[#0596d6] text-white font-bold py-2 px-6 rounded self-end">Ekle</button>
    </form>
  );
}
