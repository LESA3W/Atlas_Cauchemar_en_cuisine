"use client";

import { useEffect } from "react";
import {
  AttributionControl,
  MapContainer,
  TileLayer,
  ZoomControl,
  useMap
} from "react-leaflet";
import { RestaurantMarker } from "@/components/restaurant-marker";
import { useTheme } from "@/components/theme-provider";
import type { Restaurant } from "@/types/restaurant";

type MapClientProps = {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  focusSignal: number;
  onSelectRestaurant: (restaurant: Restaurant) => void;
};

const FRANCE_BOUNDS: [[number, number], [number, number]] = [
  [41.2, -5.5],
  [51.5, 10.0]
];

const TILE_LIGHT = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TILE_DARK = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

function ViewportController({
  selectedRestaurant,
  focusSignal
}: {
  selectedRestaurant: Restaurant | null;
  focusSignal: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(FRANCE_BOUNDS, { padding: [60, 60], animate: false });
  }, [map]);

  useEffect(() => {
    if (!selectedRestaurant || focusSignal === 0) return;

    map.flyTo([selectedRestaurant.lat, selectedRestaurant.lng], 10, {
      animate: true,
      duration: 1.1
    });
  }, [focusSignal, map, selectedRestaurant]);

  return null;
}

export default function MapClient({
  restaurants,
  selectedRestaurant,
  focusSignal,
  onSelectRestaurant
}: MapClientProps) {
  const { theme } = useTheme();
  const tileUrl = theme === "dark" ? TILE_DARK : TILE_LIGHT;

  return (
    <MapContainer
      attributionControl={false}
      className="h-full w-full"
      center={[46.7, 2.4]}
      minZoom={5}
      maxZoom={16}
      maxBounds={FRANCE_BOUNDS}
      maxBoundsViscosity={0.7}
      scrollWheelZoom
      zoom={6}
      zoomControl={false}
      zoomSnap={0.25}
      worldCopyJump={false}
    >
      <TileLayer
        key={tileUrl}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        url={tileUrl}
      />
      <AttributionControl position="bottomright" prefix={false} />
      <ZoomControl position="topright" />

      <ViewportController
        focusSignal={focusSignal}
        selectedRestaurant={selectedRestaurant}
      />

      {restaurants.map((restaurant) => (
        <RestaurantMarker
          key={restaurant.id}
          onSelect={onSelectRestaurant}
          restaurant={restaurant}
          selected={restaurant.id === selectedRestaurant?.id}
        />
      ))}
    </MapContainer>
  );
}
