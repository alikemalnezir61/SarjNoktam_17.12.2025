
import type { Station } from "../types/station";
import type { Company } from "./AdminStationsForm";

export default function AdminStationsList({ stations, companies }: { stations: Station[]; companies: Company[] }) {
  return (
    <div className="bg-[#232c3d] p-6 rounded-lg mt-8 max-w-4xl mx-auto overflow-x-auto">
      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-[#181f2a]">
            <th className="px-4 py-2">Adı</th>
            <th className="px-4 py-2">Firma</th>
            <th className="px-4 py-2">Tip</th>
            <th className="px-4 py-2">Güç (kW)</th>
            <th className="px-4 py-2">Durum</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((s) => {
            const company = companies.find((c) => c.id === (s as any).companyId);
            return (
              <tr key={s.id} className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{s.name}</td>
                <td className="px-4 py-2">{company ? company.name : '-'}</td>
                <td className="px-4 py-2">{s.type}</td>
                <td className="px-4 py-2">{s.powerKw}</td>
                <td className="px-4 py-2">
                  <span className={
                    s.status === "ACTIVE"
                      ? "text-green-400"
                      : s.status === "BUSY"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }>
                    {s.status === "ACTIVE"
                      ? "Aktif"
                      : s.status === "BUSY"
                      ? "Dolu"
                      : "Kapalı"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
