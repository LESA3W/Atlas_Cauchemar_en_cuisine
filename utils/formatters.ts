import type { RestaurantStatus } from "@/types/restaurant";

export function formatStatus(status: RestaurantStatus | undefined) {
  switch (status) {
    case "open":
      return "Ouvert";
    case "closed":
      return "Fermé";
    default:
      return "Statut inconnu";
  }
}

export function formatCoordinates(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export function formatRating(rating: number | undefined) {
  return rating === undefined ? "N.C." : rating.toFixed(1);
}

export function formatEpisodeCode(episodeNumber: number) {
  return `EP. ${String(episodeNumber).padStart(3, "0")}`;
}

export function buildGoogleMapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
