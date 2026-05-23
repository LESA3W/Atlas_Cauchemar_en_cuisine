"use client";

import { divIcon } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";
import type { Restaurant, RestaurantStatus } from "@/types/restaurant";

type RestaurantMarkerProps = {
  restaurant: Restaurant;
  selected: boolean;
  onSelect: (restaurant: Restaurant) => void;
};

function buildIcon(status: RestaurantStatus, selected: boolean, episodeNumber: number) {
  const modifier = `pin--${status}${selected ? " pin--selected" : ""}`;
  const label = String(episodeNumber);

  return divIcon({
    className: "",
    html: `<span class="pin ${modifier}">
      <svg viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
        <path class="pin-body" d="M16 1 C7.7 1 1 7.7 1 16 c0 9 9 16 15 23 6-7 15-14 15-23 0-8.3-6.7-15-15-15 Z"/>
        <text class="pin-num" x="16" y="16.5">${label}</text>
      </svg>
    </span>`,
    iconSize: [32, 40],
    iconAnchor: [16, 38],
    popupAnchor: [0, -34]
  });
}

export function RestaurantMarker({
  restaurant,
  selected,
  onSelect
}: RestaurantMarkerProps) {
  const status: RestaurantStatus = restaurant.status ?? "unknown";

  return (
    <Marker
      eventHandlers={{
        click: () => onSelect(restaurant),
        keypress: (e) => {
          if (e.originalEvent.key === "Enter") onSelect(restaurant);
        }
      }}
      icon={buildIcon(status, selected, restaurant.episodeNumber)}
      position={[restaurant.lat, restaurant.lng]}
      zIndexOffset={selected ? 700 : 0}
      keyboard
    >
      <Tooltip className="map-tooltip" direction="top" offset={[0, -34]}>
        <div className="px-3 py-2">
          <p className="font-mono text-[9px] uppercase text-or" style={{ letterSpacing: "0.22em" }}>
            EP. {String(restaurant.episodeNumber).padStart(3, "0")}
          </p>
          <p className="mt-1 font-display text-sm leading-tight text-paper">
            {restaurant.name}
          </p>
          <p className="text-[11px] italic text-paper-mute">
            {restaurant.city}
          </p>
        </div>
      </Tooltip>
    </Marker>
  );
}
