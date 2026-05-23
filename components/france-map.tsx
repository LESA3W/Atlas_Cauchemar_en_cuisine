"use client";

import dynamic from "next/dynamic";
import type { Restaurant } from "@/types/restaurant";

const MapClient = dynamic(() => import("@/components/map-client"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-ink">
      <div className="border border-rule bg-ink-2 px-6 py-5 text-center">
        <p className="eyebrow">Cartographie</p>
        <p className="mt-2 font-display italic text-paper-mute text-lg">
          Chargement de l'atlas…
        </p>
      </div>
    </div>
  )
});

type FranceMapProps = {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  focusSignal: number;
  onSelectRestaurant: (restaurant: Restaurant) => void;
};

export function FranceMap(props: FranceMapProps) {
  return <MapClient {...props} />;
}
