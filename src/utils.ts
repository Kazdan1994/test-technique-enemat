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
