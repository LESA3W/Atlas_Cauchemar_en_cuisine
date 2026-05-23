"use client";

import { FilterBar } from "@/components/filter-bar";
import { SearchBar } from "@/components/search-bar";
import { StatusPill } from "@/components/status-pill";
import type { Restaurant, RestaurantStatus } from "@/types/restaurant";
import { formatEpisodeCode, formatRating } from "@/utils/formatters";

type RestaurantListPanelProps = {
  restaurants: Restaurant[];
  selectedRestaurantId: string | null;
  search: string;
  region: string;
  city: string;
  status: "all" | RestaurantStatus;
  minRating: number | null;
  regionOptions: string[];
  cityOptions: string[];
  isFiltering?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStatusChange: (value: "all" | RestaurantStatus) => void;
  onMinRatingChange: (value: number | null) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
};

function RestaurantRow({
  restaurant,
  selected,
  onClick
}: {
  restaurant: Restaurant;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full border-l-2 px-4 py-3 text-left transition ${
        selected
          ? "border-rouge bg-ink-3"
          : "border-transparent hover:border-rouge hover:bg-ink-3/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="font-mono text-[10px] uppercase text-or"
            style={{ letterSpacing: "0.22em" }}
          >
            {formatEpisodeCode(restaurant.episodeNumber)}
          </p>
          <h3 className="mt-1 font-display text-lg leading-tight text-paper">
            {restaurant.name}
          </h3>
          <p className="mt-1 font-display italic text-sm text-paper-mute">
            {restaurant.city}
            {restaurant.region ? ` — ${restaurant.region}` : ""}
          </p>
        </div>
        <span
          className="shrink-0 font-display italic text-paper-mute text-sm"
          aria-hidden="true"
        >
          {formatRating(restaurant.rating)}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <StatusPill status={restaurant.status} />
        {restaurant.episodeDate ? (
          <span
            className="font-mono text-[9.5px] uppercase text-paper-soft"
            style={{ letterSpacing: "0.2em" }}
          >
            {restaurant.episodeDate.split(" ").slice(-1)[0]}
          </span>
        ) : null}
      </div>
    </button>
  );
}

export function RestaurantListPanel({
  restaurants,
  selectedRestaurantId,
  search,
  region,
  city,
  status,
  minRating,
  regionOptions,
  cityOptions,
  isFiltering = false,
  isOpen,
  onClose,
  onSearchChange,
  onRegionChange,
  onCityChange,
  onStatusChange,
  onMinRatingChange,
  onSelectRestaurant
}: RestaurantListPanelProps) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-[1200] flex w-full max-w-[22rem] flex-col border-r border-rule bg-ink-2 transition-transform duration-300 ease-out lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "var(--bar-top, 56px)", bottom: "var(--bar-bottom, 64px)" }}
      >
        <div className="border-b border-rule px-5 pb-4 pt-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl leading-none text-paper md:text-3xl">Sommaire</h2>
              <p className="mt-1 font-display italic text-xs text-paper-mute md:text-sm">
                {restaurants.length} restaurant{restaurants.length > 1 ? "s" : ""} affiché
                {restaurants.length > 1 ? "s" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden text-paper-soft hover:text-paper"
              aria-label="Fermer l'index"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M6 6 18 18" />
                <path d="m18 6-12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <SearchBar
              value={search}
              onChange={onSearchChange}
              isPending={isFiltering}
            />
          </div>
        </div>

        <div className="border-b border-rule px-5 py-5">
          <FilterBar
            region={region}
            city={city}
            status={status}
            minRating={minRating}
            regionOptions={regionOptions}
            cityOptions={cityOptions}
            onRegionChange={onRegionChange}
            onCityChange={onCityChange}
            onStatusChange={onStatusChange}
            onMinRatingChange={onMinRatingChange}
          />
        </div>

        <div className="flex-1 overflow-y-auto thin-scrollbar">
          {restaurants.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="eyebrow">Aucun résultat</p>
              <p className="mt-3 font-display italic text-paper-mute">
                Aucun restaurant ne correspond aux filtres actifs.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-rule">
              {restaurants.map((restaurant) => (
                <li key={restaurant.id}>
                  <RestaurantRow
                    restaurant={restaurant}
                    selected={restaurant.id === selectedRestaurantId}
                    onClick={() => onSelectRestaurant(restaurant)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[1150] bg-ink/70 backdrop-blur-sm lg:hidden anim-fade"
          onClick={onClose}
        />
      ) : null}
    </>
  );
}
