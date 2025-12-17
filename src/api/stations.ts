import type { Station } from "../types/station";
import { stationsMock } from "../mock/stations.mock";

/**
 * ŞİMDİLİK MOCK:
 * Backend gelince burayı apiClient ile değiştireceğiz.
 */
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export const stationsApi = {
  async list(query?: { search?: string; type?: "AC" | "DC" }) {
    await sleep(400); // kullanıcı “yükleniyor” görsün diye küçük gecikme

    let data: Station[] = [...stationsMock];

    if (query?.type) {
      data = data.filter((s) => s.type === query.type);
    }

    if (query?.search) {
      const q = query.search.toLowerCase();
      data = data.filter((s) => s.name.toLowerCase().includes(q));
    }

    // mesafeye göre sırala
    data.sort((a, b) => a.distKm - b.distKm);

    return { items: data };
  },
};
