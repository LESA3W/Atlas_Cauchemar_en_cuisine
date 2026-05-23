"use client";

import { RatingStars } from "@/components/rating-stars";
import { StatusPill } from "@/components/status-pill";
import type { Restaurant } from "@/types/restaurant";
import { buildGoogleMapsSearchUrl, formatEpisodeCode } from "@/utils/formatters";

type RestaurantCardProps = {
  restaurant: Restaurant;
  mode?: "sidebar" | "sheet";
  onClose: () => void;
  onFocus: (restaurant: Restaurant) => void;
};

export function RestaurantCard({
  restaurant,
  mode = "sidebar",
  onClose,
  onFocus
}: RestaurantCardProps) {
  const activePhoto = restaurant.photos[0];
  const hasRealAddress = restaurant.address && restaurant.address.length > 4;
  const mapQuery = hasRealAddress
    ? `${restaurant.address}, ${restaurant.city}`
    : `${restaurant.name}, ${restaurant.city}`;
  const episodeYear =
    restaurant.shootDate?.match(/\d{4}/)?.[0] ??
    restaurant.episodeDate?.match(/\d{4}/)?.[0] ??
    "—";

  const shellClass =
    mode === "sheet"
      ? "max-h-[80vh] anim-slide-bottom"
      : "h-full anim-slide-right";

  return (
    <section
      className={`flex w-full flex-col overflow-hidden border-l border-rule bg-ink-2 lg:max-w-[26rem] ${shellClass}`}
      aria-label={`Fiche ${restaurant.name}`}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-ink-3">
        {activePhoto ? (
          <img
            src={activePhoto}
            alt={`${restaurant.name} — ${restaurant.city}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-rouge/15 via-transparent to-transparent mix-blend-overlay" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="border border-paper-ghost bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase text-paper backdrop-blur"
            style={{ letterSpacing: "0.22em" }}
          >
            {formatEpisodeCode(restaurant.episodeNumber)}
          </span>
          <StatusPill status={restaurant.status} variant="filled" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fiche"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center border border-paper-ghost bg-ink/70 text-paper backdrop-blur hover:border-rouge hover:bg-rouge hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
            <path d="M6 6 18 18" />
            <path d="m18 6-12 12" />
          </svg>
        </button>

        <div className="absolute inset-x-4 bottom-4">
          <h2 className="font-display text-3xl leading-tight text-paper md:text-4xl">
            {restaurant.name}
          </h2>
          {restaurant.owner ? (
            <p className="mt-1 font-display italic text-paper-mute">
              {restaurant.owner}
            </p>
          ) : null}
          <p className="mt-1 font-mono text-[11px] uppercase text-paper-mute" style={{ letterSpacing: "0.18em" }}>
            {restaurant.city}
            {restaurant.region ? ` · ${restaurant.region}` : ""}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 thin-scrollbar md:px-6">
        <div className="grid grid-cols-2 gap-4 border-y border-rule py-4">
          <div className="border-r border-rule pr-4">
            <p className="eyebrow">Note</p>
            <div className="mt-2">
              <RatingStars rating={restaurant.rating} />
            </div>
          </div>
          <div>
            <p className="eyebrow">Tournage</p>
            <p className="mt-2 font-display text-2xl text-paper">{episodeYear}</p>
            {restaurant.episodeDate ? (
              <p className="mt-1 font-display italic text-xs text-paper-soft">
                {restaurant.episodeDate}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          <p className="eyebrow">Adresse</p>
          <p className="font-mono text-sm leading-6 text-paper-mute">
            {hasRealAddress ? restaurant.address : "Adresse non communiquée"}
          </p>
          <a
            href={buildGoogleMapsSearchUrl(mapQuery)}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 border border-rule-strong px-3 py-1.5 font-mono text-[10px] uppercase text-paper-mute hover:border-rouge hover:text-paper"
            style={{ letterSpacing: "0.22em" }}
          >
            Ouvrir dans Google Maps
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>

        {restaurant.openingHours && restaurant.openingHours.length > 0 ? (
          <div className="mt-5 grid gap-2">
            <p className="eyebrow">Horaires</p>
            <ul className="divide-y divide-rule">
              {restaurant.openingHours.map((entry) => (
                <li
                  key={`${restaurant.id}-${entry.day}`}
                  className="flex items-center justify-between gap-4 py-2 text-sm"
                >
                  <span className="font-mono text-[11px] uppercase text-paper-mute" style={{ letterSpacing: "0.18em" }}>
                    {entry.day}
                  </span>
                  <span className={entry.closed ? "font-display italic text-rouge-bright" : "font-mono text-paper"}>
                    {entry.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {restaurant.description ? (
          <div className="mt-5 grid gap-2">
            <p className="eyebrow">Récit</p>
            <p className="font-display text-base leading-7 text-paper-mute first-letter:font-display first-letter:text-3xl first-letter:font-bold first-letter:text-rouge first-letter:mr-1 first-letter:float-left first-letter:leading-none">
              {restaurant.description}
            </p>
          </div>
        ) : null}

        {restaurant.tags && restaurant.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="border border-rule-strong px-2 py-0.5 font-mono text-[9.5px] uppercase text-paper-soft"
                style={{ letterSpacing: "0.18em" }}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-rule bg-ink-2 px-5 py-4 md:px-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onFocus(restaurant)}
            className="inline-flex flex-1 items-center justify-center bg-rouge px-4 py-2.5 font-mono text-[10px] uppercase text-white hover:bg-rouge-bright"
            style={{ letterSpacing: "0.22em" }}
          >
            Recentrer la carte
          </button>
          {restaurant.sourceUrl ? (
            <a
              href={restaurant.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-rule-strong px-4 py-2.5 font-mono text-[10px] uppercase text-paper-mute hover:border-rouge hover:text-paper"
              style={{ letterSpacing: "0.22em" }}
            >
              Source
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
