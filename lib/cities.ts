export interface SeedPoint {
  label: string;
  lat: number;
  lng: number;
}

/**
 * Mapillary's coverage is very uneven across the globe - some regions are
 * densely mapped, others have almost nothing. Picking a fully random
 * lat/lng would fail most of the time. Instead we jitter around a curated
 * list of populated places with known crowdsourced coverage, spread across
 * every inhabited continent, so "classic mode" still feels like the whole
 * world is in play.
 */
export const SEED_POINTS: SeedPoint[] = [
  // Europe
  { label: "Bratislava, SK", lat: 48.1486, lng: 17.1077 },
  { label: "Kosice, SK", lat: 48.7164, lng: 21.2611 },
  { label: "Prague, CZ", lat: 50.0755, lng: 14.4378 },
  { label: "Brno, CZ", lat: 49.1951, lng: 16.6068 },
  { label: "Vienna, AT", lat: 48.2082, lng: 16.3738 },
  { label: "Budapest, HU", lat: 47.4979, lng: 19.0402 },
  { label: "Krakow, PL", lat: 50.0647, lng: 19.945 },
  { label: "Warsaw, PL", lat: 52.2297, lng: 21.0122 },
  { label: "Berlin, DE", lat: 52.52, lng: 13.405 },
  { label: "Munich, DE", lat: 48.1351, lng: 11.582 },
  { label: "Hamburg, DE", lat: 53.5511, lng: 9.9937 },
  { label: "Amsterdam, NL", lat: 52.3676, lng: 4.9041 },
  { label: "Rotterdam, NL", lat: 51.9244, lng: 4.4777 },
  { label: "Brussels, BE", lat: 50.8503, lng: 4.3517 },
  { label: "Paris, FR", lat: 48.8566, lng: 2.3522 },
  { label: "Lyon, FR", lat: 45.764, lng: 4.8357 },
  { label: "Marseille, FR", lat: 43.2965, lng: 5.3698 },
  { label: "London, UK", lat: 51.5074, lng: -0.1278 },
  { label: "Manchester, UK", lat: 53.4808, lng: -2.2426 },
  { label: "Edinburgh, UK", lat: 55.9533, lng: -3.1883 },
  { label: "Dublin, IE", lat: 53.3498, lng: -6.2603 },
  { label: "Madrid, ES", lat: 40.4168, lng: -3.7038 },
  { label: "Barcelona, ES", lat: 41.3874, lng: 2.1686 },
  { label: "Seville, ES", lat: 37.3891, lng: -5.9845 },
  { label: "Lisbon, PT", lat: 38.7223, lng: -9.1393 },
  { label: "Porto, PT", lat: 41.1579, lng: -8.6291 },
  { label: "Rome, IT", lat: 41.9028, lng: 12.4964 },
  { label: "Milan, IT", lat: 45.4642, lng: 9.19 },
  { label: "Naples, IT", lat: 40.8518, lng: 14.2681 },
  { label: "Zurich, CH", lat: 47.3769, lng: 8.5417 },
  { label: "Geneva, CH", lat: 46.2044, lng: 6.1432 },
  { label: "Copenhagen, DK", lat: 55.6761, lng: 12.5683 },
  { label: "Stockholm, SE", lat: 59.3293, lng: 18.0686 },
  { label: "Gothenburg, SE", lat: 57.7089, lng: 11.9746 },
  { label: "Oslo, NO", lat: 59.9139, lng: 10.7522 },
  { label: "Bergen, NO", lat: 60.3913, lng: 5.3221 },
  { label: "Helsinki, FI", lat: 60.1699, lng: 24.9384 },
  { label: "Reykjavik, IS", lat: 64.1466, lng: -21.9426 },
  { label: "Athens, GR", lat: 37.9838, lng: 23.7275 },
  { label: "Zagreb, HR", lat: 45.815, lng: 15.9819 },
  { label: "Split, HR", lat: 43.5081, lng: 16.4402 },
  { label: "Ljubljana, SI", lat: 46.0569, lng: 14.5058 },
  { label: "Bucharest, RO", lat: 44.4268, lng: 26.1025 },
  { label: "Sofia, BG", lat: 42.6977, lng: 23.3219 },
  { label: "Tallinn, EE", lat: 59.437, lng: 24.7536 },
  { label: "Riga, LV", lat: 56.9496, lng: 24.1052 },
  { label: "Vilnius, LT", lat: 54.6872, lng: 25.2797 },
  { label: "Kyiv, UA", lat: 50.4501, lng: 30.5234 },
  { label: "Istanbul, TR", lat: 41.0082, lng: 28.9784 },

  // North America
  { label: "New York, US", lat: 40.7128, lng: -74.006 },
  { label: "Los Angeles, US", lat: 34.0522, lng: -118.2437 },
  { label: "San Francisco, US", lat: 37.7749, lng: -122.4194 },
  { label: "Chicago, US", lat: 41.8781, lng: -87.6298 },
  { label: "Seattle, US", lat: 47.6062, lng: -122.3321 },
  { label: "Austin, US", lat: 30.2672, lng: -97.7431 },
  { label: "Denver, US", lat: 39.7392, lng: -104.9903 },
  { label: "Miami, US", lat: 25.7617, lng: -80.1918 },
  { label: "New Orleans, US", lat: 29.9511, lng: -90.0715 },
  { label: "Boston, US", lat: 42.3601, lng: -71.0589 },
  { label: "Toronto, CA", lat: 43.6532, lng: -79.3832 },
  { label: "Vancouver, CA", lat: 49.2827, lng: -123.1207 },
  { label: "Montreal, CA", lat: 45.5019, lng: -73.5674 },
  { label: "Mexico City, MX", lat: 19.4326, lng: -99.1332 },
  { label: "Guadalajara, MX", lat: 20.6597, lng: -103.3496 },

  // South America
  { label: "Sao Paulo, BR", lat: -23.5505, lng: -46.6333 },
  { label: "Rio de Janeiro, BR", lat: -22.9068, lng: -43.1729 },
  { label: "Brasilia, BR", lat: -15.7939, lng: -47.8828 },
  { label: "Buenos Aires, AR", lat: -34.6037, lng: -58.3816 },
  { label: "Santiago, CL", lat: -33.4489, lng: -70.6693 },
  { label: "Lima, PE", lat: -12.0464, lng: -77.0428 },
  { label: "Bogota, CO", lat: 4.711, lng: -74.0721 },
  { label: "Montevideo, UY", lat: -34.9011, lng: -56.1645 },
  { label: "Quito, EC", lat: -0.1807, lng: -78.4678 },

  // Africa
  { label: "Cape Town, ZA", lat: -33.9249, lng: 18.4241 },
  { label: "Johannesburg, ZA", lat: -26.2041, lng: 28.0473 },
  { label: "Nairobi, KE", lat: -1.2921, lng: 36.8219 },
  { label: "Lagos, NG", lat: 6.5244, lng: 3.3792 },
  { label: "Accra, GH", lat: 5.6037, lng: -0.187 },
  { label: "Cairo, EG", lat: 30.0444, lng: 31.2357 },
  { label: "Marrakesh, MA", lat: 31.6295, lng: -7.9811 },
  { label: "Tunis, TN", lat: 36.8065, lng: 10.1815 },
  { label: "Addis Ababa, ET", lat: 9.0192, lng: 38.7525 },
  { label: "Kigali, RW", lat: -1.9403, lng: 29.8739 },

  // Asia
  { label: "Tokyo, JP", lat: 35.6762, lng: 139.6503 },
  { label: "Osaka, JP", lat: 34.6937, lng: 135.5023 },
  { label: "Kyoto, JP", lat: 35.0116, lng: 135.7681 },
  { label: "Seoul, KR", lat: 37.5665, lng: 126.978 },
  { label: "Taipei, TW", lat: 25.033, lng: 121.5654 },
  { label: "Bangkok, TH", lat: 13.7563, lng: 100.5018 },
  { label: "Chiang Mai, TH", lat: 18.7883, lng: 98.9853 },
  { label: "Hanoi, VN", lat: 21.0278, lng: 105.8342 },
  { label: "Ho Chi Minh City, VN", lat: 10.8231, lng: 106.6297 },
  { label: "Manila, PH", lat: 14.5995, lng: 120.9842 },
  { label: "Cebu, PH", lat: 10.3157, lng: 123.8854 },
  { label: "Kuala Lumpur, MY", lat: 3.139, lng: 101.6869 },
  { label: "Singapore, SG", lat: 1.3521, lng: 103.8198 },
  { label: "Jakarta, ID", lat: -6.2088, lng: 106.8456 },
  { label: "Bali (Denpasar), ID", lat: -8.65, lng: 115.2167 },
  { label: "Mumbai, IN", lat: 19.076, lng: 72.8777 },
  { label: "Delhi, IN", lat: 28.7041, lng: 77.1025 },
  { label: "Bengaluru, IN", lat: 12.9716, lng: 77.5946 },
  { label: "Jaipur, IN", lat: 26.9124, lng: 75.7873 },
  { label: "Kathmandu, NP", lat: 27.7172, lng: 85.324 },
  { label: "Colombo, LK", lat: 6.9271, lng: 79.8612 },
  { label: "Dubai, AE", lat: 25.2048, lng: 55.2708 },
  { label: "Tel Aviv, IL", lat: 32.0853, lng: 34.7818 },
  { label: "Amman, JO", lat: 31.9454, lng: 35.9284 },

  // Oceania
  { label: "Sydney, AU", lat: -33.8688, lng: 151.2093 },
  { label: "Melbourne, AU", lat: -37.8136, lng: 144.9631 },
  { label: "Brisbane, AU", lat: -27.4698, lng: 153.0251 },
  { label: "Perth, AU", lat: -31.9505, lng: 115.8605 },
  { label: "Auckland, NZ", lat: -36.8485, lng: 174.7633 },
  { label: "Wellington, NZ", lat: -41.2866, lng: 174.7756 }
];
