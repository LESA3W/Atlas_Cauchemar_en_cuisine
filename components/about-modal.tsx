"use client";

import { useEffect } from "react";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AboutModal({ open, onClose }: AboutModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-ink/85 backdrop-blur-sm anim-fade"
      onClick={onClose}
    >
      <div
        className="relative mx-4 max-h-[86vh] w-full max-w-[40rem] overflow-y-auto border border-rule-strong bg-ink-2 thin-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center border border-rule-strong text-paper hover:bg-ink-3"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
            <path d="M6 6 18 18" />
            <path d="m18 6-12 12" />
          </svg>
        </button>

        <div className="border-b border-rule px-6 py-6 md:px-10 md:py-8">
          <p className="eyebrow">Colophon</p>
          <h2 className="mt-3 font-display text-3xl text-paper md:text-4xl">
            À propos de cet atlas
          </h2>
          <p className="mt-3 font-display italic text-paper-mute">
            Une cartographie éditoriale, non officielle, des restaurants de l'émission.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-6 md:px-10 md:py-8">
          <section className="grid gap-2">
            <p className="eyebrow">Source</p>
            <p className="text-sm leading-7 text-paper-mute">
              Données extraites de l'article{" "}
              <a
                className="text-paper underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
                href="https://fr.wikipedia.org/wiki/Cauchemar_en_cuisine_(France)"
                target="_blank"
                rel="noreferrer"
              >
                Cauchemar en cuisine (France) — Wikipédia
              </a>{" "}
              le 8 mars 2026. 96 restaurants recensés. Géocodage manuel basé sur les villes et départements indiqués.
            </p>
          </section>

          <section className="grid gap-2">
            <p className="eyebrow">Mention</p>
            <p className="text-sm leading-7 text-paper-mute">
              Site indépendant à vocation documentaire. Aucun lien avec M6, Studio 89 Productions, ni avec Philippe Etchebest. Le logo et les noms d'émission appartiennent à leurs ayants droit.
            </p>
          </section>

          <section className="grid gap-2">
            <p className="eyebrow">Limites connues</p>
            <ul className="grid gap-2 text-sm leading-7 text-paper-mute">
              <li>· Une quarantaine d'adresses exactes restent à confirmer.</li>
              <li>· Les horaires d'ouverture sont partiels et peuvent évoluer.</li>
              <li>· Les notes affichées sont indicatives, dérivées d'un mélange de signaux publics.</li>
              <li>· Les photos sont génériques (Unsplash) en attendant des prises de vue libres de droits.</li>
            </ul>
          </section>

          <section className="grid gap-2">
            <p className="eyebrow">Émission</p>
            <p className="text-sm leading-7 text-paper-mute">
              Cauchemar en cuisine est diffusé sur M6 depuis 2011, présenté par le chef Philippe Etchebest.{" "}
              <a
                className="text-paper underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
                href="https://www.m6.fr/cauchemar-en-cuisine-avec-philippe-etchebest-p_841"
                target="_blank"
                rel="noreferrer"
              >
                Page officielle M6
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
