"use client";

import { useEffect, useMemo, useState } from "react";
import { restaurants } from "@/data/restaurants";

type Entry = {
  id: string;
  episodeNumber: number;
  name: string;
  city: string;
  region?: string;
  lat: number;
  lng: number;
};

function buildGoogleMapsUrl(e: Entry) {
  const q = encodeURIComponent(`${e.name} ${e.city} France`);
  return `https://www.google.com/maps/search/${q}/@${e.lat},${e.lng},16z`;
}

const STORAGE_KEY = "cec-photo-collector";

export default function PhotoCollectorPage() {
  const entries: Entry[] = useMemo(
    () =>
      restaurants.map((r) => ({
        id: r.id,
        episodeNumber: r.episodeNumber,
        name: r.name,
        city: r.city,
        region: r.region,
        lat: r.lat,
        lng: r.lng
      })),
    []
  );

  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPhotos(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {}
  }, [photos, hydrated]);

  function setPhoto(id: string, url: string) {
    setPhotos((p) => ({ ...p, [id]: url }));
  }

  function download() {
    const filled: Record<string, string> = {};
    for (const [k, v] of Object.entries(photos)) {
      if (v && v.trim().length > 0) filled[k] = v.trim();
    }
    const blob = new Blob([JSON.stringify(filled, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "restaurant-photos.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    if (!confirm("Vider toutes les saisies ?")) return;
    setPhotos({});
  }

  const filledCount = Object.values(photos).filter((v) => v && v.trim().length > 0).length;
  const pct = Math.round((filledCount / entries.length) * 100);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-10 border-b border-rule bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="eyebrow">Admin · Collecte photos</p>
            <h1 className="font-display text-2xl text-paper">
              {filledCount} / {entries.length} photos saisies ({pct}%)
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearAll}
              className="border border-rule-strong px-3 py-2 font-mono text-[10px] uppercase text-paper-mute hover:border-rouge hover:text-paper"
              style={{ letterSpacing: "0.22em" }}
            >
              Vider
            </button>
            <button
              type="button"
              onClick={download}
              className="bg-rouge px-4 py-2 font-mono text-[10px] uppercase text-white hover:bg-rouge-bright"
              style={{ letterSpacing: "0.22em" }}
            >
              Télécharger JSON
            </button>
          </div>
        </div>
        <div className="h-1 w-full bg-ink-3">
          <div
            className="h-full bg-or transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-6">
        <div className="mb-6 border border-rule-strong bg-ink-2 p-4">
          <p className="eyebrow">Mode d'emploi</p>
          <ol className="mt-2 space-y-1 text-sm text-paper-mute">
            <li>1. Clique "Ouvrir Maps" — l'onglet Google Maps s'ouvre sur la fiche du restau</li>
            <li>2. Sur Maps, clique la photo principale, puis clic droit dessus → "Copier l'adresse de l'image"</li>
            <li>3. Reviens ici, colle l'URL dans le champ. Auto-save en local.</li>
            <li>4. Quand t'as fini (ou en cours), clique "Télécharger JSON" et envoie-moi le fichier.</li>
          </ol>
        </div>

        <ul className="grid gap-3">
          {entries.map((e) => {
            const val = photos[e.id] ?? "";
            const filled = val.trim().length > 0;
            return (
              <li
                key={e.id}
                className={`border p-3 ${
                  filled ? "border-or bg-ink-3" : "border-rule-strong bg-ink-2"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-mono text-[10px] uppercase text-or"
                      style={{ letterSpacing: "0.22em" }}
                    >
                      EP. {String(e.episodeNumber).padStart(3, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-paper">{e.name}</h3>
                    <p className="font-display italic text-sm text-paper-mute">
                      {e.city}
                      {e.region ? ` — ${e.region}` : ""}
                    </p>
                  </div>
                  <a
                    href={buildGoogleMapsUrl(e)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center bg-rouge px-3 py-2 font-mono text-[10px] uppercase text-white hover:bg-rouge-bright"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    Ouvrir Maps ↗
                  </a>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="url"
                    value={val}
                    onChange={(ev) => setPhoto(e.id, ev.target.value)}
                    placeholder="Colle l'URL de l'image ici…"
                    className="block w-full border border-rule-strong bg-transparent px-3 py-2 font-mono text-xs text-paper placeholder:text-paper-soft outline-none focus:border-rouge"
                  />
                  {filled ? (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-rule-strong bg-ink-3">
                      <img
                        src={val}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(ev) => {
                          (ev.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="sticky bottom-4 mt-6 flex justify-center">
          <button
            type="button"
            onClick={download}
            className="bg-rouge px-6 py-3 font-mono text-xs uppercase text-white shadow-2xl hover:bg-rouge-bright"
            style={{ letterSpacing: "0.22em" }}
          >
            Télécharger JSON ({filledCount}/{entries.length})
          </button>
        </div>
      </main>
    </div>
  );
}
