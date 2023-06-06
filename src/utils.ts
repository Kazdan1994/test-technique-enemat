import { faker } from "@faker-js/faker";

/**
 * Generate random location near by origin
 *
 * @param {[number, number]} origin
 */
export function randomLocation(origin: [number, number]) {
  const [longitude, latitude] = faker.location.nearbyGPSCoordinate({
    origin,
    radius: 2,
    isMetric: true,
  });

  return { lat: latitude, lng: longitude };
}

export const defaultMapOptions = {
  center: {
    lat: 40.748817,
    lng: -73.985428,
  },
  zoom: 14,
};
