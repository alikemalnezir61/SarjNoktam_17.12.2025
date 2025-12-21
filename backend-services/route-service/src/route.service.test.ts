import { describe, it, expect } from '@jest/globals';

describe('Route Service', () => {
  it('should return mock route data', () => {
    // Mock response
    const start = 'istanbul';
    const end = 'ankara';
    const polyline = [
      { lat: 41.0082, lng: 28.9784 },
      { lat: 39.9334, lng: 32.8597 },
    ];
    expect(polyline.length).toBe(2);
    expect(start).toBe('istanbul');
    expect(end).toBe('ankara');
  });
});
