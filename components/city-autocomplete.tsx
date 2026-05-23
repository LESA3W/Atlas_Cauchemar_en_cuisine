"use client";

import { useEffect, useRef, useState } from "react";

type Commune = {
  nom: string;
  code: string;
  codeDepartement: string;
  population?: number;
};

type CityAutocompleteProps = {
  value: string;
  onChange: (city: string) => void;
  knownCities: Set<string>;
  placeholder?: string;
};

function dedupe(communes: Commune[]) {
  const seen = new Set<string>();
  const out: Commune[] = [];
  for (const c of communes) {
    const k = `${c.nom}|${c.codeDepartement}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(c);
  }
  return out;
}

export function CityAutocomplete({
  value,
  onChange,
  knownCities,
  placeholder = "Toutes villes"
}: CityAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Commune[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const abortRef = useRef<AbortController | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
          q
        )}&fields=nom,code,codeDepartement,population&boost=population&limit=10`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error("api error");
        const data: Commune[] = await res.json();
        setSuggestions(dedupe(data));
        setHighlight(-1);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  function pick(commune: Commune) {
    onChange(commune.nom);
    setQuery(commune.nom);
    setOpen(false);
  }

  function clear() {
    onChange("");
    setQuery("");
    setSuggestions([]);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(suggestions.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(-1, h - 1));
    } else if (e.key === "Enter") {
      if (highlight >= 0 && highlight < suggestions.length) {
        e.preventDefault();
        pick(suggestions[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const hasValue = value.length > 0;

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="block w-full border border-rule-strong bg-transparent px-3 py-2 pr-9 font-sans text-sm text-paper placeholder:font-display placeholder:italic placeholder:text-paper-soft outline-none focus:border-rouge"
          autoComplete="off"
          spellCheck={false}
          aria-autocomplete="list"
          aria-expanded={open}
        />
        {hasValue || query.length > 0 ? (
          <button
            type="button"
            onClick={clear}
            aria-label="Effacer"
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center text-paper-soft hover:text-paper"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M6 6 18 18" />
              <path d="m18 6-12 12" />
            </svg>
          </button>
        ) : loading ? (
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase text-or"
            style={{ letterSpacing: "0.18em" }}
          >
            ···
          </span>
        ) : null}
      </div>

      {open && query.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 z-[60] mt-1 max-h-[320px] overflow-y-auto border border-rule-strong bg-ink-2 shadow-2xl thin-scrollbar">
          {loading && suggestions.length === 0 ? (
            <p
              className="px-3 py-3 font-mono text-[10px] uppercase text-paper-soft"
              style={{ letterSpacing: "0.22em" }}
            >
              Recherche…
            </p>
          ) : suggestions.length === 0 ? (
            <p
              className="px-3 py-3 font-display italic text-sm text-paper-soft"
            >
              Aucune commune trouvée
            </p>
          ) : (
            <ul role="listbox">
              {suggestions.map((c, i) => {
                const hasResto = knownCities.has(c.nom);
                const isHi = i === highlight;
                return (
                  <li key={`${c.code}-${i}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isHi}
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => pick(c)}
                      className={`flex w-full items-center justify-between gap-3 border-b border-rule px-3 py-2 text-left last:border-b-0 ${
                        isHi ? "bg-ink-3" : "hover:bg-ink-3"
                      }`}
                    >
                      <span className="flex min-w-0 items-baseline gap-2">
                        <span className="truncate font-sans text-sm text-paper">{c.nom}</span>
                        <span
                          className="shrink-0 font-mono text-[10px] uppercase text-paper-soft"
                          style={{ letterSpacing: "0.16em" }}
                        >
                          {c.codeDepartement}
                        </span>
                      </span>
                      {hasResto ? (
                        <span
                          className="shrink-0 border border-or-soft px-1.5 py-0.5 font-mono text-[9px] uppercase text-or"
                          style={{ letterSpacing: "0.16em" }}
                        >
                          ★ Resto
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
