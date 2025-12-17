import type { Station } from "../types/station";

export const stationsMock: Station[] = [
  {
    id: 1,
    name: "ŞarjNoktam Beşiktaş",
    distKm: 0.8,
    type: "DC",
    powerKw: 120,
    status: "ACTIVE",
    mapX: 30,
    mapY: 40,
  },
  {
    id: 2,
    name: "ŞarjNoktam Zorlu",
    distKm: 2.5,
    type: "DC",
    powerKw: 180,
    status: "BUSY",
    mapX: 70,
    mapY: 30,
  },
  {
    id: 3,
    name: "ŞarjNoktam Akasya",
    distKm: 4.1,
    type: "AC",
    powerKw: 22,
    status: "ACTIVE",
    mapX: 60,
    mapY: 70,
  },
  {
    id: 4,
    name: "ŞarjNoktam Levent",
    distKm: 2.1,
    type: "AC",
    powerKw: 22,
    status: "OFFLINE",
    mapX: 52,
    mapY: 38,
  },
];
