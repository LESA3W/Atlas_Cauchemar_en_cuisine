"use client";

type BrandBarProps = {
  totalRestaurants: number;
  onOpenAbout: () => void;
  onToggleIndex: () => void;
  indexOpen: boolean;
};

export function BrandBar({
  totalRestaurants,
  onOpenAbout,
  onToggleIndex,
  indexOpen
}: BrandBarProps) {
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
        >
          <img
            src="/images/cauchemar-en-cuisine-logo.png"
            alt="Cauchemar en cuisine — logo officiel"
            className="h-7 w-auto md:h-9"
          />
        </a>
      </div>

      <div className="hidden md:flex flex-col items-center text-center">
        <p className="font-display text-paper text-lg leading-none tracking-tight">
          L'Atlas
        </p>
        <p
          className="mt-0.5 font-mono text-[9.5px] uppercase text-paper-soft"
          style={{ letterSpacing: "0.32em" }}
        >
          {totalRestaurants} adresses · France & Corse
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
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
          className="inline-flex items-center bg-rouge px-3 py-1.5 font-mono text-[10px] uppercase text-paper hover:bg-rouge-bright"
          style={{ letterSpacing: "0.22em" }}
        >
          Voir M6
        </a>
      </div>
    </header>
  );
}
