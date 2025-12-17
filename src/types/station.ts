export type StationStatus = "ACTIVE" | "BUSY" | "OFFLINE";
export type StationType = "AC" | "DC";

export type Station = {
  id: number;
  name: string;
  distKm: number; // örn: 0.8
  type: StationType; // AC/DC
  powerKw: number; // örn: 120
  status: StationStatus;

  // Şimdilik görsel map için (fake koordinat / yüzde)
  mapX: number; // 0-100
  mapY: number; // 0-100
};
