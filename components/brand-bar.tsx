"use client";

import { useTheme } from "@/components/theme-provider";

type BrandBarProps = {
  totalRestaurants: number;
  onOpenAbout: () => void;
  onToggleIndex: () => void;
  indexOpen: boolean;
};

export function BrandBar({
  onOpenAbout,
  onToggleIndex,
  indexOpen
}: BrandBarProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="relative z-[1200] flex h-14 items-center justify-between gap-4 border-b border-rule bg-ink/95 px-3 backdrop-blur md:h-16 md:px-5">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onToggleIndex}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center border border-rule-strong text-paper hover:bg-ink-3"
          aria-label={indexOpen ? "Fermer l'index" : "Ouvrir l'index"}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
          >
            {indexOpen ? (
              <>
                <path d="M6 6 18 18" />
                <path d="m18 6-12 12" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
        <a
          href="https://www.m6.fr/cauchemar-en-cuisine-avec-philippe-etchebest-p_841"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3"
          aria-label="Voir Cauchemar en cuisine sur M6"
        >
          <img
            src="/images/cauchemar-en-cuisine-logo.png"
            alt="Cauchemar en cuisine — logo officiel"
            className="h-7 w-auto md:h-9"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))"
            }}
          />
        </a>
      </div>

      <div className="hidden md:flex flex-col items-center text-center">
        <p className="font-display text-paper text-lg leading-none tracking-tight">
          L'Atlas <span className="text-paper-soft">—</span> Cauchemar en cuisine
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
          className="inline-flex h-9 w-9 items-center justify-center border border-rule-strong text-paper-mute hover:border-rouge hover:text-paper"
        >
          {isDark ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={onOpenAbout}
          aria-label="Ouvrir le colophon"
          className="inline-flex h-9 items-center justify-center border border-rule-strong px-2 font-mono text-[10px] uppercase text-paper-mute hover:border-rouge hover:text-paper sm:px-3"
          style={{ letterSpacing: "0.22em" }}
        >
          <svg className="h-4 w-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01" />
            <path d="M11 12h1v4h1" />
          </svg>
          <span className="hidden sm:inline">Colophon</span>
        </button>
        <a
          href="https://www.m6.fr/cauchemar-en-cuisine-avec-philippe-etchebest-p_841"
          target="_blank"
          rel="noreferrer"
          aria-label="Regarder sur M6"
          className="inline-flex h-9 items-center justify-center gap-1.5 bg-rouge px-2 font-mono text-[10px] uppercase text-white hover:bg-rouge-bright sm:px-3"
          style={{ letterSpacing: "0.22em" }}
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="hidden sm:inline">Regarder sur M6</span>
        </a>
      </div>
    </header>
  );
}
