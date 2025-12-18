interface Station {
  id: number;
  name: string;
  location: string;
}

const stations: Station[] = [];

export const addStation = async (data: { name: string; location: string }) => {
  const station: Station = {
    id: stations.length + 1,
    name: data.name,
    location: data.location
  };
  stations.push(station);
  return station;
};

export const listStations = async () => {
  return stations;
};
