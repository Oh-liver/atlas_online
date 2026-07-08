import { NextResponse } from "next/server";
import { SEED_POINTS } from "@/lib/cities";

export const dynamic = "force-dynamic";

const MAPILLARY_GRAPH_URL = "https://graph.mapillary.com/images";

interface MapillaryImage {
  id: string;
  computed_geometry?: { type: string; coordinates: [number, number] };
  geometry?: { type: string; coordinates: [number, number] };
}

function randomJitterDegrees(spreadKm: number, latDeg: number) {
  // Rough conversion: 1 degree latitude ~= 111km everywhere;
  // 1 degree longitude shrinks with latitude.
  const latSpread = spreadKm / 111;
  const lngSpread = spreadKm / (111 * Math.max(0.2, Math.cos((latDeg * Math.PI) / 180)));
  return {
    dLat: (Math.random() * 2 - 1) * latSpread,
    dLng: (Math.random() * 2 - 1) * lngSpread
  };
}

function bboxAround(lat: number, lng: number, halfSizeKm: number) {
  const { dLat, dLng } = { dLat: halfSizeKm / 111, dLng: halfSizeKm / (111 * Math.max(0.2, Math.cos((lat * Math.PI) / 180))) };
  const minLat = lat - dLat;
  const maxLat = lat + dLat;
  const minLng = lng - dLng;
  const maxLng = lng + dLng;
  return `${minLng},${minLat},${maxLng},${maxLat}`;
}

export async function GET() {
  const token = process.env.MAPILLARY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Server chýba MAPILLARY_TOKEN v premenných prostredia." },
      { status: 500 }
    );
  }

  const MAX_ATTEMPTS = 8;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const seed = SEED_POINTS[Math.floor(Math.random() * SEED_POINTS.length)];
    const { dLat, dLng } = randomJitterDegrees(8, seed.lat);
    const centerLat = seed.lat + dLat;
    const centerLng = seed.lng + dLng;
    const bbox = bboxAround(centerLat, centerLng, 3);

    const url = `${MAPILLARY_GRAPH_URL}?access_token=${token}&fields=id,computed_geometry,geometry&bbox=${bbox}&limit=50`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const json = (await res.json()) as { data?: MapillaryImage[] };
      const images = (json.data ?? []).filter((img) => img.computed_geometry || img.geometry);
      if (images.length === 0) continue;

      const chosen = images[Math.floor(Math.random() * images.length)];
      const coords = chosen.computed_geometry?.coordinates ?? chosen.geometry?.coordinates;
      if (!coords) continue;

      const [lng, lat] = coords;
      return NextResponse.json({
        imageId: chosen.id,
        lat,
        lng,
        region: seed.label
      });
    } catch {
      continue;
    }
  }

  return NextResponse.json(
    { error: "Nepodarilo sa nájsť pokryté miesto, skús to prosím znova." },
    { status: 404 }
  );
}
