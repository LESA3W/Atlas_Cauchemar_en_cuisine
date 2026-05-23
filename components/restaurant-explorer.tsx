"use client";

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import { AboutModal } from "@/components/about-modal";
import { BrandBar } from "@/components/brand-bar";
import { FranceMap } from "@/components/france-map";
import { Legend } from "@/components/legend";
import { RestaurantCard } from "@/components/restaurant-card";
import { RestaurantListPanel } from "@/components/restaurant-list-panel";
import { StatsBar } from "@/components/stats-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { TOTAL_EPISODES_AIRED } from "@/data/restaurants";
import type { Restaurant, RestaurantStatus } from "@/types/restaurant";
import {
  countByStatus,
  defaultRestaurantFilters,
  filterRestaurants
} from "@/utils/restaurant-filters";

type RestaurantExplorerProps = {
  restaurants: Restaurant[];
  dataSourceLabel: string;
};

const FRENCH_REGIONS = [
  "Auvergne-Rhône-Alpes",
  "Bourgogne-Franche-Comté",
  "Bretagne",
  "Centre-Val de Loire",
  "Corse",
  "Grand Est",
  "Hauts-de-France",
  "Île-de-France",
  "Normandie",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Pays de la Loire",
  "Provence-Alpes-Côte d'Azur"
];

export function RestaurantExplorer({ restaurants }: RestaurantExplorerProps) {
  const [search, setSearch] = useState(defaultRestaurantFilters.query);
  const [region, setRegion] = useState(defaultRestaurantFilters.region);
  const [city, setCity] = useState(defaultRestaurantFilters.city);
  const [status, setStatus] = useState<"all" | RestaurantStatus>(
    defaultRestaurantFilters.status
  );
  const [minRating, setMinRating] = useState<number | null>(
    defaultRestaurantFilters.minRating
  );
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [indexOpen, setIndexOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [focusSignal, setFocusSignal] = useState(0);
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(search);

  const filteredRestaurants = useMemo(
    () =>
      filterRestaurants(restaurants, {
        query: deferredSearch,
        region,
        city,
        status,
        minRating
      }),
    [restaurants, deferredSearch, region, city, status, minRating]
  );

  const selectedRestaurant =
    filteredRestaurants.find((r) => r.id === selectedRestaurantId) ?? null;

  useEffect(() => {
    if (
      selectedRestaurantId &&
      !filteredRestaurants.some((r) => r.id === selectedRestaurantId)
    ) {
      setSelectedRestaurantId(null);
    }
  }, [filteredRestaurants, selectedRestaurantId]);

  const regionOptions = FRENCH_REGIONS;

  const cityOptions = useMemo(
    () =>
      Array.from(
        new Set(
          restaurants
            .filter((r) => (region ? r.region === region : true))
            .map((r) => r.city)
        )
      ).sort((a, b) => a.localeCompare(b, "fr")),
    [restaurants, region]
  );

  const totalCounts = useMemo(() => countByStatus(restaurants), [restaurants]);

  function focusRestaurant(r: Restaurant) {
    setSelectedRestaurantId(r.id);
    setFocusSignal((c) => c + 1);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIndexOpen(false);
    }
  }

  return (
    <ThemeProvider>
    <div className="flex h-[100dvh] min-h-[640px] flex-col overflow-hidden bg-ink text-paper">
      <BrandBar
        totalRestaurants={restaurants.length}
        onOpenAbout={() => setAboutOpen(true)}
        onToggleIndex={() => setIndexOpen((o) => !o)}
        indexOpen={indexOpen}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <RestaurantListPanel
          restaurants={filteredRestaurants}
          selectedRestaurantId={selectedRestaurantId}
          search={search}
          region={region}
          city={city}
          status={status}
          minRating={minRating}
          regionOptions={regionOptions}
          cityOptions={cityOptions}
          isFiltering={isPending}
          isOpen={indexOpen}
          onClose={() => setIndexOpen(false)}
          onSearchChange={(v) => startTransition(() => setSearch(v))}
          onRegionChange={(v) =>
            startTransition(() => {
              setRegion(v);
              setCity("");
            })
          }
          onCityChange={(v) => startTransition(() => setCity(v))}
          onStatusChange={(v) => startTransition(() => setStatus(v))}
          onMinRatingChange={(v) => startTransition(() => setMinRating(v))}
          onSelectRestaurant={focusRestaurant}
        />

        <main className="relative flex-1 overflow-hidden bg-ink">
          <FranceMap
            focusSignal={focusSignal}
            onSelectRestaurant={focusRestaurant}
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
          />
          <Legend />
        </main>

        {selectedRestaurant ? (
          <>
            <aside className="hidden lg:flex">
              <RestaurantCard
                mode="sidebar"
                restaurant={selectedRestaurant}
                onClose={() => setSelectedRestaurantId(null)}
                onFocus={focusRestaurant}
              />
            </aside>

            <div className="fixed inset-x-0 bottom-[var(--bar-bottom,64px)] z-[1180] lg:hidden">
              <RestaurantCard
                mode="sheet"
                restaurant={selectedRestaurant}
                onClose={() => setSelectedRestaurantId(null)}
                onFocus={focusRestaurant}
              />
            </div>
          </>
        ) : null}
      </div>

      <StatsBar
        total={restaurants.length}
        open={totalCounts.open}
        closed={totalCounts.closed}
        permanentlyClosed={totalCounts.permanentlyClosed}
        filtered={filteredRestaurants.length}
        totalEpisodes={TOTAL_EPISODES_AIRED}
        activeStatus={status}
        onStatusChange={(v) => startTransition(() => setStatus(v))}
      />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
    </ThemeProvider>
  );
}
