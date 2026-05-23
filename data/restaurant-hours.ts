import type { OpeningHour } from "@/types/restaurant";

type ParsedRestaurantHours = {
  openingHours: OpeningHour[];
  hasFoundHours: boolean;
  hasOpenHours: boolean;
};

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche"
] as const;

export const unknownOpeningHours: OpeningHour[] = DAYS.map((day) => ({
  day,
  hours: "Horaires inconnus"
}));

const PROVIDED_HOURS_ROWS = `
1	12:00-14:30	11:30-15:00|19:00-22:00	11:30-15:00|19:00-22:00	11:30-15:00|19:00-22:00	11:30-15:00|19:00-22:00	11:30-15:00|19:00-22:00	12:00-14:30
2	ferme	ferme	ferme	ferme	ferme	ferme	ferme
3	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
4	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
5	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
6	12:00-13:30|19:00-20:30	12:00-13:30|19:00-20:30	12:00-13:30|19:00-20:30	12:00-13:30|19:00-20:30	12:00-13:30|19:00-20:30	12:00-13:45|19:00-21:00	12:00-13:45
7	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
9	?	?	?	?	19:00-22:00?	?	?
11	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve
12	non trouve	12:00-13:30?	non trouve	non trouve	non trouve	non trouve	non trouve
13	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve
14	ferme	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:30	12:00-14:00|19:00-22:30	ferme	ferme
16	ferme	ouvert midi/soir	ouvert midi/soir	ouvert midi/soir	ouvert midi/soir	ouvert midi/soir	ferme
17	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve
19	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve
21	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve	non trouve
24	ferme	09:00-19:00	09:00-19:00	09:00-19:00	09:00-19:00	09:00-19:00	09:00-12:00
25	ferme	07:30-13:30|16:30-19:30	07:30-13:30|16:30-19:30	07:30-13:30|16:30-19:30	07:30-13:30|16:30-19:30	07:30-13:30|16:30-19:30	07:30-14:00
28	10:30-23:00	10:30-23:00	10:30-23:00	10:30-23:00	10:30-00:00	10:30-00:00	10:30-23:00
31	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
32	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
35	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
36	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
37	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
38	ferme	10:00-14:30|18:00-22:00	10:00-14:30	10:00-14:30|18:00-22:00	10:00-14:30|18:00-22:00	10:00-14:30|18:00-22:00	10:00-14:30
39	ferme	12:00-14:00|19:00-21:30	12:00-14:00|19:00-21:30	12:00-14:00|19:00-21:30	12:00-14:00|19:00-21:30	12:00-14:00|19:00-21:30	ferme
40	11:30-15:30|18:00-23:30	11:30-15:30|18:00-23:30	11:30-15:30|18:00-23:30	11:30-15:30|18:00-23:30	11:30-15:30|18:00-23:30	11:30-15:30|18:00-23:30	11:30-15:30|18:00-23:30
43	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
44	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
47	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
48	11:00-14:30|19:00-21:30	11:00-14:30|19:00-21:30	11:00-14:30|19:00-21:30	11:00-14:30|19:00-21:30	11:00-14:30|19:00-21:30	19:00-21:30	ferme
49	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
51	12:00-14:00|19:00-22:00	ferme	ferme	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00
52	unknown	unknown	unknown	unknown	unknown	unknown	unknown
53	ferme	11:30-14:00|18:30-22:30	11:30-14:00|18:30-22:30	11:30-14:00|18:30-22:30	11:30-14:00|18:30-23:30	11:30-14:00|18:30-23:30	ferme
55	unknown	unknown	unknown	unknown	unknown	unknown	unknown
56	unknown	unknown	unknown	unknown	unknown	unknown	unknown
57	ferme	11:00-14:00|18:30-22:00	11:00-14:00|18:30-22:00	11:00-14:00|18:30-22:00	11:00-14:00|18:30-22:00	09:00-14:00|18:30-22:00	ferme
58	08:00-14:00	08:00-14:00	08:00-14:00|19:00-22:00	08:00-14:00|19:00-22:00	08:00-14:00|19:00-22:00	11:00-14:00|19:00-22:00	ferme
59	ferme	ferme	ferme	ferme	12:00-22:00	12:00-22:00	12:00-17:00
60	10:30-15:00	10:30-15:00	10:30-15:00	10:30-15:00	10:30-15:00	Ferme	Ferme
61	07:00-15:00	07:00-20:00	07:00-20:00	07:00-20:00	07:00-00:30	07:00-20:00	08:00-13:00
62	Ferme	07:00-14:00|18:00-20:00	07:00-14:00	07:00-14:00|18:00-20:00	07:00-14:00|18:00-20:00	09:00-14:00|18:00-20:00	09:00-14:00
63	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
65	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
66	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
67	Ferme	Ferme	12:00-14:30|18:00-22:00	12:00-14:30|18:00-22:00	12:00-14:30|18:00-23:00	12:00-14:30|18:00-23:00	12:00-14:30|18:00-22:00
68	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
70	Ferme	Ferme	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00
71	12:00-14:30	12:00-14:30	Ferme	12:00-14:30|19:00-22:00	12:00-14:30|19:00-22:00	12:00-14:30|19:00-22:00	12:00-14:30
72	06:00-23:00	05:00-23:00	05:00-23:00	05:00-23:00	05:00-16:30	Ferme	Ferme
73	Inconnu	Inconnu	Ouvert	Ouvert	Ouvert	Ouvert	Ouvert
74	11:30-14:00	11:30-14:00	11:30-14:00	11:30-14:00|18:30-21:00	11:30-14:00|18:30-21:00	11:30-14:00|18:30-21:00	Ferme
75	19:15-21:00	12:00-13:30|19:15-21:00	12:00-13:30|19:15-21:00	12:00-13:30|19:15-21:00	12:00-13:30|19:15-21:00	19:15-21:00	Ferme
76	Inconnu	Inconnu	Inconnu	Inconnu	Inconnu	Inconnu	Inconnu
78	Inconnu	Inconnu	Inconnu	Inconnu	Inconnu	Inconnu	Inconnu
79	ferme	12:00-14:30	12:00-14:30	12:00-14:30|19:00-21:00	12:00-14:30|19:00-21:00	19:00-21:30	12:00-14:00
80	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
82	ferme	ferme	12:00-15:00	12:00-15:00	12:00-15:00|19:00-23:00	12:00-15:00|19:00-23:00	12:00-15:00
83	08:00-16:00	08:00-16:00	08:00-16:00	08:00-16:00	08:00-16:00	08:00-16:00	ferme
84	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
85	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
86	ferme	ferme	ferme	ferme	ferme	ferme	ferme
87	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
88	08:30-19:30	08:30-19:30	08:30-19:30	08:30-19:30	08:30-21:30	ferme	ferme
89	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
90	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
91	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
92	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
93	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
`;

const SUPPLEMENTAL_HOURS_ROWS = `
3	11:00-02:00	11:00-02:00	11:00-02:00	11:00-02:00	11:00-02:00	11:00-02:00	11:00-02:00
4	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
5	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
7	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
8	24h/24	24h/24	24h/24	24h/24	24h/24	24h/24	24h/24
10	12:00-14:30|19:00-22:30	12:00-14:30|19:00-22:30	12:00-14:30|19:00-22:30	12:00-14:30|19:00-22:30	12:00-14:30|19:00-22:30	12:00-14:30|19:00-22:30	12:00-14:30|19:00-22:30
11	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
13	09:00-12:00|14:00-18:00	09:00-12:00|14:00-18:00	09:00-12:00|14:00-18:00	09:00-12:00|14:00-18:00	09:00-12:00|14:00-18:00	ferme	ferme
15	ferme	10:00-19:00	10:00-19:00	10:00-19:00	10:00-19:00	10:00-19:00	10:00-19:00
17	ferme	11:00-14:00|19:00-21:00	11:00-14:00|19:00-21:00	11:00-14:00|19:00-21:00	11:00-14:00|19:00-21:00	11:00-14:00|19:00-21:00	11:00-14:00
18	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
19	10:00-15:00|19:00-22:00	10:00-15:00|19:00-22:00	10:00-15:00|19:00-22:00	10:00-15:00|19:00-22:00	10:00-15:00|19:00-22:00	10:00-15:00|19:00-22:00	10:00-15:00|19:00-22:00
20	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
21	12:00-14:00	12:00-14:00	12:00-14:30|19:30-22:00	19:30-22:00	12:00-15:00	inconnu	inconnu
22	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
23	12:00-14:00|19:30-22:00	12:00-14:00|19:30-22:00	12:00-14:00|19:30-22:00	12:00-14:00|19:30-22:00	12:00-14:00|19:30-22:00	12:00-14:00|19:30-22:00	12:00-14:00|19:30-22:00
26	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
27	ferme	10:00-15:00	10:00-15:00	10:00-15:00	10:00-15:00|19:15-23:00	10:00-15:00|19:15-23:00	10:00-15:30
29	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
30	11:30-13:45|18:00-22:30	11:30-13:45|18:00-22:30	ferme	11:30-13:45|18:00-22:30	11:30-13:45|18:00-22:30	11:30-13:45|18:00-22:30	18:00-22:30
31	ferme	ferme	ferme	ferme	ferme	ferme	ferme
32	ferme	ferme	ferme	ferme	ferme	ferme	ferme
33	ferme	ferme	ferme	ferme	ferme	ferme	ferme
34	09:30-14:00|18:00-21:30	06:00-14:00|18:00-21:30	06:00-14:00|18:00-21:30	06:00-14:00|18:00-21:30	06:00-14:00	ferme	ferme
35	ferme	ferme	ferme	ferme	ferme	ferme	ferme
36	ferme	ferme	ferme	ferme	ferme	ferme	ferme
37	ferme	ferme	ferme	ferme	ferme	ferme	ferme
41	ferme	ferme	ferme	ferme	ferme	ferme	ferme
42	ferme	ferme	ferme	ferme	ferme	ferme	ferme
43	ferme	ferme	ferme	ferme	ferme	ferme	ferme
44	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	ferme	ferme
45	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
46	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
47	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
49	08:00-19:00	08:00-19:00	08:00-19:00	08:00-19:00	08:00-19:00	ferme	ferme
50	07:00-12:00	07:00-14:00	09:00-13:30	07:00-13:30|18:30-21:00	07:00-14:30|18:30-22:00	09:00-14:00|18:30-22:00	09:00-14:00
52	09:00-22:00	11:00-22:00	11:00-22:00	11:00-22:00	11:00-17:00	ferme	ferme
54	12:00-14:30|19:00-21:30	12:00-14:30	ferme	12:00-14:30|19:00-21:30	12:00-14:30|19:00-21:30	19:00-21:30	ferme
55	06:00-15:00|17:30-21:00	06:00-15:00|17:30-21:00	06:00-15:00|17:30-21:00	06:00-15:00|17:30-21:00	06:00-15:00|17:30-21:00	08:00-15:00|17:30-22:00	ferme
56	ferme	ferme	ferme	ferme	ferme	ferme	ferme
63	19:00-00:00	19:00-00:00	19:00-00:00	19:00-00:00	19:00-00:00	19:00-00:00	ferme
64	ferme	12:00-14:00|19:00-23:00	12:00-14:00|19:00-23:00	12:00-14:00|19:00-23:00	12:00-14:00|19:00-23:00	12:00-14:00|19:00-23:00	ferme
65	ferme	ferme	ferme	ferme	ferme	ferme	ferme
66	09:30-15:00	09:30-15:00	ferme	09:30-15:00	09:30-15:00	10:00-15:00|18:00-22:00	10:00-15:00
68	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
69	07:00-15:00	07:00-20:30	07:00-20:30	07:00-20:30	07:00-20:30	08:00-20:30	08:00-20:30
76	ferme	12:00-13:30	12:00-13:30	12:00-13:30|19:30-21:30	12:00-13:30|19:30-21:30	12:00-13:30|19:30-21:30	12:00-13:30
77	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
78	ferme	ferme	ferme	ferme	ferme	ferme	ferme
80	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
81	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
84	ferme	ferme	ferme	ferme	ferme	ferme	ferme
85	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
87	ferme	ferme	ferme	ferme	ferme	ferme	ferme
89	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu	inconnu
90	12:00-14:00|19:00-21:30	12:00-14:00|19:00-21:30	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	12:00-14:00|19:00-22:00	11:30-14:00|19:00-21:30
91	ferme	ferme	ferme	ferme	ferme	ferme	ferme
92	11:00-17:00	09:00-22:00	09:00-22:00	09:00-22:00	09:00-22:00	09:00-22:00	09:00-22:00
93	08:00-14:00	08:00-14:00	ferme	ferme	08:00-14:00	09:00-14:00|17:00-22:00	09:00-14:00
94	08:30-15:00|18:00-00:00	04:30-15:00|18:00-00:00	04:30-15:00|18:00-00:00	04:30-15:00|18:00-00:00	04:30-15:00|18:30-00:00	04:30-07:30	ferme
95	10:00-22:00	10:30-22:00	10:00-15:00	ferme	10:00-22:00	10:00-22:00	10:00-22:00
96	08:30-15:00|18:00-00:00	04:30-15:00|18:00-00:00	04:30-15:00|18:00-00:00	04:30-15:00|18:00-00:00	04:30-15:00|18:30-00:00	04:30-07:30	ferme
`;

const EXPLICIT_HIDE_EPISODES = new Set([
  4, 5, 7, 11, 18, 20, 22, 26, 29, 31, 32, 33, 35, 36, 37, 41, 42, 43, 45, 46,
  47, 56, 68, 77, 80, 81, 85, 89
]);

function stripDiacritics(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeHourCell(value: string) {
  return value.trim().replace(/^"|"$/g, "");
}

function parseHourCell(value: string) {
  const raw = normalizeHourCell(value);
  const cleaned = raw.replace(/\?/g, "").trim();
  const lowered = stripDiacritics(cleaned.toLowerCase());

  if (
    lowered.length === 0 ||
    lowered === "?" ||
    lowered === "inconnu" ||
    lowered === "unknown" ||
    lowered === "non trouve"
  ) {
    return {
      closed: false,
      known: false,
      hours: "Horaires inconnus"
    };
  }

  if (lowered.startsWith("ferme")) {
    return {
      closed: true,
      known: true,
      hours: "Fermé"
    };
  }

  if (lowered === "ouvert") {
    return {
      closed: false,
      known: true,
      hours: "Ouvert"
    };
  }

  if (lowered === "ouvert midi/soir") {
    return {
      closed: false,
      known: true,
      hours: "Ouvert midi / soir"
    };
  }

  return {
    closed: false,
    known: /\d/.test(cleaned) || lowered.includes("ouvert"),
    hours: cleaned.replace(/\|/g, " / ")
  };
}

function parseHoursRows(rawRows: string) {
  return Object.fromEntries(
    rawRows.trim().split("\n").map((row) => {
      const [episodeNumber, ...cells] = row.split("\t");
      const parsedCells = cells.map((cell) => parseHourCell(cell));

      return [
        Number(episodeNumber),
        {
          hasFoundHours: parsedCells.some((cell) => cell.known),
          hasOpenHours: parsedCells.some((cell) => cell.known && !cell.closed),
          openingHours: DAYS.map((day, index) => ({
            day,
            hours: parsedCells[index]?.hours ?? "Horaires inconnus",
            ...(parsedCells[index]?.closed ? { closed: true } : {})
          }))
        } satisfies ParsedRestaurantHours
      ];
    })
  ) as Record<number, ParsedRestaurantHours>;
}

const baseRestaurantHoursByEpisode = parseHoursRows(PROVIDED_HOURS_ROWS);
const supplementalRestaurantHoursByEpisode = parseHoursRows(SUPPLEMENTAL_HOURS_ROWS);

export const restaurantHoursByEpisode = {
  ...baseRestaurantHoursByEpisode,
  ...supplementalRestaurantHoursByEpisode
};

export const episodesHiddenFromMap = Object.entries(
  supplementalRestaurantHoursByEpisode
)
  .map(([episodeNumber]) => Number(episodeNumber))
  .filter((episodeNumber) => EXPLICIT_HIDE_EPISODES.has(episodeNumber))
  .sort((left, right) => left - right);

export const episodesWithFoundHours = Object.entries(restaurantHoursByEpisode)
  .filter(([, value]) => value.hasFoundHours)
  .map(([episodeNumber]) => Number(episodeNumber))
  .sort((left, right) => left - right);

export const episodesWithoutFoundHours = Object.entries(restaurantHoursByEpisode)
  .filter(([, value]) => !value.hasFoundHours)
  .map(([episodeNumber]) => Number(episodeNumber))
  .sort((left, right) => left - right);
