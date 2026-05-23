"use client";

import type { RestaurantStatus } from "@/types/restaurant";

export type StatusFilter = "all" | RestaurantStatus;

type StatsBarProps = {
  total: number;
  open: number;
  closed: number;
  permanentlyClosed: number;
  filtered: number;
  totalEpisodes: number;
  activeStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
};

function Cell({
  label,
  value,
  accent,
  active,
  onClick
}: {
  label: string;
  value: string | number;
  accent: "or" | "rouge" | "grey" | "paper";
  active: boolean;
  onClick: () => void;
}) {
  const accentClass =
    accent === "or"
      ? "text-or"
      : accent === "rouge"
        ? "text-rouge-bright"
        : accent === "grey"
          ? "text-paper-mute"
          : "text-paper";

  const ringClass = active
    ? "bg-ink-3 border-b-2 border-b-rouge"
    : "border-b-2 border-b-transparent hover:bg-ink-3/60";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex flex-1 items-center justify-between gap-3 border-r border-rule px-3 py-3 text-left transition last:border-r-0 md:px-6 ${ringClass}`}
    >
      <span
        className="font-mono text-[10px] uppercase text-paper-soft group-hover:text-paper-mute"
        style={{ letterSpacing: "0.22em" }}
      >
        {label}
      </span>
      <span className={`font-display text-2xl leading-none md:text-3xl ${accentClass}`}>
        {value}
      </span>
    </button>
  );
}

export function StatsBar({
  total,
  open,
  closed,
  permanentlyClosed,
  filtered,
  totalEpisodes,
  activeStatus,
  onStatusChange
}: StatsBarProps) {
  return (
    <footer className="relative z-[1200] flex w-full items-stretch overflow-x-auto border-t border-rule-strong bg-ink/95 backdrop-blur thin-scrollbar">
      <Cell
        label="Adresses"
        value={`${open}/${totalEpisodes}`}
        accent="paper"
        active={activeStatus === "all"}
        onClick={() => onStatusChange("all")}
      />
      <Cell
        label="Ouverts"
        value={open}
        accent="or"
        active={activeStatus === "open"}
        onClick={() => onStatusChange("open")}
      />
      <Cell
        label="Fermés"
        value={closed}
        accent="rouge"
        active={activeStatus === "closed"}
        onClick={() => onStatusChange("closed")}
      />
      <Cell
        label="Déf. fermés"
        value={permanentlyClosed}
        accent="grey"
        active={activeStatus === "permanently_closed"}
        onClick={() => onStatusChange("permanently_closed")}
      />
    </footer>
  );
}
