export interface RoundLocation {
  imageId: string;
  lat: number;
  lng: number;
}

export interface Guess {
  lat: number;
  lng: number;
}

export interface RoundResult {
  round: RoundLocation;
  guess: Guess | null;
  distanceKm: number;
  points: number;
}

export const TOTAL_ROUNDS = 5;
export const MAX_POINTS_PER_ROUND = 5000;
