import { readFileSync } from "node:fs";

const raw = readFileSync(new URL("../data/restaurants.ts", import.meta.url), "utf8");
const m = raw.match(/RAW_RESTAURANT_ROWS\s*=\s*`([\s\S]*?)`/);
if (!m) {
  console.error("no rows");
  process.exit(1);
}
const rows = m[1].trim().split("\n");
const names = rows
  .map((r) =>
    r
      .split("\t")[1]
      ?.replace(/\[[^\]]+\]/g, "")
      .replace(/\(.*?\)/g, "")
      .trim()
  )
  .filter(Boolean);

const patterns = [
  ["Brasserie", /brasserie/i],
  ["Bistrot", /bistr[oô]/i],
  ["Pizzeria / Italien", /pizza|pizzer|trattoria|italien|romain|venet/i],
  ["Crêperie", /cr[êe]per/i],
  ["Bar / Pub", /\bbar\b|\bpub\b|tavern|estaminet|comptoir/i],
  ["Café / Salon de thé", /\bcaf[ée]\b|caf[eé]t[eé]ria|salon/i],
  ["Auberge", /auberge/i],
  ["Snack / Grill / Kebab", /grill|kebab|snack|burger/i],
  [
    "Brasserie de port / poisson",
    /port|p[eê]che|marin|pelican|p[ée]lican|p[eê]cheur|moules/i
  ],
  [
    "Asiatique / Exotique",
    /tha[iï]|asia|japo|sushi|chine|viet|indien|libanais|maroc/i
  ],
  ["Provençal / Sud", /provenç|olivier|olivetto|sud|midi|garrigue/i]
];

const buckets = Object.fromEntries(patterns.map(([k]) => [k, []]));
const unmatched = [];

for (const name of names) {
  let placed = false;
  for (const [label, re] of patterns) {
    if (re.test(name)) {
      buckets[label].push(name);
      placed = true;
      break;
    }
  }
  if (!placed) unmatched.push(name);
}

for (const [label, list] of Object.entries(buckets)) {
  if (list.length === 0) continue;
  console.log(`### ${label} (${list.length})`);
  list.forEach((n) => console.log("  - " + n));
  console.log();
}
console.log(`### Sans catégorie évidente (${unmatched.length})`);
unmatched.forEach((n) => console.log("  - " + n));
