export type RestaurantStatus = "open" | "closed" | "unknown";

export type OpeningHour = {
  day: string;
  hours: string;
  closed?: boolean;
};

export type Restaurant = {
  id: string;
  episodeNumber: number;
  name: string;
  owner?: string;
  city: string;
  department: string;
  region?: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  status?: RestaurantStatus;
  episodeDate?: string;
  shootDate?: string;
  description?: string;
  photos: string[];
  sourceUrl?: string;
  specialty?: string;
  tags?: string[];
  notes?: string[];
  openingHours?: OpeningHour[];
  hasKnownHours?: boolean;
};
