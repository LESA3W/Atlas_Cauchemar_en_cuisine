import type { Restaurant, RestaurantStatus } from "@/types/restaurant";

export type RestaurantFilters = {
  query: string;
  region: string;
  city: string;
  status: "all" | RestaurantStatus;
  minRating: number | null;
};

export const defaultRestaurantFilters: RestaurantFilters = {
  query: "",
  region: "",
  city: "",
  status: "all",
  minRating: null
};

function effectiveStatus(restaurant: Restaurant): RestaurantStatus {
  return restaurant.status ?? "unknown";
}

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: RestaurantFilters
) {
  const query = filters.query.trim().toLowerCase();

  return restaurants.filter((restaurant) => {
    const matchesQuery =
      query.length === 0 ||
      [
        restaurant.name,
        restaurant.city,
        restaurant.department,
        restaurant.region,
        restaurant.address,
        restaurant.specialty,
        restaurant.description,
        restaurant.owner,
        restaurant.tags?.join(" ")
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesRegion =
      filters.region.length === 0 || restaurant.region === filters.region;

    const matchesCity =
      filters.city.length === 0 || restaurant.city === filters.city;

    const matchesStatus =
      filters.status === "all" || effectiveStatus(restaurant) === filters.status;

    const matchesRating =
      filters.minRating === null ||
      (restaurant.rating !== undefined && restaurant.rating >= filters.minRating);

    return (
      matchesQuery &&
      matchesRegion &&
      matchesCity &&
      matchesStatus &&
      matchesRating
    );
  });
}

export function countByStatus(restaurants: Restaurant[]) {
  let open = 0;
  let closed = 0;
  let permanentlyClosed = 0;
  let unknown = 0;

  for (const r of restaurants) {
    const s = effectiveStatus(r);
    if (s === "open") open += 1;
    else if (s === "closed") closed += 1;
    else if (s === "permanently_closed") permanentlyClosed += 1;
    else unknown += 1;
  }

  return { open, closed, permanentlyClosed, unknown };
}
