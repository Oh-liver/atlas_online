"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";

function dotIcon(color: string, size = 18) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};
      box-shadow:0 0 0 2px rgba(11,26,36,0.9), 0 0 10px rgba(0,0,0,0.5);
      border:2px solid #F6F1E4;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

const guessIcon = dotIcon("#C9A24B");
const actualIcon = dotIcon("#B4542D");

interface GuessMapProps {
  mode: "guess" | "reveal";
  guess: { lat: number; lng: number } | null;
  actual?: { lat: number; lng: number } | null;
  onGuess?: (lat: number, lng: number) => void;
}

function ClickCapture({ onGuess }: { onGuess?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onGuess?.(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

function FitOnReveal({
  guess,
  actual
}: {
  guess: { lat: number; lng: number } | null;
  actual?: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (guess && actual) {
      const bounds = L.latLngBounds([
        [guess.lat, guess.lng],
        [actual.lat, actual.lng]
      ]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 6 });
    }
  }, [guess, actual, map]);
  return null;
}

export default function GuessMap({ mode, guess, actual, onGuess }: GuessMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const center = useMemo<[number, number]>(() => [20, 10], []);

  return (
    <MapContainer
      center={center}
      zoom={2}
      minZoom={2}
      worldCopyJump
      className="h-full w-full"
      ref={mapRef}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {mode === "guess" && <ClickCapture onGuess={onGuess} />}
      {guess && <Marker position={[guess.lat, guess.lng]} icon={guessIcon} />}
      {mode === "reveal" && actual && (
        <>
          <Marker position={[actual.lat, actual.lng]} icon={actualIcon} />
          {guess && (
            <Polyline
              positions={[
                [guess.lat, guess.lng],
                [actual.lat, actual.lng]
              ]}
              pathOptions={{ color: "#C9A24B", weight: 2, dashArray: "6 6" }}
            />
          )}
          <FitOnReveal guess={guess} actual={actual} />
        </>
      )}
    </MapContainer>
  );
}
