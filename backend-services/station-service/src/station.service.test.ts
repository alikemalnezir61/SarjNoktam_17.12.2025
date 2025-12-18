import { addStation, listStations } from './station.service';

describe('Station Service', () => {
  it('should add a new station', async () => {
    const station = await addStation({ name: 'Station A', location: 'Location X' });
    expect(station).toHaveProperty('id');
    expect(station.name).toBe('Station A');
    expect(station.location).toBe('Location X');
  });

  it('should list all stations', async () => {
    await addStation({ name: 'Station B', location: 'Location Y' });
    const stations = await listStations();
    expect(Array.isArray(stations)).toBe(true);
    expect(stations.length).toBeGreaterThan(0);
  });
});
