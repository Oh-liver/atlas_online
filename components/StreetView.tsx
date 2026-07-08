"use client";

import { useEffect, useRef, useState } from "react";
import "mapillary-js/dist/mapillary.css";

interface StreetViewProps {
  imageId: string;
}

export default function StreetView({ imageId }: StreetViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let viewer: import("mapillary-js").Viewer | null = null;
    let cancelled = false;
    setLoading(true);
    setFailed(false);

    const token = process.env.NEXT_PUBLIC_MAPILLARY_TOKEN;

    async function init() {
      if (!containerRef.current || !token) {
        setFailed(true);
        setLoading(false);
        return;
      }
      const { Viewer } = await import("mapillary-js");
      if (cancelled || !containerRef.current) return;

      viewer = new Viewer({
        accessToken: token,
        container: containerRef.current,
        imageId,
        component: { cover: false, bearing: {}, zoom: {} }
      });

      viewer.on("image", () => {
        if (!cancelled) setLoading(false);
      });
    }

    init().catch(() => {
      if (!cancelled) {
        setFailed(true);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      if (viewer) {
        try {
          viewer.remove();
        } catch {
          /* no-op */
        }
      }
    };
  }, [imageId]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-chart-deep">
      <div ref={containerRef} className="mapillary-viewer" />
      {loading && !failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-chart-ink/80">
          <p className="font-mono text-sm tracking-widest text-chart-brasslight">
            NAČÍTAVAM ZÁBER…
          </p>
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-chart-ink/90 px-6 text-center">
          <p className="font-display text-lg text-chart-parchment">Obrázok sa nepodarilo načítať</p>
          <p className="font-mono text-xs text-chart-fog">
            Skontroluj, že je nastavený NEXT_PUBLIC_MAPILLARY_TOKEN.
          </p>
        </div>
      )}
    </div>
  );
}
