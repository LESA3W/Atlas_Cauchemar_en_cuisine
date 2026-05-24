type AtlasFooterProps = {
  totalEpisodes: number;
  openCount: number;
  permanentlyClosedCount: number;
};

const faqEntries = [
  {
    q: "Combien d'épisodes de Cauchemar en cuisine ont été diffusés en France ?",
    a: (total: number) =>
      `Depuis le 18 avril 2011, ${total} épisodes standard de Cauchemar en cuisine avec Philippe Etchebest ont été diffusés sur M6, le dernier en date étant l'épisode 97 (La Sarriette à Médière) le 24 mars 2026.`
  },
  {
    q: "Combien de restaurants de Cauchemar en cuisine sont encore ouverts ?",
    a: (_total: number, open: number) =>
      `Selon les données disponibles, environ ${open} des restaurants tournés dans l'émission seraient toujours en activité, les autres ayant définitivement fermé ou changé de propriétaire.`
  },
  {
    q: "Qui présente Cauchemar en cuisine en France ?",
    a: () =>
      "Philippe Etchebest, chef cuisinier français Meilleur Ouvrier de France et étoilé Michelin, présente l'émission Cauchemar en cuisine sur M6 depuis 2011."
  },
  {
    q: "Dans quelle ville s'est tourné le premier épisode de Cauchemar en cuisine ?",
    a: () =>
      "Le tout premier épisode de Cauchemar en cuisine avec Philippe Etchebest a été tourné au restaurant The House à Toulon (Var), et diffusé le 18 avril 2011."
  },
  {
    q: "Où trouver la liste de tous les restaurants visités dans Cauchemar en cuisine ?",
    a: () =>
      "L'atlas interactif sur carte-cauchemar-en-cuisine.vercel.app recense les 97 adresses sur une carte de France et de Corse, avec leur statut d'ouverture en direct, leurs horaires et leur ville."
  }
];

export function AtlasFooter({
  totalEpisodes,
  openCount,
  permanentlyClosedCount
}: AtlasFooterProps) {
  return (
    <footer className="relative z-[100] border-t border-rule bg-ink-2 px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-5xl gap-12">
        <section aria-labelledby="about-heading" className="grid gap-4">
          <p className="eyebrow">À propos de l'atlas</p>
          <h2
            id="about-heading"
            className="font-display text-3xl text-paper md:text-4xl"
          >
            Une cartographie complète, mise à jour en temps réel
          </h2>
          <div className="grid gap-4 font-display text-base leading-7 text-paper-mute md:text-lg">
            <p>
              <strong className="text-paper">Carte Cauchemar en cuisine</strong>{" "}
              recense les <strong className="text-paper">{totalEpisodes} restaurants</strong>{" "}
              visités par le chef étoilé <em>Philippe Etchebest</em> dans
              l'émission de téléréalité culinaire{" "}
              <em>Cauchemar en cuisine</em>, diffusée sur la chaîne M6 depuis le
              18 avril 2011 et produite par Studio 89 Productions. Pour chaque
              établissement, l'atlas affiche son statut d'ouverture en direct
              (calculé à l'heure de Paris), son adresse, ses horaires et sa
              fiche détaillée.
            </p>
            <p>
              Sur les {totalEpisodes} restaurants tournés, environ{" "}
              <strong className="text-or">{openCount}</strong> sont aujourd'hui
              encore en activité et{" "}
              <strong className="text-rouge-bright">
                {permanentlyClosedCount}
              </strong>{" "}
              ont définitivement fermé. La couverture géographique englobe les
              13 régions de France métropolitaine ainsi que la Corse, du tout
              premier épisode tourné chez{" "}
              <em>The House</em> à Toulon le 18 avril 2011, jusqu'au plus
              récent <em>La Sarriette</em> à Médière dans le Doubs, diffusé le
              24 mars 2026.
            </p>
          </div>
        </section>

        <section aria-labelledby="method-heading" className="grid gap-3">
          <p className="eyebrow">Méthodologie</p>
          <h2 id="method-heading" className="font-display text-2xl text-paper">
            Sources et fiabilité des données
          </h2>
          <p className="text-sm leading-7 text-paper-mute md:text-base">
            Les noms d'épisodes, restaurants, villes et dates de diffusion
            proviennent de l'article{" "}
            <a
              className="text-paper underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
              href="https://fr.wikipedia.org/wiki/Cauchemar_en_cuisine_(France)"
              target="_blank"
              rel="noreferrer"
            >
              <em>Cauchemar en cuisine (France)</em> sur Wikipédia
            </a>
            , extrait le 8 mars 2026 puis enrichi manuellement pour l'épisode 97
            (mars 2026). Les coordonnées géographiques sont calculées au centre
            de la commune indiquée. Le statut ouvert / fermé est re-calculé
            toutes les soixante secondes en comparant l'heure de Paris aux
            créneaux horaires connus pour chaque restaurant. Les horaires
            partiels sont signalés ; les adresses précises restent à confirmer
            pour environ 40 restaurants. Site indépendant à vocation
            documentaire, sans lien commercial avec M6, Studio 89 Productions
            ni Philippe Etchebest.
          </p>
        </section>

        <section aria-labelledby="faq-heading" className="grid gap-4">
          <p className="eyebrow">Questions fréquentes</p>
          <h2 id="faq-heading" className="font-display text-2xl text-paper">
            Tout savoir sur l'atlas Cauchemar en cuisine
          </h2>
          <dl className="grid gap-5">
            {faqEntries.map((entry) => (
              <div key={entry.q} className="grid gap-1.5 border-l-2 border-rouge pl-4">
                <dt className="font-display text-lg text-paper">{entry.q}</dt>
                <dd className="text-sm leading-7 text-paper-mute md:text-base">
                  {entry.a(totalEpisodes, openCount)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="credits-heading" className="grid gap-3 border-t border-rule pt-8">
          <p className="eyebrow">Crédits</p>
          <h2 id="credits-heading" className="font-display text-xl text-paper">
            Sources, technologies et mentions
          </h2>
          <ul className="grid gap-2 text-sm leading-6 text-paper-mute">
            <li>
              <strong className="text-paper">Données</strong> · Wikipédia (CC BY-SA), pages
              officielles M6, vérifications manuelles.
            </li>
            <li>
              <strong className="text-paper">Cartographie</strong> ·{" "}
              <a
                className="underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
                href="https://www.openstreetmap.org"
                target="_blank"
                rel="noreferrer"
              >
                OpenStreetMap
              </a>{" "}
              + tiles{" "}
              <a
                className="underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
                href="https://carto.com/attributions"
                target="_blank"
                rel="noreferrer"
              >
                CARTO
              </a>{" "}
              (Positron / Dark Matter), rendu via{" "}
              <a
                className="underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
                href="https://leafletjs.com"
                target="_blank"
                rel="noreferrer"
              >
                Leaflet
              </a>
              .
            </li>
            <li>
              <strong className="text-paper">Communes</strong> · API officielle{" "}
              <a
                className="underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
                href="https://geo.api.gouv.fr"
                target="_blank"
                rel="noreferrer"
              >
                geo.api.gouv.fr
              </a>
              .
            </li>
            <li>
              <strong className="text-paper">Photographies</strong> · banque Unsplash,
              images d'illustration thématiques par catégorie de restaurant.
            </li>
            <li>
              <strong className="text-paper">Curation et développement</strong> ·{" "}
              <a
                className="underline decoration-rouge underline-offset-4 hover:text-rouge-bright"
                href="https://github.com/LESA3W/Atlas_Cauchemar_en_cuisine"
                target="_blank"
                rel="noreferrer"
              >
                LESA3W
              </a>{" "}
              — code ouvert sous licence MIT.
            </li>
            <li>
              <strong className="text-paper">Mention légale</strong> · projet indépendant
              non officiel. Le logo, les noms et les marques associés à
              l'émission appartiennent à leurs ayants droit (Groupe M6, Studio
              89 Productions, Philippe Etchebest).
            </li>
          </ul>
        </section>

        <p className="text-center font-mono text-[10px] uppercase text-paper-soft" style={{ letterSpacing: "0.22em" }}>
          © {new Date().getFullYear()} L'Atlas Cauchemar en cuisine — Édition documentaire indépendante
        </p>
      </div>
    </footer>
  );
}
