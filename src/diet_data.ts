/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Diet chapter, page 1: how Viking-age eating habits changed (c. 790–1066)
 * and the foods most commonly eaten. Claims follow archaeological finds
 * (Oseberg, Birka, Coppergate/York) and written sources (Anglo-Saxon Chronicle, sagas, Domesday Book).
 */

type L = { en: string; zh: string };

export type FoodCat = "grain" | "dairy" | "meat" | "fish" | "produce" | "drink";

export interface DietEra {
  id: string;
  years: string;
  rune: string;
  color: string;
  title: L;
  text: L;
  points: L[];
  evidence: L;
  foods: string[];
}

export interface Food {
  id: string;
  cat: FoodCat;
  short: L;
  name: L;
  norse: string;
  text: L;
  evidence?: L;
}

export const FOOD_CATS: { id: FoodCat; label: L }[] = [
  { id: "grain", label: { en: "Grain", zh: "谷物" } },
  { id: "dairy", label: { en: "Dairy", zh: "乳品" } },
  { id: "meat", label: { en: "Meat", zh: "肉类" } },
  { id: "fish", label: { en: "Fish", zh: "鱼鲜" } },
  { id: "produce", label: { en: "Garden", zh: "果蔬" } },
  { id: "drink", label: { en: "Drink", zh: "饮品" } }
];

export const MEALS: { name: L; norse: string; time: L }[] = [
  {
    name: { en: "Day-meal", zh: "日餐" },
    norse: "dagverðr",
    time: { en: "After the first work of the morning, around nine", zh: "晨间劳作之后，约上午九时" }
  },
  {
    name: { en: "Night-meal", zh: "夜餐" },
    norse: "náttverðr",
    time: { en: "In the evening, when the day's work was done", zh: "一天劳作结束后的傍晚" }
  }
];

export const DIET_ERAS: DietEra[] = [
  {
    id: "homeland",
    years: "c. 790–865",
    rune: "ᚠ",
    color: "#8a6a3a",
    title: { en: "Farm and Season in Scandinavia", zh: "故土农牧：随季节而食" },
    text: {
      en: "On the farms of Norway, Denmark and Sweden, the year set the menu. Summer meant grazing and milking, and turning the surplus into butter, cheese and skyr. In autumn, animals that could not be fed through the winter were slaughtered and their meat smoked, dried or salted. Winter and spring were lived on stored grain, dairy and dried fish. Porridge and flatbread of barley or oats were the daily staples, and ale and whey the everyday drinks.",
      zh: "在挪威、丹麦与瑞典的农庄里，一年的节令决定了餐桌：夏季放牧挤奶，把多余的奶做成黄油、奶酪与斯基尔；秋季宰杀无法越冬的牲畜，将肉熏制、风干或腌渍；冬春两季则靠储存的谷物、乳品与干鱼度日。大麦或燕麦熬成的粥和烙出的扁面包是每日主食，麦芽酒与乳清是日常饮品。"
    },
    points: [
      { en: "Two meals a day", zh: "一日两餐" },
      { en: "Autumn slaughter, meat stored for winter", zh: "秋季集中宰杀，储肉过冬" },
      { en: "Barley porridge and bread as staples", zh: "大麦粥与扁面包为主食" }
    ],
    evidence: {
      en: "The Oseberg ship burial (834) was furnished with grain, a bucket of wild apples and hazelnuts, alongside slaughtered oxen.",
      zh: "挪威奥塞贝格船葬（834年）随葬了谷物、一桶野苹果和榛子，还有宰杀的牛。"
    },
    foods: ["barley", "flatbread", "dairy", "skyr", "beef_mutton", "horse", "stockfish", "fruit_nuts", "ale"]
  },
  {
    id: "campaign",
    years: "865–878",
    rune: "ᚱ",
    color: "#7d1d18",
    title: { en: "On Campaign: Living off the Land", zh: "远征越冬：就地征粮" },
    text: {
      en: "The Great Heathen Army no longer sailed home with the season — it wintered in England and fed itself there. It took supplies from kingdoms forced to make peace (in 865 the East Angles provided it with horses), wintered in camps at York, Torksey and Repton, and ate the cattle and sheep it seized. At sea, dried fish, hard bread, butter and salted meat were the longship's rations, topped up with fresh food whenever the crews landed to trade or raid.",
      zh: "异教徒大军不再随季节往返北海，而是在英格兰越冬、就地取粮：向被迫议和的王国索取给养（865年东盎格利亚为其提供马匹），在约克、托克西、雷普顿等营地过冬，宰食掳获的牛羊。航海途中，干鱼、硬面包、黄油与咸肉是长船上的口粮，靠岸交易或劫掠时再补充新鲜食物。"
    },
    points: [
      { en: "Supplies taken from the conquered", zh: "向被征服地区征取给养" },
      { en: "Winter camps: York, Torksey, Repton", zh: "营地越冬：约克、托克西、雷普顿" },
      { en: "Dried fish and hard bread at sea", zh: "干鱼与硬面包是航海口粮" }
    ],
    evidence: {
      en: "The Anglo-Saxon Chronicle records that the army took winter quarters in East Anglia, was supplied with horses there, and made peace with the East Angles.",
      zh: "《盎格鲁-撒克逊编年史》记载，大军在东盎格利亚扎营过冬，在当地得到马匹供应，并与东盎格利亚人议和。"
    },
    foods: ["stockfish", "flatbread", "dairy", "beef_mutton", "ale"]
  },
  {
    id: "danelaw",
    years: "878–c. 950",
    rune: "ᛅ",
    color: "#2f4a3a",
    title: { en: "Settling the Danelaw", zh: "定居丹麦法区：与撒克逊同桌" },
    text: {
      en: "After 878 the newcomers shared out land in the Danelaw and farmed it, and their food grew ever closer to that of their English neighbours. England's milder climate suited wheat, so wheat bread was more common than at home. Peas, beans, leeks and cabbage went into the pot. Cattle remained the main source of meat, followed by sheep and pigs. At Coppergate in York (Jórvík), excavations recovered herring and eel bones, plum and sloe stones, blackberry pips and hazelnut shells in great numbers: a town that ate a great deal of fish and gathered fruit.",
      zh: "878年后，维京人在丹麦法区分地耕种，饮食与相邻的撒克逊农户日渐趋同：英格兰较温和的气候适合种植小麦，小麦面包比在故乡更常见；豌豆、蚕豆、韭葱与卷心菜进入锅中；肉食仍以牛为主，其次是羊与猪。约克（约维克）科珀盖特遗址出土了大量鲱鱼与鳗鱼骨、李核与黑刺李核、黑莓籽和榛子壳，可见城中居民大量吃鱼并采集野果。"
    },
    points: [
      { en: "Diet converges with English farmers", zh: "与撒克逊农户饮食趋同" },
      { en: "Townsfolk eat much fish", zh: "城镇居民大量吃鱼" },
      { en: "Pulses, vegetables and wild fruit", zh: "豆类、蔬菜与野果进入日常" }
    ],
    evidence: {
      en: "Coppergate, York (excavated 1976–1981). A Viking-age human coprolite found in York in 1972 shows a diet of mainly meat and bread — and a heavy load of intestinal worms.",
      zh: "约克科珀盖特遗址（1976–1981年发掘）。1972年在约克出土的维京时代人类粪化石显示，其主人以肉类和面包为主食，体内还有大量寄生虫。"
    },
    foods: ["barley", "flatbread", "beef_mutton", "pork", "herring", "eel", "pulses", "fruit_nuts", "ale"]
  },
  {
    id: "christian",
    years: "c. 950–1066",
    rune: "†",
    color: "#34557a",
    title: { en: "Fast Days and the Rise of Fish", zh: "皈依与融合：斋日吃鱼" },
    text: {
      en: "As the settlers' descendants became Christian, the Church's calendar reshaped the table: meat was forbidden on fast days — Fridays, the forty days of Lent and other vigils — and the demand for fish soared. Archaeologists see a sudden jump in sea-fish bones such as cod and herring on English sites around the year 1000, a change known as the “fish event horizon”. Horse meat, bound up with pagan sacrifice, was banned by the Church; when Iceland converted around 1000, eating horse in private was allowed for a time, then abolished.",
      zh: "随着维京后裔皈依基督教，教会的斋戒历法改变了餐桌：星期五、复活节前四十天的大斋期等斋日不得吃肉，鱼的需求随之大增。考古学者发现，约公元1000年前后，英格兰遗址中的鳕鱼、鲱鱼等海鱼骨骼骤然增多，这一转变被称为“鱼类事件视界”。与异教献祭相连的马肉则遭教会禁止——冰岛约1000年皈依时，曾暂许私下食用马肉，此后被废除。"
    },
    points: [
      { en: "No meat on fast days", zh: "斋日禁肉，鱼需求大增" },
      { en: "Sea fish surge around 1000", zh: "约1000年海鱼骤增" },
      { en: "Horse meat banned", zh: "马肉遭禁" }
    ],
    evidence: {
      en: "Barrett, Locker and Roberts (2004) traced the “fish event horizon” in English fish-bone assemblages to c. 950–1050.",
      zh: "巴雷特等学者（2004年）通过英格兰各遗址的鱼骨统计，将“鱼类事件视界”定在约950–1050年。"
    },
    foods: ["barley", "flatbread", "dairy", "beef_mutton", "pork", "herring", "stockfish", "eel", "pulses", "ale", "mead", "wine"]
  }
];

export const FOODS: Food[] = [
  /* -------------------------------- grain -------------------------------- */
  {
    id: "barley",
    cat: "grain",
    short: { en: "Barley & oats", zh: "大麦燕麦" },
    name: { en: "Barley and Oats", zh: "大麦与燕麦" },
    norse: "bygg · hafri",
    text: {
      en: "The most important grains: hardy and quick to ripen in a short northern summer. Barley went into porridge (grautr), bread and the malt for ale; oats did better in the wetter west and north.",
      zh: "最重要的谷物，耐寒、在北方短暂的夏季也能成熟。大麦用来熬粥（grautr）、烙饼和制麦芽酿酒；燕麦则更适应西部与北部湿冷的土地。"
    },
    evidence: {
      en: "Barley is the commonest charred grain on Viking-age settlement sites.",
      zh: "维京时代聚落遗址出土的碳化谷粒中，以大麦最为常见。"
    }
  },
  {
    id: "flatbread",
    cat: "grain",
    short: { en: "Flatbread", zh: "扁面包" },
    name: { en: "Flatbread", zh: "扁面包" },
    norse: "brauð",
    text: {
      en: "Flour was mixed with water and baked into thin, mostly unleavened rounds on an iron pan or hot stone. Grit from the quern stones got into the flour, and it wore down the teeth of those who ate it.",
      zh: "谷物磨粉后加水揉成薄饼，在铁盘或烧热的石板上烙熟，大多不经发酵。石磨磨出的面粉常混有砂粒，长年食用会磨损牙齿。"
    },
    evidence: {
      en: "Charred loaves from graves at Birka in Sweden were made mostly of barley.",
      zh: "瑞典比尔卡墓葬出土的碳化面包，主要以大麦制成。"
    }
  },
  /* -------------------------------- dairy -------------------------------- */
  {
    id: "dairy",
    cat: "dairy",
    short: { en: "Butter & cheese", zh: "黄油奶酪" },
    name: { en: "Butter and Cheese", zh: "黄油与奶酪" },
    norse: "smjör · ostr",
    text: {
      en: "Milk does not keep, so the summer's surplus was churned into butter and made into cheese to last the winter. Soured whey was drunk and used to preserve other food.",
      zh: "鲜奶不耐存放，夏季多余的奶被制成黄油与奶酪以度过冬天；发酸的乳清既可饮用，也被用来浸渍保存其他食物。"
    }
  },
  {
    id: "skyr",
    cat: "dairy",
    short: { en: "Skyr", zh: "斯基尔" },
    name: { en: "Skyr", zh: "斯基尔酸乳" },
    norse: "skyr",
    text: {
      en: "Skimmed milk soured and strained of its whey into a thick, protein-rich curd that kept well. It survives today as a national food of Iceland.",
      zh: "脱脂奶发酵后滤去乳清制成的浓稠酸乳，蛋白质丰富、耐储存，至今仍是冰岛的代表性食物。"
    },
    evidence: {
      en: "In Egil's Saga, Egil is served skyr at the farm of Ármóðr in Värmland.",
      zh: "《埃吉尔萨迦》中，埃吉尔在主人阿尔莫德的农庄被端上了斯基尔。"
    }
  },
  /* -------------------------------- meat -------------------------------- */
  {
    id: "beef_mutton",
    cat: "meat",
    short: { en: "Beef & mutton", zh: "牛羊肉" },
    name: { en: "Beef and Mutton", zh: "牛羊肉" },
    norse: "naut · sauðr",
    text: {
      en: "Cattle and sheep were kept above all for milk, wool and hides. Most meat came from the autumn slaughter and was smoked, dried or salted; fresh roast meat was mainly for feasts.",
      zh: "牛羊首先用于产奶、产毛和取皮，肉多来自秋季集中宰杀，随后熏制、风干或腌制；新鲜烤肉主要出现在宴会上。"
    }
  },
  {
    id: "pork",
    cat: "meat",
    short: { en: "Pork", zh: "猪肉" },
    name: { en: "Pork", zh: "猪肉" },
    norse: "svín",
    text: {
      en: "Pigs fattened quickly on scraps and woodland forage, and pork was a prized feasting meat. In myth, the warriors of Valhalla feast on the boar Sæhrímnir, cooked every day and whole again by evening.",
      zh: "猪靠残羹与林地觅食就能迅速长膘，猪肉是宴会上颇受青睐的肉。神话中，英灵殿的勇士以野猪赛赫里姆尼尔为食，它每天被烹煮，到傍晚又完好如初。"
    },
    evidence: {
      en: "Snorri Sturluson, Gylfaginning (13th century).",
      zh: "见斯诺里·斯图鲁松《欺骗古鲁菲》（13世纪）。"
    }
  },
  {
    id: "horse",
    cat: "meat",
    short: { en: "Horse", zh: "马肉" },
    name: { en: "Horse Meat", zh: "马肉" },
    norse: "hrossakjöt",
    text: {
      en: "Closely tied to pagan sacrifice (blót), after which the meat was shared out and eaten. The Church treated it as a heathen practice and forbade it.",
      zh: "与异教献祭（blót）紧密相连，祭祀后众人分食。教会视之为异教陋习，予以禁止。"
    },
    evidence: {
      en: "Papal legates in England in 786 already complained that many there ate horses, “which no Christian in the East does”.",
      zh: "786年教皇使节在英格兰的报告中，就已指责当地许多人吃马肉，“东方的基督徒无人如此”。"
    }
  },
  /* -------------------------------- fish -------------------------------- */
  {
    id: "herring",
    cat: "fish",
    short: { en: "Herring", zh: "鲱鱼" },
    name: { en: "Herring", zh: "鲱鱼" },
    norse: "síld",
    text: {
      en: "Shoals of herring filled the North Sea and Baltic. Salted or smoked, it kept for months and was one of the sea fish most often eaten by townspeople.",
      zh: "北海与波罗的海鲱鱼成群洄游，腌制或熏制后可保存数月，是城镇居民最常吃的海鱼之一。"
    }
  },
  {
    id: "stockfish",
    cat: "fish",
    short: { en: "Stockfish", zh: "风干鳕鱼" },
    name: { en: "Stockfish", zh: "风干鳕鱼" },
    norse: "skreið",
    text: {
      en: "Cod from northern Norway was hung unsalted on wooden racks to dry in the cold wind until it was hard as wood. It kept for years, and before eating it had to be beaten soft and soaked.",
      zh: "挪威北部的鳕鱼不加盐挂在木架上，在寒风中风干到坚硬如木，可保存数年；食用前须捶打并浸泡变软。"
    }
  },
  {
    id: "eel",
    cat: "fish",
    short: { en: "Eel", zh: "鳗鱼" },
    name: { en: "Eel", zh: "鳗鱼" },
    norse: "áll",
    text: {
      en: "England's fens and rivers teemed with eels. Easily trapped, they were one of the commonest fish on the table in Viking-age York.",
      zh: "英格兰的沼泽与河流盛产鳗鱼，易于设笼捕捉，是维京时代约克餐桌上最常见的鱼之一。"
    },
    evidence: {
      en: "Domesday Book (1086) records many manors paying their rents in eels.",
      zh: "《末日审判书》（1086年）记载，许多庄园以鳗鱼缴纳租金。"
    }
  },
  /* ------------------------------- produce ------------------------------- */
  {
    id: "pulses",
    cat: "produce",
    short: { en: "Peas & beans", zh: "豌豆蚕豆" },
    name: { en: "Peas and Beans", zh: "豌豆与蚕豆" },
    norse: "ertr · baunir",
    text: {
      en: "Dried peas and beans stored well and were stewed with leeks, onions and cabbage, adding protein to a grain-heavy diet.",
      zh: "晒干的豆类便于储存，常与韭葱、洋葱、卷心菜一同炖煮，为以谷物为主的饮食补充蛋白质。"
    }
  },
  {
    id: "fruit_nuts",
    cat: "produce",
    short: { en: "Fruit & nuts", zh: "野果坚果" },
    name: { en: "Wild Fruit and Nuts", zh: "野果与坚果" },
    norse: "epli · hnot",
    text: {
      en: "Crab apples, plums, sloes, blackberries, raspberries and hazelnuts were mostly gathered from the wild rather than grown.",
      zh: "野苹果、李子、黑刺李、黑莓、覆盆子与榛子，大多靠野外采集而非种植获得。"
    },
    evidence: {
      en: "A bucket of wild apples was placed in the Oseberg ship burial (834).",
      zh: "奥塞贝格船葬（834年）中放有一桶野苹果。"
    }
  },
  /* -------------------------------- drink -------------------------------- */
  {
    id: "ale",
    cat: "drink",
    short: { en: "Ale", zh: "麦芽酒" },
    name: { en: "Ale", zh: "麦芽酒" },
    norse: "öl",
    text: {
      en: "Brewed from malted barley and usually not strong, ale was the everyday drink of the household and the mainstay of every feast.",
      zh: "以大麦芽酿成，酒精度通常不高，既是家中最日常的饮品，也是宴会上的主角。"
    }
  },
  {
    id: "mead",
    cat: "drink",
    short: { en: "Mead", zh: "蜜酒" },
    name: { en: "Mead", zh: "蜜酒" },
    norse: "mjöðr",
    text: {
      en: "Honey was scarce and costly, so mead belonged to lords' halls and to poetry. In myth, whoever drinks the Mead of Poetry becomes a poet.",
      zh: "蜂蜜稀少昂贵，蜜酒多见于领主的大厅与诗歌之中。神话里，饮下“诗之蜜酒”的人便能成为诗人。"
    }
  },
  {
    id: "wine",
    cat: "drink",
    short: { en: "Wine", zh: "葡萄酒" },
    name: { en: "Wine", zh: "葡萄酒" },
    norse: "vín",
    text: {
      en: "Imported from the Rhineland and drunk from glass beakers, wine was a mark of elite status.",
      zh: "主要从莱茵兰进口，以玻璃杯盛饮，是精英身份的象征。"
    },
    evidence: {
      en: "Rhineland wine jugs and glass vessels have been found at the trading towns of Birka and Hedeby.",
      zh: "比尔卡、海泽比等商埠出土过来自莱茵兰的酒壶与玻璃器皿。"
    }
  }
];

export const FOOD_BY_ID: Record<string, Food> = Object.fromEntries(FOODS.map((f) => [f.id, f]));
