import { MAX_POINTS_PER_ROUND } from "./types";

const EARTH_RADIUS_KM = 6371;

/** Great-circle distance between two lat/lng points, in kilometres. */
export function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Classic-mode style scoring curve: near-perfect guesses score close to the
 * max, and score decays exponentially with distance. Scale tuned so that a
 * guess ~1000km off still nets a modest score, matching the "world map" feel.
 */
export function scoreFromDistance(distanceKm: number): number {
  if (distanceKm < 0.15) return MAX_POINTS_PER_ROUND;
  const scaleKm = 2000;
  const raw = MAX_POINTS_PER_ROUND * Math.exp(-distanceKm / scaleKm);
  return Math.max(0, Math.round(raw));
}

/** Initial compass bearing (0-360, 0 = north) from point A to point B. */
export function bearingDegrees(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  const bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  if (distanceKm < 10) return `${distanceKm.toFixed(2)} km`;
  return `${Math.round(distanceKm).toLocaleString("sk-SK")} km`;
}
