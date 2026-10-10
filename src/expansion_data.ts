/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Viking expansion across Europe, c. 790 – 1066.
 * Territories are drawn cumulatively by phase; geometry lives in ./expansion_geo.ts.
 */

type L10n = { en: string; zh: string };

export interface ExpansionEra {
  id: string;
  range: string;
  rune: string;
  color: string;
  label: L10n;
  summary: L10n;
}

export interface ExpansionRegion {
  id: string; // key into REGION_SHAPES
  era: number;
  year: string;
  name: L10n;
  description: L10n;
}

export type SiteKind = "raid" | "settlement" | "trade";

export interface ExpansionSite {
  id: string;
  era: number;
  kind: SiteKind;
  lon: number;
  lat: number;
  year: string;
  name: L10n;
  description: L10n;
  labelSide?: "left" | "right";
}

export interface ExpansionRoute {
  id: string;
  era: number;
  points: [number, number][]; // lon, lat
  name: L10n;
}

export const EXPANSION_ERAS: ExpansionEra[] = [
  {
    id: "homeland",
    range: "c. 790",
    rune: "ᚠ",
    color: "#56687d",
    label: { en: "The Northern Homelands", zh: "北方故土" },
    summary: {
      en: "Before the raids, Danes, Norwegians and Swedes lived as farmers, fishermen and traders around the fjords and Baltic shores, linked by busy market towns such as Hedeby and Birka.",
      zh: "劫掠开始之前，丹麦人、挪威人与瑞典人散居于峡湾与波罗的海沿岸，以农耕、渔猎和贸易为生，海泽比、比尔卡等集镇把他们连成一张商路网。"
    }
  },
  {
    id: "raids",
    range: "793 – 850",
    rune: "ᚱ",
    color: "#b08a4f",
    label: { en: "The Age of Raids", zh: "劫掠时代" },
    summary: {
      en: "Fast longships struck monasteries and river towns from Lindisfarne to Seville. Norse settlers quietly took the Northern Isles, the Hebrides and the Faroes, and founded Dublin in 841.",
      zh: "快速长船从林迪斯法恩一路袭击到塞维利亚的修道院与河港；与此同时，诺斯移民悄然占据北方群岛、赫布里底与法罗群岛，并于841年建立都柏林。"
    }
  },
  {
    id: "settlement",
    range: "850 – 900",
    rune: "ᚦ",
    color: "#8f2a22",
    label: { en: "Conquest & Settlement", zh: "征服与定居" },
    summary: {
      en: "Great armies came to stay. The Danelaw was carved out of England, Iceland was settled from 874, and Swedish Varangians founded Novgorod and seized Kiev along the river road to the south.",
      zh: "大军不再满足于掳掠而选择留下：英格兰东北划为丹麦法区，冰岛自874年起被开拓，瑞典瓦良格人沿河道南下，建立诺夫哥罗德并夺取基辅。"
    }
  },
  {
    id: "kingdoms",
    range: "900 – 1000",
    rune: "ᛒ",
    color: "#4d6a4a",
    label: { en: "Kingdoms & Duchies", zh: "王国与公国" },
    summary: {
      en: "Raiders became rulers. Rollo received Normandy in 911, the Rus princes built a realm from the Baltic to the steppe, Varangians guarded the Byzantine emperor, and Erik the Red sailed to Greenland.",
      zh: "劫掠者变身统治者：罗洛于911年受封诺曼底，罗斯王公建立起从波罗的海到草原的大国，瓦良格卫队守护拜占庭皇帝，红发埃里克远航格陵兰。"
    }
  },
  {
    id: "empire",
    range: "1000 – 1066",
    rune: "ᛟ",
    color: "#8a5a2b",
    label: { en: "Empire & Twilight", zh: "帝国与黄昏" },
    summary: {
      en: "Cnut ruled England, Denmark and Norway as one North Sea empire, Leif Erikson reached Vinland, and Norman descendants carved out southern Italy — until 1066 closed the Viking Age.",
      zh: "克努特将英格兰、丹麦与挪威合为北海帝国，莱夫·埃里克松抵达文兰，诺曼后裔南下夺取南意大利与西西里——直到1066年，维京时代落下帷幕。"
    }
  }
];

export const EXPANSION_REGIONS: ExpansionRegion[] = [
  {
    id: "scandinavia",
    era: 0,
    year: "c. 790",
    name: { en: "Scandinavia", zh: "斯堪的纳维亚" },
    description: {
      en: "Denmark, Norway and Sweden — a land of fjords, forests and short summers where scarce farmland and rich sea-roads pushed ambitious young men outward.",
      zh: "丹麦、挪威与瑞典：峡湾、森林与短暂夏季的土地。耕地稀少而海路发达，驱使野心勃勃的年轻人向外闯荡。"
    }
  },
  {
    id: "northern_isles",
    era: 1,
    year: "c. 800",
    name: { en: "Orkney, Shetland & Caithness", zh: "奥克尼、设得兰与凯斯内斯" },
    description: {
      en: "Settled by Norwegians around 800, the islands became the powerful Earldom of Orkney and stayed Norse in law and speech until the 15th century.",
      zh: "约800年由挪威人定居，后发展为强大的奥克尼伯爵领，其法律与语言保持诺斯传统直至15世纪。"
    }
  },
  {
    id: "hebrides",
    era: 1,
    year: "c. 800",
    name: { en: "The Hebrides (Suðreyjar)", zh: "赫布里底群岛（南岛）" },
    description: {
      en: "The 'Southern Isles' of the Norse, later the core of the Kingdom of the Isles — a sea-kingdom of mixed Norse and Gaelic lords.",
      zh: "诺斯人口中的“南岛”，后来成为“群岛王国”的核心，由诺斯与盖尔混血贵族统治的海上王国。"
    }
  },
  {
    id: "faroes",
    era: 1,
    year: "c. 800",
    name: { en: "Faroe Islands", zh: "法罗群岛" },
    description: {
      en: "Sheep islands halfway to Iceland, settled by Norse farmers who displaced a handful of Irish hermit monks.",
      zh: "通往冰岛途中的“羊之群岛”，诺斯农民在此定居，取代了此前少量的爱尔兰隐修士。"
    }
  },
  {
    id: "dublin",
    era: 1,
    year: "841",
    name: { en: "Dublin (Dyflin)", zh: "都柏林" },
    description: {
      en: "Founded as a fortified ship-camp in 841, Dublin grew into the greatest Viking town in the west and a major slave market.",
      zh: "841年作为设防的船营建立，后成长为西方最大的维京城镇与重要的奴隶市场。"
    }
  },
  {
    id: "danelaw",
    era: 2,
    year: "878",
    name: { en: "The Danelaw", zh: "丹麦法区" },
    description: {
      en: "After the Treaty of Wedmore, England north and east of Watling Street lived under Danish law, with York (Jórvík) as its capital.",
      zh: "《威德莫尔和约》之后，惠特灵大道以东北的英格兰奉行丹麦法律，约克（约维克）为其首府。"
    }
  },
  {
    id: "iceland",
    era: 2,
    year: "874",
    name: { en: "Iceland", zh: "冰岛" },
    description: {
      en: "Ingólfr Arnarson settled at Reykjavík in 874; by 930 the settlers had founded the Althing, one of the world's oldest parliaments.",
      zh: "874年英格尔夫·阿纳尔松在雷克雅未克定居；930年移民们创立了世界最古老的议会之一——阿尔庭。"
    }
  },
  {
    id: "isle_of_man",
    era: 2,
    year: "c. 900",
    name: { en: "Isle of Man", zh: "马恩岛" },
    description: {
      en: "A Norse stronghold in the Irish Sea whose open-air assembly, the Tynwald, still meets today.",
      zh: "爱尔兰海上的诺斯据点，其露天议会“廷沃尔德”延续至今。"
    }
  },
  {
    id: "rus_route",
    era: 2,
    year: "862 – 882",
    name: { en: "Route of the Varangians", zh: "瓦良格之路" },
    description: {
      en: "Rurik took Novgorod in 862 and Oleg seized Kiev in 882, controlling the river road 'from the Varangians to the Greeks'.",
      zh: "留里克于862年入主诺夫哥罗德，奥列格于882年夺取基辅，控制了“从瓦良格到希腊”的河道商路。"
    }
  },
  {
    id: "normandy",
    era: 3,
    year: "911",
    name: { en: "Duchy of Normandy", zh: "诺曼底公国" },
    description: {
      en: "By the treaty of Saint-Clair-sur-Epte, King Charles the Simple granted the lower Seine to the Viking chief Rollo — the land of the 'Northmen'.",
      zh: "依据《圣克莱尔-埃普特条约》，法王“糊涂查理”将塞纳河下游封给维京首领罗洛，这里从此被称为“北方人之地”。"
    }
  },
  {
    id: "kievan_rus",
    era: 3,
    year: "c. 980",
    name: { en: "Kievan Rus'", zh: "基辅罗斯" },
    description: {
      en: "Ruled by princes of Varangian descent; Vladimir the Great's baptism in 988 turned the realm towards Byzantine Christianity.",
      zh: "由瓦良格后裔王公统治；988年弗拉基米尔大公受洗，使这个国家转向拜占庭东正教。"
    }
  },
  {
    id: "england_cnut",
    era: 4,
    year: "1016",
    name: { en: "Cnut's England", zh: "克努特的英格兰" },
    description: {
      en: "After Assandun, all England joined Denmark and later Norway in Cnut's North Sea Empire — the high tide of Scandinavian power.",
      zh: "阿桑顿之战后，整个英格兰与丹麦、挪威同归克努特的北海帝国，斯堪的纳维亚的势力达到顶峰。"
    }
  },
  {
    id: "southern_italy",
    era: 4,
    year: "1059 – 1091",
    name: { en: "Norman Southern Italy & Sicily", zh: "诺曼南意大利与西西里" },
    description: {
      en: "Norman adventurers — grandsons of Rollo's Vikings — under Robert Guiscard and Roger I won Apulia, Calabria and Sicily.",
      zh: "罗洛维京部众的后裔、诺曼冒险家罗贝尔·吉斯卡尔与罗杰一世，夺取了阿普利亚、卡拉布里亚与西西里。"
    }
  }
];

export const EXPANSION_SITES: ExpansionSite[] = [
  {
    id: "hedeby", era: 0, kind: "trade", lon: 9.57, lat: 54.49, year: "c. 800",
    name: { en: "Hedeby", zh: "海泽比" },
    description: { en: "The great Danish market town at the neck of Jutland, where goods from the Rhine, the Baltic and the Arab world changed hands.", zh: "日德兰半岛咽喉处的丹麦大集镇，来自莱茵河、波罗的海与阿拉伯世界的货物在此交易。" }
  },
  {
    id: "birka", era: 0, kind: "trade", lon: 17.54, lat: 59.33, year: "c. 750",
    name: { en: "Birka", zh: "比尔卡" },
    description: { en: "Sweden's island trading town on Lake Mälaren, gateway to the eastern river routes.", zh: "瑞典梅拉伦湖上的岛屿商埠，通往东方河道商路的门户。" }
  },
  {
    id: "lindisfarne", era: 1, kind: "raid", lon: -1.8, lat: 55.68, year: "793",
    name: { en: "Lindisfarne", zh: "林迪斯法恩" },
    description: { en: "The sack of the holy island's monastery on 8 June 793 is traditionally taken as the start of the Viking Age.", zh: "793年6月8日圣岛修道院遭洗劫，传统上被视为维京时代的开端。" }
  },
  {
    id: "iona", era: 1, kind: "raid", lon: -6.4, lat: 56.33, year: "795",
    name: { en: "Iona", zh: "艾奥纳" },
    description: { en: "St Columba's monastery was raided repeatedly; in 806 sixty-eight monks were killed.", zh: "圣科伦巴修道院屡遭袭击，806年有68名修士遇害。" }
  },
  {
    id: "paris", era: 1, kind: "raid", lon: 2.35, lat: 48.86, year: "845",
    name: { en: "Paris", zh: "巴黎" },
    description: { en: "Ragnar's fleet rowed up the Seine and was paid 7,000 pounds of silver to leave; Paris was besieged again in 885–886.", zh: "拉格纳的船队溯塞纳河而上，勒索七千磅白银后离去；885–886年巴黎再遭围攻。" }
  },
  {
    id: "hamburg", era: 1, kind: "raid", lon: 9.99, lat: 53.55, year: "845",
    name: { en: "Hamburg", zh: "汉堡" },
    description: { en: "A Danish fleet burned the new missionary town, driving its archbishop to Bremen.", zh: "丹麦船队焚毁了这座新建的传教城市，大主教被迫迁往不来梅。" }
  },
  {
    id: "seville", era: 1, kind: "raid", lon: -5.98, lat: 37.39, year: "844",
    name: { en: "Seville", zh: "塞维利亚" },
    description: { en: "Vikings sacked the Moorish city before the Emir of Córdoba's army drove them back to their ships.", zh: "维京人洗劫了这座摩尔人城市，随后被科尔多瓦埃米尔的大军击退。" }
  },
  {
    id: "york", era: 2, kind: "settlement", lon: -1.08, lat: 53.96, year: "866",
    name: { en: "York (Jórvík)", zh: "约克（约维克）" },
    description: { en: "Captured by the Great Heathen Army; it became a Viking kingdom and craft centre until 954.", zh: "被异教徒大军攻占，此后成为维京王国与手工业中心，直至954年。" },
    labelSide: "left"
  },
  {
    id: "reykjavik", era: 2, kind: "settlement", lon: -21.9, lat: 64.15, year: "874",
    name: { en: "Reykjavík", zh: "雷克雅未克" },
    description: { en: "The 'smoky bay' where Iceland's first settler built his farm.", zh: "“冒烟的海湾”，冰岛第一位移民在此建起农庄。" }
  },
  {
    id: "luna", era: 2, kind: "raid", lon: 10.0, lat: 44.07, year: "860",
    name: { en: "Luna", zh: "卢纳" },
    description: { en: "Björn Ironside and Hastein sailed into the Mediterranean and sacked Luna, said to have mistaken it for Rome.", zh: "“铁甲”比约恩与哈斯泰因驶入地中海洗劫卢纳，相传误以为这里就是罗马。" }
  },
  {
    id: "novgorod", era: 2, kind: "settlement", lon: 31.27, lat: 58.52, year: "862",
    name: { en: "Novgorod (Hólmgarðr)", zh: "诺夫哥罗德" },
    description: { en: "According to the Primary Chronicle, the Varangian Rurik was invited to rule here in 862.", zh: "据《往年纪事》记载，瓦良格人留里克于862年受邀来此统治。" }
  },
  {
    id: "kiev", era: 2, kind: "settlement", lon: 30.52, lat: 50.45, year: "882",
    name: { en: "Kiev", zh: "基辅" },
    description: { en: "Oleg moved south and made Kiev the seat of Rus' power on the Dnieper.", zh: "奥列格南下，把基辅定为第聂伯河上罗斯政权的中心。" }
  },
  {
    id: "rouen", era: 3, kind: "settlement", lon: 1.1, lat: 49.44, year: "911",
    name: { en: "Rouen", zh: "鲁昂" },
    description: { en: "Capital of Rollo's new duchy; his descendant William would sail from Normandy to conquer England in 1066.", zh: "罗洛新公国的首府；其后裔威廉于1066年从诺曼底出发征服英格兰。" }
  },
  {
    id: "constantinople", era: 3, kind: "trade", lon: 28.98, lat: 41.01, year: "988",
    name: { en: "Constantinople (Miklagarðr)", zh: "君士坦丁堡（大城）" },
    description: { en: "The 'Great City' at the end of the eastern road; from 988 Norsemen served the emperor as the elite Varangian Guard.", zh: "东方之路的终点“大城”；自988年起，北欧人组成精锐的瓦良格卫队护卫拜占庭皇帝。" },
    labelSide: "left"
  },
  {
    id: "london", era: 4, kind: "settlement", lon: -0.12, lat: 51.5, year: "1016",
    name: { en: "London", zh: "伦敦" },
    description: { en: "Cnut became king of all England in 1016 and ruled his northern empire from here and Winchester.", zh: "1016年克努特成为全英格兰之王，以此地和温彻斯特统治他的北方帝国。" },
    labelSide: "left"
  },
  {
    id: "palermo", era: 4, kind: "settlement", lon: 13.36, lat: 38.12, year: "1072",
    name: { en: "Palermo", zh: "巴勒莫" },
    description: { en: "Taken from its Muslim emirs by Robert Guiscard and Roger, it later became the brilliant capital of Norman Sicily.", zh: "罗贝尔·吉斯卡尔与罗杰从穆斯林埃米尔手中夺得此城，后成为诺曼西西里王国的璀璨首都。" }
  }
];

export const EXPANSION_ROUTES: ExpansionRoute[] = [
  {
    id: "west_raids", era: 1,
    name: { en: "Western raiding route", zh: "西方劫掠航线" },
    points: [[9.0, 55.6], [6.5, 54.0], [3.0, 51.8], [0.5, 50.4], [-3.0, 49.3], [-5.5, 48.2], [-4.0, 46.0], [-2.5, 44.2], [-8.8, 43.6], [-9.6, 40.5], [-9.4, 38.0], [-7.2, 36.8], [-6.3, 36.9]]
  },
  {
    id: "north_atlantic", era: 2,
    name: { en: "North Atlantic sea-road", zh: "北大西洋航路" },
    points: [[5.2, 60.5], [1.0, 60.6], [-1.6, 60.6], [-4.5, 61.7], [-7.2, 62.1], [-11.0, 63.2], [-14.2, 64.4]]
  },
  {
    id: "east_road", era: 2,
    name: { en: "From the Varangians to the Greeks", zh: "从瓦良格到希腊之路" },
    points: [[18.4, 59.3], [21.5, 59.8], [26.0, 60.0], [29.5, 59.95], [31.5, 60.3], [32.3, 59.8], [31.3, 58.5], [31.3, 56.5], [31.6, 54.8], [30.6, 52.5], [30.6, 50.5], [32.5, 48.5], [32.6, 46.6], [31.6, 45.0], [30.3, 43.2], [29.1, 41.3]]
  },
  {
    id: "mediterranean", era: 2,
    name: { en: "Mediterranean expedition", zh: "地中海远征" },
    points: [[-6.3, 36.9], [-5.6, 36.0], [-2.0, 36.6], [2.5, 38.6], [6.5, 41.2], [9.4, 43.6], [9.9, 44.0]]
  }
];

/** Destinations beyond the western edge of the map */
export const OFF_MAP_WEST = [
  { id: "greenland", era: 3, year: "985", name: { en: "Greenland", zh: "格陵兰" }, y: 232 },
  { id: "vinland", era: 4, year: "c. 1000", name: { en: "Vinland", zh: "文兰" }, y: 300 }
];

/** Sea names for the parchment map */
export const SEA_LABELS = [
  { id: "atlantic", lon: -17, lat: 50, name: { en: "Atlantic Ocean", zh: "大西洋" } },
  { id: "north_sea", lon: 3.2, lat: 56.3, name: { en: "North Sea", zh: "北海" } },
  { id: "norwegian", lon: -3, lat: 66.5, name: { en: "Norwegian Sea", zh: "挪威海" } },
  { id: "baltic", lon: 19.6, lat: 55.6, name: { en: "Baltic", zh: "波罗的海" } },
  { id: "mediterranean", lon: 4.5, lat: 38.4, name: { en: "Mediterranean", zh: "地中海" } },
  { id: "black_sea", lon: 34.5, lat: 43.3, name: { en: "Black Sea", zh: "黑海" } }
];
