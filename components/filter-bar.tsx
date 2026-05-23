"use client";

import { useMemo, useState } from "react";
import { CityAutocomplete } from "@/components/city-autocomplete";
import type { RestaurantStatus } from "@/types/restaurant";

type FilterBarProps = {
  region: string;
  city: string;
  status: "all" | RestaurantStatus;
  minRating: number | null;
  regionOptions: string[];
  cityOptions: string[];
  onRegionChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStatusChange: (value: "all" | RestaurantStatus) => void;
  onMinRatingChange: (value: number | null) => void;
};

function Chip({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center whitespace-nowrap border px-3 py-1.5 font-mono text-[10px] uppercase transition ${
        active
          ? "border-rouge bg-rouge text-white"
          : "border-rule-strong text-paper-mute hover:border-paper-soft hover:text-paper"
      }`}
      style={{ letterSpacing: "0.22em" }}
    >
      {children}
    </button>
  );
}

function Dropdown({
  value,
  options,
  onChange,
  placeholder,
  resetLabel
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
  resetLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex w-full items-center justify-between gap-3 border border-rule-strong px-3 py-2 text-left hover:border-paper-soft"
      >
        <span className="truncate">
          {value ? (
            <span className="font-sans text-sm text-paper">{value}</span>
          ) : (
            <span className="font-display italic text-sm text-paper-soft">
              {placeholder}
            </span>
          )}
        </span>
        <svg
          aria-hidden="true"
          className={`h-3 w-3 shrink-0 text-paper-mute transition ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <>
          <div className="fixed inset-0 z-[40]" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 z-[50] mt-1 max-h-[280px] overflow-y-auto border border-rule-strong bg-ink-2 shadow-2xl thin-scrollbar">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="block w-full border-b border-rule px-3 py-2 text-left font-mono text-[10px] uppercase text-paper-soft hover:bg-ink-3 hover:text-paper"
              style={{ letterSpacing: "0.22em" }}
            >
              {resetLabel}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left font-sans text-sm hover:bg-ink-3 ${
                  opt === value ? "bg-ink-3 text-paper" : "text-paper-mute"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function FilterBar({
  region,
  city,
  status,
  minRating,
  regionOptions,
  cityOptions,
  onRegionChange,
  onCityChange,
  onStatusChange,
  onMinRatingChange
}: FilterBarProps) {
  const knownCities = useMemo(() => new Set(cityOptions), [cityOptions]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <p className="eyebrow">Région</p>
        <Dropdown
          value={region}
          options={regionOptions}
          onChange={onRegionChange}
          placeholder="Filtrer par région"
          resetLabel="Toutes les régions"
        />
      </div>

      <div className="grid gap-2">
        <p className="eyebrow">Ville</p>
        <CityAutocomplete
          value={city}
          onChange={onCityChange}
          knownCities={knownCities}
          placeholder="Filtrer par ville"
        />
      </div>

      <div className="grid gap-2">
        <p className="eyebrow">Statut</p>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={status === "all"} onClick={() => onStatusChange("all")}>
            Tous
          </Chip>
          <Chip active={status === "open"} onClick={() => onStatusChange("open")}>
            Ouvert
          </Chip>
          <Chip active={status === "closed"} onClick={() => onStatusChange("closed")}>
            Fermé
          </Chip>
          <Chip
            active={status === "permanently_closed"}
            onClick={() => onStatusChange("permanently_closed")}
          >
            Définitivement fermé
          </Chip>
        </div>
      </div>

      <div className="grid gap-2">
        <p className="eyebrow">Note minimale</p>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={minRating === null} onClick={() => onMinRatingChange(null)}>
            Toutes
          </Chip>
          <Chip active={minRating === 3} onClick={() => onMinRatingChange(3)}>
            ≥ 3.0
          </Chip>
          <Chip active={minRating === 4} onClick={() => onMinRatingChange(4)}>
            ≥ 4.0
          </Chip>
        </div>
      </div>
    </div>
  );
}
