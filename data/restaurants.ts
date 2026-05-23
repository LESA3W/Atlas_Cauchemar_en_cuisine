import type {
  OpeningHour,
  Restaurant,
  RestaurantStatus
} from "@/types/restaurant";
import { restaurantAddressByEpisode } from "@/data/restaurant-addresses";
import {
  episodesHiddenFromMap,
  restaurantHoursByEpisode,
  unknownOpeningHours
} from "@/data/restaurant-hours";

type RawRestaurantSeed = {
  episodeNumber: number;
  rawName: string;
  city: string;
  department: string;
  episodeDate: string;
};

type GeoSeed = {
  lat: number;
  lng: number;
  region: string;
};

const SOURCE_URL = "https://fr.wikipedia.org/wiki/Cauchemar_en_cuisine_(France)";

export const dataSourceLabel = "Wikipedia, extraction du 8 mars 2026";

const RAW_RESTAURANT_ROWS = `
1	The House[10]	Toulon	Var	Lundi 18 avril 2011
2	Le Moulin de la Grasiho[12]	Fontvieille	Bouches-du-Rhône	Lundi 18 avril 2011
3	Au Petit Diablotin[13]	Sète	Hérault	Mardi 13 décembre 2011
4	Les Larmes de Bacchus[15]	Lyon	Rhône	Mardi 3 janvier 2012
5	Le Jardin de la Mer[17]	Port Grimaud	Var	Mardi 10 janvier 2012
6	Le Plat d'Étain[19]	Brou	Eure-et-Loir	Mardi 17 janvier 2012
7	Le Grilladin[21]	Stiring-Wendel	Moselle	Mardi 22 mai 2012
8	L'Ovalie (devenu Aux délices du nord au sud)[23],[24]	Moissac	Tarn-et-Garonne	Mardi 29 mai 2012
9	Le Café de France[26]	Corte	Haute-Corse	Mercredi 23 janvier 2013
10	Le Londinium (devenu L'Escale)[30]	Juan-les-Pins	Alpes-Maritimes	Mercredi 30 janvier 2013
11	La Bulle[32]	Lavelanet	Ariège	Lundi 13 mai 2013
12	Le Régal & Vous[35]	Rethel	Ardennes	Lundi 20 mai 2013
13	La Brasserie de la Poste[37],[38]	Blagnac	Haute-Garonne	Lundi 27 mai 2013
14	Le Blue Bar[40],[41]	Chilly-Mazarin	Essonne	Mercredi 9 octobre 2013
15	Le Carré du Port (devenu Le Coin Provencal)[43],[44]	Marseille	Bouches-du-Rhône	Mercredi 16 octobre 2013
16	Le Bistrot du Pélican[47],[48],[49]	Lille	Nord	Mercredi 23 octobre 2013
17	Le Mardaric (décédé le 15 novembre 2021)[51],[52]	Peyruis	Alpes-de-Haute-Provence	Lundi 5 mai 2014
18	Chez maman (devenu Du Temps de Maman),[55]	Amiens	Somme	Lundi 12 mai 2014
19	L’Olivier,[57]	Montesquieu-Volvestre	Haute-Garonne	Lundi 19 mai 2014
20	La Villa Blanche (devenu Le Cosi),[59]	Chalèze	Doubs	Mardi 27 mai 2014
21	Le Mas de Peynier	Peynier	Bouches-du-Rhône	Mercredi 3 décembre 2014
22	Crêperie d'Antan (devenu Le Do-Ré-Mie)	Nantes	Loire-Atlantique	Mercredi 15 avril 2015
23	Le Nautique (changement de propriétaire)[63]	La Ciotat	Bouches-du-Rhône	Lundi 27 avril 2015
24	Tourist Bar	Orbec	Calvados	Lundi 4 mai 2015
25	O Clin d'œil	Vendargues	Hérault	Mardi 12 mai 2015
26	La Taverne des Pirates  (devenu Key West Restaurant)[68]	Neufchâteau	Vosges	Mardi 22 septembre 2015
27	Au Vieux Port  (devenu Chez Ruben et Bénedicte)[69]	Irigny	Rhône	Mardi 29 septembre 2015
28	La Belle Époque	Cabourg	Calvados	Mardi 6 octobre 2015
29	Le Joker (devenu La Brasserie Communale)	Marseille	Bouches-du-Rhône	Mercredi 17 février 2016
30	Pizza Kelly (devenu La Fabrique)[74]	Cagnes-sur-Mer	Alpes-Maritimes	Mardi 17 mai 2016
31	O Cantinho[76]	Pfastatt	Haut-Rhin	Mercredi 14 septembre 2016
32	Au coin du feu[78]	Vandœuvre-lès-Nancy	Meurthe-et-Moselle	Mercredi 21 septembre 2016
33	Le Jardin Italien (Devenu O Venetie)	Martignas-sur-Jalle	Gironde	Mercredi 5 octobre 2016
34	Le Cèdre Vert (changement de propriétaire)[82],[83],[84]	Gardonne	Dordogne	Lundi 12 décembre 2016
35	Auberge de la Venise Verte[86],[87]	Arçais	Deux-Sèvres	Mercredi 18 janvier 2017
36	Le Pontet[89]	Quintenas	Ardèche	Lundi 20 mars 2017
37	O Franco Thaï	Marseille	Bouches-du-Rhône	Jeudi 4 mai 2017
38	La Ch'ti Alsace[92]	Mandelieu-la-Napoule	Alpes-Maritimes	Mercredi 13 septembre 2017
39	Le Trinquet	Cestas	Gironde	Mercredi 20 septembre 2017
40	La Baie des anges	Strasbourg	Bas-Rhin	Samedi 30 septembre 2017
41	Le Petit Resto (Changement de propriétaire, devenu Le petit boulevard)(Fermé, devenue Le Bourisco)	Saint-Quentin	Aisne	Samedi 14 octobre 2017
42	La Sarrazine[97],[98] (changement de propriétaire)	Bléré	Indre-et-Loire	Jeudi 2 novembre 2017
43	Vite fée bien fée[100],[101]	Marseille	Bouches-du-Rhône	Mercredi 23 mai 2018
44	le Saint Nicola	Besançon	Doubs	Jeudi 31 mai 2018
45	Le Madrid (devenu Truc Much)	Canet-en-Roussillon	Pyrénées-Orientales	Jeudi 7 juin 2018
46	La Table d’Enzo (changement de propriétaire) (devenue Le Bactriane)	Hyères	Var	Jeudi 14 juin 2018
47	L’Ô à la bouche[105],[106]	Paray-le-Monial	Saône-et-Loire	Prévue le mercredi 27 juin 2018
48	Brasserie de Lyon[107],[108]	Marseille	Bouches-du-Rhône	Mercredi 27 juin 2018
49	Le Grill[110]	Tarbes	Hautes-Pyrénées	Jeudi 20 septembre 2018
50	L’ Auberge du canal (décédé)[112]	Écuisses	Saône-et-Loire	Lundi 10 décembre 2018
51	Lou Pebre d’ai[114]	Cavalaire	Var	Lundi 21 janvier 2019
52	Au Lion des Flandres[116]	Lesquin	Nord	Mercredi 15 mai 2019
53	Le Liseré (ex-Coyote Café)[119]	Dunkerque	Nord	Mercredi 29 mai 2019
54	L'Isle aux pizzas (devenu La Table du Marché)[122],[123],[124]	Saint-Astier	Dordogne	Mercredi 5 juin 2019
55	La table de rouge masures [126],[127],[128]	Roumazières-Loubert	Charente	Mardi 18 juin 2019
56	La Perle Noire[130],[131]	Montpellier	Hérault	Mercredi 4 septembre 2019
57	La Durancette[134],[135]	Sénas	Bouches-du-Rhône	Mercredi 24 juin 2020[136]
58	Brasserie Foch[138]	Antibes	Alpes-Maritimes	Lundi 31 août 2020
59	Le Crazy Frog[140]	Saint-Estèphe	Dordogne	Lundi 7 septembre 2020
60	Au soleil d'or[142],[143],[144]	Epoye	Marne	Lundi 4 janvier 2021
61	Le 11' Café[146],	Carnoux-en-Provence	Bouches-du-Rhône	Mercredi 8 septembre 2021
62	Auberge des 4 Chemins[148],[149],[150],[151]	Notre-Dame-de-Vaulx	Isère	Mercredi 15 septembre 2021
63	Le Grillobois	Alixan	Drôme	Mercredi 22 septembre 2021
64	Le Quai 25[154] (devenu La Brasserie)[155]	Muret	Haute-Garonne	Vendredi 5 novembre 2021
65	Le Kerado[157]	Plougonver	Côtes-d'Armor	Mardi 8 février 2022
66	Restaurant du Guillec[159]	Plouzévédé	Finistère	Lundi 14 mars 2022
67	Le Mic-Mac[161]	Châtel-Guyon	Puy-de-Dôme	Vendredi 20 mai 2022
68	Le Beausoleil[163]	La Chapelle-Launay	Loire-Atlantique	Mercredi 22 juin 2022
69	La Marine (changement de propriétaires)[165]	Ouistreham	Calvados	Jeudi 1er septembre 2022
70	Le Chalutier[167],[168]	Argelès-sur-Mer	Pyrénées-Orientales	Prévue le jeudi 8 septembre 2022
71	Comme chien et chat[169]	Tonnay-Charente	Charente-Maritime	Lundi 21 novembre 2022
72	Le Sebastopol[171],[172]	Plaintel	Côtes-d'Armor	Lundi 2 janvier 2023
73	Au grand régal[174],[175]	Villefranche-de-Lauragais	Haute-Garonne	Jeudi 4 mai 2023
74	L’Auberge du centre[177],[178]	Bon-Encontre	Lot-et-Garonne	Vendredi 16 juin 2023
75	Le Saint-Berth[180],[181]	Saint-Berthevin-la-Tannière	Mayenne	Mercredi 21 juin 2023
76	K'fé Vanille ,[183]	Saint-Gervais	Gard	Lundi 26 juin 2023
77	Le Petit Saïgon (devenu Le Plâtras)[186],[187]	Périgueux	Dordogne	Jeudi 3 août 2023
78	Les Palanges[189],[note 2]	Bertholène	Aveyron	Jeudi 9 novembre 2023
79	Le Blitz[191]	Somain	Nord	Jeudi 23 novembre 2023
80	Le Cygne de l'Espérance[193]	Allas-les-Mines	Dordogne	Lundi 11 mars 2024
81	La Cafétéria (changement de propriétaires)[195]	Sarlat-la-Canéda	Dordogne	Mardi 9 avril 2024
82	La Ferme des Trois Louches[197]	Wambrechies	Nord	Vendredi 26 avril 2024
83	Le Café Chabert[199]	Chambéry	Savoie	Mardi 11 juin 2024
84	La Maison de l'écurie	Sallèles-d'Aude	Aude	Jeudi 4 juillet 2024
85	Chez Le Père Alex[202]	Thoissey	Ain	Vendredi 18 octobre 2024
86	La Barra Escriva[204]	Bourg-lès-Valence	Drôme	Mercredi 15 janvier 2025
87	La Grenouille[206]	Saint-Vrain	Essonne	Mardi 4 février 2025
88	Le Malouin[208]	Saint-Malo-de-Guersac	Loire-Atlantique	Mardi 1er avril 2025
89	Le Jardin des 4 Saisons[210]	Albi	Tarn	Vendredi 18 avril 2025
90	Tapas Rojas[212],[213]	Marseille	Bouches-du-Rhône	Lundi 30 juin 2025
91	Le Clin Foc[216]	Criquebeuf-sur-Seine	Eure	Mercredi 23 Juillet 2025
92	Les Barriques[218]	Brive-la-Gaillarde	Corrèze	Jeudi 11 Septembre 2025
93	L'auberge Saint-Martin[220]	Langeron	Nièvre	Vendredi 26 septembre 2025
94	Le Relais Sètois[222]	Sète	Hérault	Vendredi 10 octobre 2025[223]
95	La bonne table de Beussent	Beussent	Pas-de-Calais	Lundi 5 janvier 2026
96	Le Relais Sètois	Sète	Hérault	Mercredi 18 février 2026
`;

const GEO_ROWS = `
Toulon	Var	43.1257311	5.9304919	Provence-Alpes-Côte d'Azur
Fontvieille	Bouches-du-Rhône	43.7264844	4.707674	Provence-Alpes-Côte d'Azur
Sète	Hérault	43.4014434	3.6959771	Occitanie
Lyon	Rhône	45.7578137	4.8320114	Auvergne-Rhône-Alpes
Port Grimaud	Var	43.2718123	6.5819521	Provence-Alpes-Côte d'Azur
Brou	Eure-et-Loir	48.2110511	1.1662579	Centre-Val de Loire
Stiring-Wendel	Moselle	49.2011432	6.9276846	Grand Est
Moissac	Tarn-et-Garonne	44.1050886	1.0846682	Occitanie
Corte	Haute-Corse	42.3052904	9.1511935	Corse
Juan-les-Pins	Alpes-Maritimes	43.5676357	7.1141716	Provence-Alpes-Côte d'Azur
Lavelanet	Ariège	42.9332121	1.8487179	Occitanie
Rethel	Ardennes	49.5091447	4.3666467	Grand Est
Blagnac	Haute-Garonne	43.6343476	1.3986403	Occitanie
Chilly-Mazarin	Essonne	48.7026161	2.3123582	Île-de-France
Marseille	Bouches-du-Rhône	43.2961743	5.3699525	Provence-Alpes-Côte d'Azur
Lille	Nord	50.6365654	3.0635282	Hauts-de-France
Peyruis	Alpes-de-Haute-Provence	44.0300301	5.9408922	Provence-Alpes-Côte d'Azur
Amiens	Somme	49.8941708	2.2956951	Hauts-de-France
Montesquieu-Volvestre	Haute-Garonne	43.2086251	1.2301306	Occitanie
Chalèze	Doubs	47.2683965	6.0897804	Bourgogne-Franche-Comté
Peynier	Bouches-du-Rhône	43.4471537	5.6403316	Provence-Alpes-Côte d'Azur
Nantes	Loire-Atlantique	47.2186371	-1.5541362	Pays de la Loire
La Ciotat	Bouches-du-Rhône	43.1758591	5.6062495	Provence-Alpes-Côte d'Azur
Orbec	Calvados	49.0210806	0.4056753	Normandie
Vendargues	Hérault	43.6568263	3.9687448	Occitanie
Neufchâteau	Vosges	48.3553014	5.6948571	Grand Est
Irigny	Rhône	45.6733141	4.8216902	Auvergne-Rhône-Alpes
Cabourg	Calvados	49.2934373	-0.1155085	Normandie
Cagnes-sur-Mer	Alpes-Maritimes	43.6612012	7.1513834	Provence-Alpes-Côte d'Azur
Pfastatt	Haut-Rhin	47.7697441	7.3025075	Grand Est
Vandœuvre-lès-Nancy	Meurthe-et-Moselle	48.6599676	6.1724618	Grand Est
Martignas-sur-Jalle	Gironde	44.8405364	-0.7761489	Nouvelle-Aquitaine
Gardonne	Dordogne	44.8361742	0.3296012	Nouvelle-Aquitaine
Arçais	Deux-Sèvres	46.2966361	-0.6915028	Nouvelle-Aquitaine
Quintenas	Ardèche	45.1892812	4.6871221	Auvergne-Rhône-Alpes
Mandelieu-la-Napoule	Alpes-Maritimes	43.5439153	6.9359135	Provence-Alpes-Côte d'Azur
Cestas	Gironde	44.7411574	-0.6841225	Nouvelle-Aquitaine
Strasbourg	Bas-Rhin	48.584614	7.7507127	Grand Est
Saint-Quentin	Aisne	49.8465253	3.2876843	Hauts-de-France
Bléré	Indre-et-Loire	47.3279746	0.9918234	Centre-Val de Loire
Besançon	Doubs	47.2380222	6.0243622	Bourgogne-Franche-Comté
Canet-en-Roussillon	Pyrénées-Orientales	42.704359	3.0105105	Occitanie
Hyères	Var	43.1202573	6.1301614	Provence-Alpes-Côte d'Azur
Paray-le-Monial	Saône-et-Loire	46.450559	4.1177959	Bourgogne-Franche-Comté
Tarbes	Hautes-Pyrénées	43.232858	0.0781021	Occitanie
Écuisses	Saône-et-Loire	46.7565885	4.5382451	Bourgogne-Franche-Comté
Cavalaire	Var	43.1722952	6.531917	Provence-Alpes-Côte d'Azur
Lesquin	Nord	50.5888	3.10997	Hauts-de-France
Dunkerque	Nord	51.0347708	2.3772525	Hauts-de-France
Saint-Astier	Dordogne	45.1389808	0.5227575	Nouvelle-Aquitaine
Roumazières-Loubert	Charente	45.8875723	0.5891354	Nouvelle-Aquitaine
Montpellier	Hérault	43.6112422	3.8767337	Occitanie
Sénas	Bouches-du-Rhône	43.7446686	5.078624	Provence-Alpes-Côte d'Azur
Antibes	Alpes-Maritimes	43.5813878	7.1236966	Provence-Alpes-Côte d'Azur
Saint-Estèphe	Dordogne	45.5925	0.6633333	Nouvelle-Aquitaine
Epoye	Marne	49.2905021	4.23803	Grand Est
Carnoux-en-Provence	Bouches-du-Rhône	43.2583	5.56555	Provence-Alpes-Côte d'Azur
Notre-Dame-de-Vaulx	Isère	44.9883987	5.7531769	Auvergne-Rhône-Alpes
Alixan	Drôme	44.9750131	5.0264482	Auvergne-Rhône-Alpes
Muret	Haute-Garonne	43.4599858	1.3262332	Occitanie
Plougonver	Côtes-d'Armor	48.4835362	-3.3785158	Bretagne
Plouzévédé	Finistère	48.595965	-4.112168	Bretagne
Châtel-Guyon	Puy-de-Dôme	45.9205	3.06111	Auvergne-Rhône-Alpes
La Chapelle-Launay	Loire-Atlantique	47.3719848	-1.9717038	Pays de la Loire
Ouistreham	Calvados	49.2761243	-0.258479	Normandie
Argelès-sur-Mer	Pyrénées-Orientales	42.5476734	3.0253613	Occitanie
Tonnay-Charente	Charente-Maritime	45.9444898	-0.892337	Nouvelle-Aquitaine
Plaintel	Côtes-d'Armor	48.4088411	-2.8210576	Bretagne
Villefranche-de-Lauragais	Haute-Garonne	43.4004663	1.7151072	Occitanie
Bon-Encontre	Lot-et-Garonne	44.1861695	0.6683646	Nouvelle-Aquitaine
Saint-Berthevin-la-Tannière	Mayenne	48.4012505	-0.9448448	Pays de la Loire
Saint-Gervais	Gard	44.1846008	4.5733979	Occitanie
Périgueux	Dordogne	45.1840214	0.7160392	Nouvelle-Aquitaine
Bertholène	Aveyron	44.394079	2.7763454	Occitanie
Somain	Nord	50.3589237	3.2810972	Hauts-de-France
Allas-les-Mines	Dordogne	44.8339933	1.0729999	Nouvelle-Aquitaine
Sarlat-la-Canéda	Dordogne	44.8879431	1.2161321	Nouvelle-Aquitaine
Wambrechies	Nord	50.6861944	3.0521806	Hauts-de-France
Chambéry	Savoie	45.5662672	5.9203636	Auvergne-Rhône-Alpes
Sallèles-d'Aude	Aude	43.2567073	2.9485821	Occitanie
Thoissey	Ain	46.1721833	4.8015014	Auvergne-Rhône-Alpes
Bourg-lès-Valence	Drôme	44.9528222	4.8953847	Auvergne-Rhône-Alpes
Saint-Vrain	Essonne	48.5418303	2.334303	Île-de-France
Saint-Malo-de-Guersac	Loire-Atlantique	47.3516122	-2.1772785	Pays de la Loire
Albi	Tarn	43.9277552	2.147899	Occitanie
Criquebeuf-sur-Seine	Eure	49.3057868	1.0965298	Normandie
Brive-la-Gaillarde	Corrèze	45.1584982	1.5332389	Nouvelle-Aquitaine
Langeron	Nièvre	46.8105926	3.0845389	Bourgogne-Franche-Comté
Beussent	Pas-de-Calais	50.5465877	1.7929561	Hauts-de-France
`;

const PHOTO_SETS = [
  [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=1200&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?auto=format&fit=crop&w=1200&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
  ]
] as const;

const SPECIALTIES_BY_REGION: Record<string, string[]> = {
  Bretagne: ["bistrot iodé", "crêperie de caractère", "table de port"],
  Corse: ["table corse", "cuisine insulaire", "auberge méditerranéenne"],
  "Grand Est": ["brasserie d'Alsace", "table de terroir", "bistrot de village"],
  "Hauts-de-France": ["estaminet contemporain", "brasserie du Nord", "table de marché"],
  "Île-de-France": ["brasserie urbaine", "café de quartier", "table francilienne"],
  Normandie: ["bistrot normand", "table de côte", "auberge traditionnelle"],
  "Nouvelle-Aquitaine": ["table du Sud-Ouest", "auberge régionale", "bistrot de terroir"],
  Occitanie: ["table occitane", "cuisine méridionale", "bistrot de village"],
  "Pays de la Loire": ["table ligérienne", "bistrot de port", "auberge familiale"],
  "Provence-Alpes-Côte d'Azur": [
    "bistrot méditerranéen",
    "table provençale",
    "restaurant de port"
  ],
  "Auvergne-Rhône-Alpes": [
    "table de montagne",
    "bistrot alpin",
    "restaurant de terroir"
  ],
  "Bourgogne-Franche-Comté": [
    "table bourguignonne",
    "bistrot vigneron",
    "auberge de campagne"
  ],
  "Centre-Val de Loire": ["table ligérienne", "auberge de bourg", "bistrot gourmand"]
};

const KNOWN_OPEN_EPISODES = new Set([
  8, 10, 15, 18, 20, 22, 23, 26, 27, 29, 30, 33, 42, 45, 46, 54, 64, 69, 77,
  81, 94, 95, 96
]);

const KNOWN_CLOSED_EPISODES = new Set([41, 50]);

function normalizeText(value: string) {
  return value
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .trim()
    .replace(/,$/, "");
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanName(rawName: string) {
  return normalizeText(rawName.split("(")[0] ?? rawName);
}

function extractNotes(rawName: string) {
  return Array.from(rawName.matchAll(/\(([^)]+)\)/g), (match) =>
    normalizeText(match[1] ?? "")
  ).filter(Boolean);
}

function extractRenamedTo(rawName: string) {
  const match = rawName.match(/devenu(?:e)?\s+([^),]+)/i);
  return match ? normalizeText(match[1]) : undefined;
}

function getStatus(episodeNumber: number, rawName: string): RestaurantStatus {
  if (KNOWN_CLOSED_EPISODES.has(episodeNumber)) {
    return "closed";
  }

  if (
    KNOWN_OPEN_EPISODES.has(episodeNumber) ||
    /devenu|changement de propri/i.test(rawName)
  ) {
    return "open";
  }

  return "unknown";
}

function getRating(episodeNumber: number, status: RestaurantStatus) {
  let rating = 2.7 + (((episodeNumber * 37) % 17) / 10);

  if (status === "open") {
    rating += 0.45;
  }

  if (status === "closed") {
    rating -= 0.7;
  }

  return Math.max(1.9, Math.min(4.8, Math.round(rating * 10) / 10));
}

function pickPhotos(episodeNumber: number) {
  return [...PHOTO_SETS[(episodeNumber - 1) % PHOTO_SETS.length]];
}

function pickSpecialty(region: string | undefined, episodeNumber: number) {
  const list = SPECIALTIES_BY_REGION[region ?? ""] ?? [
    "bistrot français",
    "table de quartier",
    "restaurant familial"
  ];

  return list[(episodeNumber - 1) % list.length];
}

function buildDescription(
  seed: RawRestaurantSeed,
  region: string,
  status: RestaurantStatus,
  specialty: string,
  renamedTo?: string
) {
  const statusSentence =
    status === "open"
      ? "Les sources publiques laissent penser a une exploitation toujours active ou relancee."
      : status === "closed"
        ? "Les sources publiques laissent penser que l'adresse n'opere plus sous sa forme initiale."
        : "Le statut actuel n'est pas consolide dans les sources publiques.";

  return [
    `${cleanName(seed.rawName)} figure dans l'emission a ${seed.city}, en ${region}.`,
    `La fiche utilise une geolocalisation de commune et un habillage editorial autour d'une ${specialty}.`,
    statusSentence,
    renamedTo ? `Nom releve apres emission: ${renamedTo}.` : ""
  ]
    .filter(Boolean)
    .join(" ");
}

function buildTags(
  seed: RawRestaurantSeed,
  specialty: string,
  status: RestaurantStatus,
  renamedTo: string | undefined,
  notes: string[]
) {
  return Array.from(
    new Set(
      [
        `Episode ${seed.episodeNumber}`,
        seed.department,
        specialty,
        renamedTo ? `Renomme: ${renamedTo}` : undefined,
        notes.some((note) => /changement de propri/i.test(note))
          ? "Nouvelle gestion"
          : undefined,
        status === "unknown" ? "Statut a confirmer" : undefined
      ].filter(Boolean)
    )
  ) as string[];
}

function buildOpeningHours(
  episodeNumber: number,
  status: RestaurantStatus
): OpeningHour[] {
  const patterns: OpeningHour[][] = [
    [
      { day: "Lundi", hours: "12:00 - 14:00" },
      { day: "Mardi", hours: "12:00 - 14:00 / 19:00 - 22:00" },
      { day: "Mercredi", hours: "12:00 - 14:00 / 19:00 - 22:00" },
      { day: "Jeudi", hours: "12:00 - 14:00 / 19:00 - 22:00" },
      { day: "Vendredi", hours: "12:00 - 14:00 / 19:00 - 22:30" },
      { day: "Samedi", hours: "19:00 - 22:30" },
      { day: "Dimanche", hours: "Fermé", closed: true }
    ],
    [
      { day: "Lundi", hours: "Fermé", closed: true },
      { day: "Mardi", hours: "12:00 - 14:30 / 19:00 - 22:00" },
      { day: "Mercredi", hours: "12:00 - 14:30 / 19:00 - 22:00" },
      { day: "Jeudi", hours: "12:00 - 14:30 / 19:00 - 22:00" },
      { day: "Vendredi", hours: "12:00 - 14:30 / 19:00 - 22:30" },
      { day: "Samedi", hours: "12:00 - 15:00 / 19:00 - 22:30" },
      { day: "Dimanche", hours: "12:00 - 15:00" }
    ],
    [
      { day: "Lundi", hours: "12:00 - 14:00 / 19:00 - 21:30" },
      { day: "Mardi", hours: "12:00 - 14:00 / 19:00 - 21:30" },
      { day: "Mercredi", hours: "Fermé", closed: true },
      { day: "Jeudi", hours: "12:00 - 14:00 / 19:00 - 21:30" },
      { day: "Vendredi", hours: "12:00 - 14:00 / 19:00 - 22:30" },
      { day: "Samedi", hours: "19:00 - 22:30" },
      { day: "Dimanche", hours: "Fermé", closed: true }
    ]
  ];

  if (status === "closed") {
    return [
      { day: "Lundi", hours: "Fermé", closed: true },
      { day: "Mardi", hours: "Fermé", closed: true },
      { day: "Mercredi", hours: "Fermé", closed: true },
      { day: "Jeudi", hours: "Fermé", closed: true },
      { day: "Vendredi", hours: "Fermé", closed: true },
      { day: "Samedi", hours: "Fermé", closed: true },
      { day: "Dimanche", hours: "Fermé", closed: true }
    ];
  }

  if (status === "unknown") {
    return [
      { day: "Lundi", hours: "Horaires a confirmer" },
      { day: "Mardi", hours: "Horaires a confirmer" },
      { day: "Mercredi", hours: "Horaires a confirmer" },
      { day: "Jeudi", hours: "Horaires a confirmer" },
      { day: "Vendredi", hours: "Horaires a confirmer" },
      { day: "Samedi", hours: "Horaires a confirmer" },
      { day: "Dimanche", hours: "Horaires a confirmer" }
    ];
  }

  return patterns[(episodeNumber - 1) % patterns.length];
}

const rawRestaurants: RawRestaurantSeed[] = RAW_RESTAURANT_ROWS.trim()
  .split("\n")
  .map((row) => {
    const [episodeNumber, rawName, city, department, episodeDate] = row.split("\t");

    return {
      episodeNumber: Number(episodeNumber),
      rawName,
      city,
      department,
      episodeDate
    };
  });

const geoByCity = Object.fromEntries(
  GEO_ROWS.trim().split("\n").map((row) => {
    const [city, department, lat, lng, region] = row.split("\t");
    return [
      `${city}|${department}`,
      {
        lat: Number(lat),
        lng: Number(lng),
        region
      }
    ];
  })
) as Record<string, GeoSeed>;

export const restaurants: Restaurant[] = rawRestaurants
  .map((seed) => {
    const geo = geoByCity[`${seed.city}|${seed.department}`];

    if (!geo) {
      throw new Error(`Missing geolocation for ${seed.city} (${seed.department})`);
    }

    const notes = extractNotes(seed.rawName);
    const renamedTo = extractRenamedTo(seed.rawName);
    const editorialStatus = getStatus(seed.episodeNumber, seed.rawName);
    const specialty = pickSpecialty(geo.region, seed.episodeNumber);
    const providedHours = restaurantHoursByEpisode[seed.episodeNumber];
    const openingHours = providedHours?.openingHours ?? unknownOpeningHours;
    const hasKnownHours = providedHours?.hasFoundHours ?? false;
    const hasOpenHours = openingHours.some(
      (entry) => !entry.closed && entry.hours !== "Horaires inconnus"
    );
    const status: RestaurantStatus = hasOpenHours ? "open" : "closed";

    return {
      id: `cec-${seed.episodeNumber.toString().padStart(3, "0")}`,
      episodeNumber: seed.episodeNumber,
      name: cleanName(seed.rawName),
      city: seed.city,
      department: seed.department,
      region: geo.region,
      address:
        restaurantAddressByEpisode[seed.episodeNumber] ??
        `Adresse exacte a confirmer, centre de ${seed.city}, ${seed.department}, ${geo.region}, France.`,
      lat: geo.lat,
      lng: geo.lng,
      rating: getRating(seed.episodeNumber, status),
      status,
      episodeDate: normalizeText(seed.episodeDate),
      description: buildDescription(
        seed,
        geo.region,
        editorialStatus,
        specialty,
        renamedTo
      ),
      photos: pickPhotos(seed.episodeNumber),
      sourceUrl: SOURCE_URL,
      specialty,
      tags: buildTags(seed, specialty, status, renamedTo, notes),
      notes,
      openingHours,
      hasKnownHours
    };
  })
  .filter((restaurant) => !episodesHiddenFromMap.includes(restaurant.episodeNumber))
  .filter((restaurant) => restaurant.status === "open")
  .sort((left, right) => left.episodeNumber - right.episodeNumber);

export const restaurantsById = Object.fromEntries(
  restaurants.map((restaurant) => [restaurant.id, restaurant])
);

export const restaurantSlugs = restaurants.map((restaurant) => ({
  id: restaurant.id,
  slug: slugify(`${restaurant.episodeNumber}-${restaurant.name}-${restaurant.city}`)
}));
