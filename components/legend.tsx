"use client";

import { useState } from "react";

function Swatch({ tone }: { tone: "open" | "closed" | "selected" }) {
  const colorClass =
    tone === "open"
      ? "bg-rouge"
      : tone === "closed"
        ? "bg-ink-3 border border-paper-ghost"
        : "bg-or";
  return <span className={`inline-block h-3 w-3 ${colorClass}`} />;
}

export function Legend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-auto absolute bottom-3 left-3 z-[1100] md:bottom-5 md:left-5">
      {open ? (
        <div className="border border-rule-strong bg-ink-2/95 p-4 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-6">
            <p className="eyebrow">Légende</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-paper-soft hover:text-paper"
              aria-label="Replier la légende"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 6 18 18" />
                <path d="m18 6-12 12" />
              </svg>
            </button>
          </div>
          <ul className="mt-3 grid gap-2 text-xs text-paper-mute">
            <li className="flex items-center gap-3">
              <Swatch tone="open" />
              <span>Restaurant ouvert</span>
            </li>
            <li className="flex items-center gap-3">
              <Swatch tone="selected" />
              <span>Sélection en cours</span>
            </li>
            <li className="flex items-center gap-3">
              <Swatch tone="closed" />
              <span>Statut inconnu / fermé</span>
            </li>
          </ul>
          <p className="mt-3 border-t border-rule pt-3 font-display italic text-[11px] text-paper-soft">
            Cliquez un point pour ouvrir la fiche.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 border border-rule-strong bg-ink-2/95 px-3 py-2 font-mono text-[10px] uppercase text-paper-mute backdrop-blur hover:border-rouge hover:text-paper"
          style={{ letterSpacing: "0.22em" }}
        >
          <Swatch tone="open" />
          Légende
        </button>
      )}
    </div>
  );
}
