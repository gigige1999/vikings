/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Key figures of the Chronicle chapter (865–1066) and the ties between them.
 * Names follow the spelling already used in data.ts / data_zh.ts / timeline_data.ts.
 * Where a detail rests only on later or partisan sources, it is flagged as such in the text or `note`.
 */

type L = { en: string; zh: string };

export type Faction = "english" | "norse" | "norman";
export type TieType = "kin" | "marriage" | "conflict" | "bond";

export interface Figure {
  id: string;
  faction: Faction;
  band: 0 | 1 | 2;
  x: number; // graph coordinates (viewBox 360 × 556)
  y: number;
  short: L; // label on the graph
  name: L;
  dates: L;
  role: L;
  summary: L;
  deeds: { year: string; text: L }[];
  note?: L;
}

export interface Tie {
  a: string;
  b: string;
  type: TieType;
  label: L;
  hidden?: boolean; // drawn as the "Sons of Ragnar" group instead of a line
  at?: number; // label position along the line (0 = a, 1 = b); default 0.5
}

export const GRAPH_W = 360;
export const GRAPH_H = 556;

export const FACTIONS: Record<Faction, { color: string; label: L }> = {
  english: { color: "#2f4a3a", label: { en: "Anglo-Saxon", zh: "盎格鲁-撒克逊" } },
  norse: { color: "#7d1d18", label: { en: "Viking / Danish / Norwegian", zh: "维京 · 丹麦 · 挪威" } },
  norman: { color: "#34557a", label: { en: "Norman", zh: "诺曼" } }
};

export const TIE_TYPES: Record<TieType, L> = {
  kin: { en: "Blood", zh: "血亲" },
  marriage: { en: "Marriage", zh: "婚姻 · 姻亲" },
  conflict: { en: "War", zh: "交战" },
  bond: { en: "Baptism & treaty", zh: "受洗 · 盟约" }
};

export const BANDS: { y0: number; y1: number; label: L }[] = [
  { y0: 0, y1: 214, label: { en: "I · 865–899 · The Great Heathen Army", zh: "I · 865–899 · 异教徒大军" } },
  { y0: 214, y1: 394, label: { en: "II · 978–1035 · The Danish Conquest", zh: "II · 978–1035 · 丹麦征服" } },
  { y0: 394, y1: GRAPH_H, label: { en: "III · 1042–1066 · The Crown Contested", zh: "III · 1042–1066 · 王冠之争" } }
];

// The three brothers enclosed by a single "Sons of Ragnar" outline
export const RAGNAR_GROUP = {
  ids: ["ivar", "ubba", "halfdan"],
  rect: { x: 132, y: 20, w: 196, h: 124 },
  label: { en: "Sons of Ragnar", zh: "拉格纳诸子" } as L
};

export const FIGURES: Figure[] = [
  /* ========================= I · 865–890 ========================= */
  {
    id: "edmund_martyr",
    faction: "english",
    band: 0,
    x: 52,
    y: 50,
    short: { en: "St Edmund", zh: "埃德蒙" },
    name: { en: "St Edmund the Martyr", zh: "圣王埃德蒙" },
    dates: { en: "d. 869", zh: "? – 869年" },
    role: { en: "King of East Anglia, c. 855–869", zh: "东盎格利亚国王 · 约855–869年在位" },
    summary: {
      en: "Killed after the Great Heathen Army overran his kingdom. Remembered for refusing to renounce Christ, he became one of the most venerated saints of medieval England.",
      zh: "异教徒大军攻陷其王国后被杀，因宁死不弃信仰被奉为殉道圣徒，成为中世纪英格兰最受崇敬的圣人之一。"
    },
    deeds: [
      { year: "865", text: { en: "The Great Heathen Army lands and winters in his kingdom; the East Angles make peace and supply it with horses.", zh: "异教徒大军在其王国登陆过冬，东盎格利亚被迫与之议和，并为其提供马匹。" } },
      { year: "869", text: { en: "The army returns south. Edmund fights it, is defeated and killed (traditionally on 20 November); East Anglia falls.", zh: "大军再度南下，埃德蒙率军迎战，兵败被杀（传统日期为11月20日），东盎格利亚王国随之覆亡。" } },
      { year: "c. 895", text: { en: "Within a generation, coins honouring “St Edmund” are being minted in the Danish-ruled East — the conquerors' descendants now revere him.", zh: "不到三十年，丹麦人治下的东盎格利亚已在铸造“圣埃德蒙”纪念币——征服者的后人也开始尊崇他。" } },
      { year: "c. 985", text: { en: "Abbo of Fleury's Passio records the tradition: bound to a tree, shot through with arrows and beheaded for refusing to deny Christ.", zh: "弗勒里的阿博在《圣埃德蒙受难记》中记下流传的说法：他拒绝背弃基督，被绑在树上乱箭射穿，随后被斩首。" } },
      { year: "1020", text: { en: "Cnut endows a Benedictine abbey at his shrine — the origin of Bury St Edmunds.", zh: "克努特在其圣陵所在地设立本笃会修道院，即日后的贝里圣埃德蒙兹。" } }
    ],
    note: {
      en: "The arrows and the tree come from Abbo's account written over a century later; the Chronicle says only that the Danes killed the king.",
      zh: "绑树、乱箭等细节出自百余年后阿博的记载；《盎格鲁-撒克逊编年史》只记“丹麦人杀死了国王”。"
    }
  },
  {
    id: "ivar",
    faction: "norse",
    band: 0,
    x: 170,
    y: 50,
    short: { en: "Ivar", zh: "伊瓦尔" },
    name: { en: "Ivar the Boneless", zh: "“无骨人”伊瓦尔" },
    dates: { en: "d. c. 873", zh: "? – 约873年" },
    role: { en: "Leader of the Great Heathen Army", zh: "异教徒大军统帅" },
    summary: {
      en: "Remembered as a son of Ragnar, he led the Great Heathen Army ashore in 865 — the first step of the Viking conquest of England.",
      zh: "后世传为拉格纳之子，865年与兄弟们率异教徒大军登陆，揭开了维京人征服英格兰的序幕。"
    },
    deeds: [
      { year: "865", text: { en: "Lands in East Anglia with Halfdan, Ubba and other chiefs at the head of the Great Heathen Army.", zh: "与哈夫丹、乌巴等首领率异教徒大军在东盎格利亚登陆。" } },
      { year: "866", text: { en: "Takes York, the Northumbrian capital. Next spring the rival kings Osberht and Ælla, now allied, both die trying to retake it.", zh: "攻占诺森布里亚首府约克；次年春，冰释前嫌联手反攻的两位国王奥斯伯特与埃拉双双战死城下。" } },
      { year: "869", text: { en: "The army overruns East Anglia and King Edmund is killed; Abbo of Fleury names Ivar and Ubba as the men who put him to death.", zh: "大军攻入东盎格利亚，国王埃德蒙被杀；据阿博记载，下令处死他的正是伊瓦尔与乌巴。" } },
      { year: "873", text: { en: "Many historians identify him with Ímar, king in Dublin, whose death the Irish annals record this year.", zh: "许多学者认为他就是爱尔兰编年史所载、于本年去世的都柏林之王“伊玛尔”。" } }
    ],
    note: {
      en: "His nickname and descent from Ragnar come from later sagas; contemporary chronicles give only his name.",
      zh: "“无骨人”的绰号与“拉格纳之子”的身份都出自后世萨迦，同时代史料只记其名。"
    }
  },
  {
    id: "ubba",
    faction: "norse",
    band: 0,
    x: 290,
    y: 50,
    short: { en: "Ubba", zh: "乌巴" },
    name: { en: "Ubba", zh: "乌巴" },
    dates: { en: "d. 878", zh: "? – 878年" },
    role: { en: "Chief of the Great Heathen Army", zh: "异教徒大军首领" },
    summary: {
      en: "Brother of Ivar and Halfdan. Named with Ivar as King Edmund's killer, he fell in Devon in the very winter Guthrum struck at Alfred.",
      zh: "伊瓦尔与哈夫丹的兄弟，与伊瓦尔一同被记为杀害圣王埃德蒙的元凶，最终在古思伦奇袭阿尔弗雷德的同一个冬天战死于德文郡。"
    },
    deeds: [
      { year: "865", text: { en: "Comes ashore in East Anglia with his brothers.", zh: "随兄弟们率异教徒大军登陆东盎格利亚。" } },
      { year: "869", text: { en: "According to Abbo of Fleury, shares with Ivar the killing of King Edmund.", zh: "据阿博记载，与伊瓦尔共同处死了东盎格利亚国王埃德蒙。" } },
      { year: "878", text: { en: "Attacks Devon with 23 ships and is killed at Cynwit by the men of Ealdorman Odda; the Danes' raven banner is captured.", zh: "率23艘战船进攻德文郡，在辛威特被郡长奥达的部众击败阵亡，维京人的乌鸦战旗被缴获。" } }
    ],
    note: {
      en: "The Chronicle calls the man killed in 878 only “the brother of Ivar and Halfdan”; the name Ubba is supplied by later writers.",
      zh: "《编年史》只称878年阵亡者为“伊瓦尔与哈夫丹的兄弟”，“乌巴”之名见于后世记载。"
    }
  },
  {
    id: "halfdan",
    faction: "norse",
    band: 0,
    x: 230,
    y: 98,
    short: { en: "Halfdan", zh: "哈夫丹" },
    name: { en: "Halfdan Ragnarsson", zh: "哈夫丹" },
    dates: { en: "d. 877", zh: "? – 877年" },
    role: { en: "Army leader; first Viking ruler of Northumbria", zh: "异教徒大军统帅 · 诺森布里亚的维京统治者" },
    summary: {
      en: "The army's chief commander after Ivar left. He fought Wessex, broke Mercia, and turned raiders into settlers.",
      zh: "伊瓦尔离开后的大军主帅：他鏖战威塞克斯、击垮麦西亚，并把维京人从劫掠者变成了定居者。"
    },
    deeds: [
      { year: "871", text: { en: "Invades Wessex with King Bagsecg; they meet Æthelred I and his brother Alfred in battle after battle. At Ashdown Bagsecg is killed. By year's end Wessex buys a truce.", zh: "与巴格塞格进攻威塞克斯，同埃塞尔雷德一世和阿尔弗雷德兄弟连番交战，阿什当一役巴格塞格阵亡；年末威塞克斯被迫议和。" } },
      { year: "874", text: { en: "From winter quarters at Repton, drives out King Burgred of Mercia, who dies in Rome; a puppet, Ceolwulf II, is set up.", zh: "自雷普顿营地驱逐麦西亚国王伯格雷德，后者出奔罗马并客死他乡；大军扶立切奥尔伍尔夫二世为傀儡。" } },
      { year: "876", text: { en: "“Shared out the land of the Northumbrians, and they were ploughing and providing for themselves” — the first recorded permanent Viking settlement in England.", zh: "“分配诺森布里亚的土地，开始耕种养活自己”——这是编年史所载维京人在英格兰的第一次永久定居。" } },
      { year: "877", text: { en: "Killed, according to the Irish annals, in a battle at Strangford Lough.", zh: "据爱尔兰编年史记载，于斯特兰福德湖一战中阵亡。" } }
    ]
  },
  {
    id: "alfred",
    faction: "english",
    band: 0,
    x: 60,
    y: 165,
    short: { en: "Alfred", zh: "阿尔弗雷德" },
    name: { en: "Alfred the Great", zh: "阿尔弗雷德大帝" },
    dates: { en: "849–899", zh: "849 – 899年" },
    role: { en: "King of Wessex, 871–899", zh: "威塞克斯国王 · 871–899年在位" },
    summary: {
      en: "He held Wessex when every other English kingdom had fallen, then rebuilt it with fortresses, ships, laws and learning — the only English king called “the Great”.",
      zh: "在其余英格兰王国相继沦陷时守住了威塞克斯，又以要塞、舰队、法典与教育重建国家，是唯一被尊为“大帝”的英格兰君主。"
    },
    deeds: [
      { year: "871", text: { en: "Fights beside his brother Æthelred I against Halfdan's army; on Æthelred's death in April he becomes king at about 22.", zh: "随兄长埃塞尔雷德一世迎战哈夫丹的大军；4月兄长去世，约22岁的他继位为王。" } },
      { year: "878", text: { en: "Surprised by Guthrum at Chippenham around Twelfth Night, he withdraws to the Athelney marshes; in May he routs the Danes at Edington and starves Guthrum into surrender.", zh: "主显节前后遭古思伦奇袭奇彭纳姆，退入阿瑟尔尼沼泽；5月于爱丁顿大破丹军，围困其营寨迫使古思伦投降。" } },
      { year: "878", text: { en: "Stands godfather as Guthrum and some thirty of his leading men are baptised at Aller; the ceremony is completed at Wedmore.", zh: "古思伦与约三十名首领在阿勒受洗，阿尔弗雷德亲为教父，随后在威德莫尔完成洗礼仪式。" } },
      { year: "886", text: { en: "Occupies London. Around this time a treaty with Guthrum fixes the frontier along the Thames, the Lea and Watling Street — the edge of what became the Danelaw.", zh: "收复伦敦；约同期与古思伦订立条约，以泰晤士河、利河与惠特灵大道划定疆界，即后来“丹麦法区”的边界。" } },
      { year: "880s–890s", text: { en: "Builds a network of fortified burhs and a fleet, issues a law code, and sponsors translations into English; the Anglo-Saxon Chronicle is begun at his court.", zh: "修建“堡垒城镇”网络与舰队，颁布法典，组织将拉丁典籍译为古英语，《盎格鲁-撒克逊编年史》亦在其宫廷开始编纂。" } },
      { year: "899", text: { en: "Dies on 26 October and is buried at Winchester; his son Edward the Elder and daughter Æthelflæd carry on the reconquest.", zh: "10月26日去世，葬于温切斯特；其子“长者”爱德华与女儿埃塞尔弗列塔继续收复丹麦法区。" } }
    ],
    note: {
      en: "The famous tale of the burnt cakes first appears in a saint's life written about a century after his death.",
      zh: "流传甚广的“烤焦面饼”故事，最早见于他身后约一个世纪写成的圣徒传，不见于同时代史料。"
    }
  },
  {
    id: "guthrum",
    faction: "norse",
    band: 0,
    x: 300,
    y: 165,
    short: { en: "Guthrum", zh: "古思伦" },
    name: { en: "Guthrum", zh: "古思伦" },
    dates: { en: "d. 890", zh: "? – 890年" },
    role: { en: "Danish king; King of East Anglia, 880–890", zh: "丹麦王 · 东盎格利亚国王（880–890年）" },
    summary: {
      en: "Alfred's most dangerous foe. Defeated, he was baptised and ruled East Anglia under the Christian name Æthelstan — enemy turned godson.",
      zh: "阿尔弗雷德最危险的对手。战败后受洗为基督徒，以教名“埃塞尔斯坦”统治东盎格利亚，从宿敌变成了教子。"
    },
    deeds: [
      { year: "875", text: { en: "With Oscetel and Anwend, leads the southern half of the army to Cambridge.", zh: "与奥斯塞特尔、安温德率大军南支进驻剑桥。" } },
      { year: "876–877", text: { en: "Slips past the West Saxons to seize Wareham and then Exeter, swearing peace to Alfred and breaking it.", zh: "绕过威塞克斯军队相继占据韦勒姆与埃克塞特，向阿尔弗雷德立誓议和后又背约。" } },
      { year: "878", text: { en: "His midwinter strike on Chippenham nearly destroys Alfred; in May he is beaten at Edington and, after a fourteen-day siege, surrenders.", zh: "隆冬奇袭奇彭纳姆，几乎令阿尔弗雷德覆灭；5月爱丁顿战败，被围十四天后投降。" } },
      { year: "878", text: { en: "Baptised at Aller with Alfred as godfather, taking the name Æthelstan.", zh: "在阿勒受洗，阿尔弗雷德为其教父，取教名“埃塞尔斯坦”。" } },
      { year: "880–890", text: { en: "Settles and rules East Anglia, striking coins in his baptismal name; agrees the frontier treaty with Alfred around 886.", zh: "率部定居东盎格利亚并称王，以教名铸造钱币；约886年与阿尔弗雷德订立划界条约。" } }
    ]
  },

  /* ========================= II · 978–1035 ========================= */
  {
    id: "aethelred2",
    faction: "english",
    band: 1,
    x: 60,
    y: 255,
    short: { en: "Æthelred II", zh: "埃塞尔雷德二世" },
    name: { en: "Æthelred II the Unready", zh: "“决策无方者”埃塞尔雷德二世" },
    dates: { en: "c. 966–1016", zh: "约966 – 1016年" },
    role: { en: "King of England, 978–1013 and 1014–1016", zh: "英格兰国王 · 978–1013、1014–1016年在位" },
    summary: {
      en: "Alfred's great-great-grandson. Faced with returning Danish fleets he paid ever larger Danegelds, and was finally driven out by Sweyn.",
      zh: "阿尔弗雷德的玄孙。面对卷土重来的丹麦舰队，他一再以越来越多的“丹麦金”买和，最终被斯韦恩逐出王国。"
    },
    deeds: [
      { year: "978", text: { en: "Becomes king aged about twelve after the murder of his half-brother Edward the Martyr.", zh: "异母兄“殉教者”爱德华遇刺身亡后，约十二岁的他即位。" } },
      { year: "991", text: { en: "After the defeat at Maldon, pays the Vikings 10,000 pounds of silver — the first of many ever-larger Danegelds.", zh: "马尔登之战失利后，首次向维京人支付一万镑白银，此后“丹麦金”越付越多。" } },
      { year: "1002", text: { en: "Marries Emma of Normandy. On 13 November orders the killing of the Danes in England — the St Brice's Day massacre.", zh: "迎娶诺曼底的埃玛；同年11月13日下令屠杀英格兰境内的丹麦人，史称“圣布莱斯日大屠杀”。" } },
      { year: "1013", text: { en: "As Sweyn's invasion sweeps the country, flees with his family to Emma's homeland, Normandy.", zh: "斯韦恩大举入侵、各地相继归降，他携家眷流亡妻子的故乡诺曼底。" } },
      { year: "1014–1016", text: { en: "Recalled after Sweyn's death; dies in London on 23 April 1016, leaving the war to his son Edmund.", zh: "斯韦恩死后被迎回复位；1016年4月23日病逝于伦敦，把战争留给了儿子埃德蒙。" } }
    ],
    note: {
      en: "“Unready” renders Old English unræd, “ill-counselled” — a pun on his name Æthelred, “noble counsel”.",
      zh: "绰号原文 unræd 意为“缺乏良策”，与其名 Æthelred（“高贵的谋略”）构成双关，并非“没有准备”。"
    }
  },
  {
    id: "emma",
    faction: "norman",
    band: 1,
    x: 180,
    y: 292,
    short: { en: "Emma", zh: "埃玛" },
    name: { en: "Emma of Normandy", zh: "诺曼底的埃玛" },
    dates: { en: "c. 984–1052", zh: "约984 – 1052年" },
    role: { en: "Twice Queen of England", zh: "两度为英格兰王后" },
    summary: {
      en: "Daughter of Duke Richard I of Normandy, wife first of Æthelred II and then of Cnut — the hinge joining the English, Danish and Norman stories.",
      zh: "诺曼底公爵理查一世之女，先后嫁给埃塞尔雷德二世与克努特，是连接撒克逊、丹麦与诺曼三方的关键人物。"
    },
    deeds: [
      { year: "1002", text: { en: "Marries Æthelred II; their son is the future Edward the Confessor.", zh: "嫁给埃塞尔雷德二世，所生之子即日后的“忏悔者”爱德华。" } },
      { year: "1013", text: { en: "During Sweyn's conquest takes refuge with her brother, Duke Richard II, in Normandy.", zh: "斯韦恩征服英格兰时，避往诺曼底投奔兄长理查二世。" } },
      { year: "1017", text: { en: "Marries the new king, Cnut, and is queen again; their son is Harthacnut.", zh: "嫁给新王克努特，再度成为王后，生子哈德克努特。" } },
      { year: "1040–1042", text: { en: "Sees her sons Harthacnut and then Edward take the English throne; commissions the Encomium Emmae Reginae in her own defence.", zh: "儿子哈德克努特与爱德华先后登上英格兰王位；她委托写成《埃玛王后颂》为自己与家族正名。" } },
      { year: "1052", text: { en: "Dies at Winchester and is buried beside Cnut.", zh: "卒于温切斯特，与克努特同葬于此。" } }
    ],
    note: {
      en: "Duke William of Normandy was her great-nephew — the family tie behind the Norman interest in England's crown.",
      zh: "诺曼底公爵威廉是她的侄孙——诺曼人与英格兰王室的亲缘，正是经由她而来。"
    }
  },
  {
    id: "sweyn",
    faction: "norse",
    band: 1,
    x: 300,
    y: 255,
    short: { en: "Sweyn", zh: "斯韦恩" },
    name: { en: "Sweyn Forkbeard", zh: "“八字胡”斯韦恩" },
    dates: { en: "c. 960–1014", zh: "约960 – 1014年" },
    role: { en: "King of Denmark; King of England 1013–1014", zh: "丹麦国王 · 1013–1014年为英格兰国王" },
    summary: {
      en: "Son of Harald Bluetooth. He turned raiding into conquest on a national scale and became the first Danish king to rule all England.",
      zh: "“蓝牙”哈拉尔之子。他把劫掠升级为国家规模的征服，成为第一位统治全英格兰的丹麦国王。"
    },
    deeds: [
      { year: "c. 986", text: { en: "Rebels against his father Harald Bluetooth and takes the Danish throne.", zh: "起兵反抗父亲“蓝牙”哈拉尔，夺得丹麦王位。" } },
      { year: "994", text: { en: "Attacks London with Olaf Tryggvason; beaten off, they ravage the south-east until bought off with 16,000 pounds.", zh: "与挪威的奥拉夫·特里格维松合攻伦敦未果，转而劫掠东南各郡，直到英格兰付出一万六千镑才撤离。" } },
      { year: "1003", text: { en: "Returns in force — by tradition, to avenge the St Brice's Day massacre.", zh: "再度大举来袭，传统说法认为是为圣布莱斯日大屠杀复仇。" } },
      { year: "1013", text: { en: "Lands at Gainsborough; the Danelaw submits at once, the rest of England follows, London last. By Christmas he is accepted as king.", zh: "在根兹伯勒登陆，丹麦法区率先归顺，其余各地相继臣服，伦敦最后屈服；年末他被奉为英格兰国王。" } },
      { year: "1014", text: { en: "Dies suddenly at Gainsborough on 3 February, after barely five weeks as king of England.", zh: "2月3日猝死于根兹伯勒，统治英格兰仅约五周。" } }
    ]
  },
  {
    id: "edmund2",
    faction: "english",
    band: 1,
    x: 60,
    y: 345,
    short: { en: "Edmund II", zh: "埃德蒙二世" },
    name: { en: "Edmund II Ironside", zh: "“刚勇者”埃德蒙二世" },
    dates: { en: "c. 990–1016", zh: "约990 – 1016年" },
    role: { en: "King of England, April–November 1016", zh: "英格兰国王 · 1016年4月–11月在位" },
    summary: {
      en: "Son of Æthelred II. In a reign of seven months he came close to keeping Cnut off the throne almost single-handed.",
      zh: "埃塞尔雷德二世之子，在位仅七个月，却几乎以一己之力把克努特挡在王座之外。"
    },
    deeds: [
      { year: "1015", text: { en: "Against his father's wishes, raises his own forces in the north-east Midlands to resist Cnut.", zh: "不顾父亲反对，在中部东北的“五镇”地区自行募兵抵抗克努特。" } },
      { year: "1016", text: { en: "Chosen king by the Londoners on his father's death; fights Cnut at Penselwood, Sherston, Brentford and Otford, earning the name “Ironside”.", zh: "父王去世后被伦敦拥立为王，此后在彭塞尔伍德、舍斯顿、布伦特福德、奥特福德等地与克努特连番交战，赢得“刚勇者”之名。" } },
      { year: "1016", text: { en: "On 18 October at Assandun, Ealdorman Eadric of Mercia deserts with his men and the English are routed.", zh: "10月18日阿桑顿决战，麦西亚郡长埃德里克临阵率部脱逃，英军大败。" } },
      { year: "1016", text: { en: "Divides the kingdom with Cnut at Alney, keeping Wessex; dies on 30 November, cause unknown.", zh: "与克努特在奥尔尼议和平分王国，保有威塞克斯；11月30日去世，死因不明。" } }
    ],
    note: {
      en: "He did not fall at Assandun: he survived the battle and died about six weeks later.",
      zh: "他并非战死于阿桑顿，而是在战后约六周去世。"
    }
  },
  {
    id: "cnut",
    faction: "norse",
    band: 1,
    x: 300,
    y: 345,
    short: { en: "Cnut", zh: "克努特" },
    name: { en: "Cnut the Great", zh: "克努特大帝" },
    dates: { en: "c. 995–1035", zh: "约995 – 1035年" },
    role: { en: "King of England (1016–35), Denmark and Norway", zh: "英格兰（1016–1035年）、丹麦与挪威国王" },
    summary: {
      en: "Sweyn's son. He took England by the sword, then governed it by English law, at the heart of an empire spanning the North Sea.",
      zh: "斯韦恩之子。他以武力夺取英格兰，却以撒克逊旧法治国，并以此为中心建立起横跨北海的帝国。"
    },
    deeds: [
      { year: "1015", text: { en: "Returns to England with a great fleet to take his father's crown.", zh: "率大军重返英格兰，争夺父亲留下的王冠。" } },
      { year: "1016", text: { en: "Defeats Edmund Ironside at Assandun on 18 October and shares the kingdom with him; on Edmund's death weeks later, becomes king of all England.", zh: "10月18日于阿桑顿击败埃德蒙二世，随后与之平分王国；数周后埃德蒙去世，克努特成为全英格兰之王。" } },
      { year: "1017", text: { en: "Marries Æthelred's widow Emma and divides England into great earldoms; in the years after, raises Englishmen such as Godwin, Harold's father.", zh: "迎娶埃塞尔雷德的遗孀埃玛，把英格兰划为数个大伯爵领，此后又提拔了戈德温（哈罗德之父）等英格兰新贵。" } },
      { year: "1018–1028", text: { en: "Succeeds to Denmark and, in 1028, adds Norway: the North Sea Empire is complete.", zh: "继承丹麦王位，1028年又将挪威纳入治下，北海帝国由此成形。" } },
      { year: "1027", text: { en: "Makes a pilgrimage to Rome and attends the imperial coronation of Conrad II.", zh: "前往罗马朝圣，出席神圣罗马皇帝康拉德二世的加冕礼。" } },
      { year: "1035", text: { en: "Dies at Shaftesbury on 12 November and is buried at Winchester; his empire soon falls apart.", zh: "11月12日卒于沙夫茨伯里，葬于温切斯特；身后帝国很快分崩离析。" } }
    ],
    note: {
      en: "The story of Cnut commanding the tide first appears in Henry of Huntingdon's twelfth-century history.",
      zh: "“斥退潮水”的故事最早见于12世纪亨利·亨廷登的史书，属于后世流传的佳话。"
    }
  },

  /* ========================= III · 1042–1066 ========================= */
  {
    id: "edward",
    faction: "english",
    band: 2,
    x: 60,
    y: 435,
    short: { en: "Edward", zh: "爱德华" },
    name: { en: "Edward the Confessor", zh: "“忏悔者”爱德华" },
    dates: { en: "c. 1003–1066", zh: "约1003 – 1066年" },
    role: { en: "King of England, 1042–1066", zh: "英格兰国王 · 1042–1066年在位" },
    summary: {
      en: "Son of Æthelred II and Emma. After a quarter-century in Norman exile he restored the house of Wessex — but died childless, leaving the crisis of 1066.",
      zh: "埃塞尔雷德二世与埃玛之子。在诺曼底流亡二十余年后恢复了威塞克斯王统，却身后无嗣，留下了1066年的王位之争。"
    },
    deeds: [
      { year: "1013–1041", text: { en: "Spends his youth and early manhood in exile at the court of his Norman kinsmen.", zh: "自1013年起流亡诺曼底，在母系亲族的宫廷中度过青年时代。" } },
      { year: "1042", text: { en: "On the death of his half-brother Harthacnut, becomes king; the old West Saxon line is restored.", zh: "同母异父的弟弟哈德克努特去世后被拥立为王，威塞克斯王统得以恢复。" } },
      { year: "1045", text: { en: "Marries Edith, daughter of the powerful Earl Godwin — tying the crown to the Godwin family.", zh: "迎娶权臣戈德温伯爵之女伊迪丝，与戈德温家族结为姻亲。" } },
      { year: "1051", text: { en: "Briefly exiles the Godwins; Norman writers claim that at this time he promised the throne to his kinsman William.", zh: "一度放逐戈德温家族；诺曼史家称，他在此期间许诺把王位传给表侄威廉。" } },
      { year: "1065–1066", text: { en: "Too ill to attend the consecration of Westminster Abbey on 28 December; dies on 5 January, reportedly commending the kingdom to Harold.", zh: "12月28日威斯敏斯特修道院祝圣时已病重未能出席；1066年1月5日去世，据载临终将王国托付给哈罗德。" } }
    ],
    note: {
      en: "Canonised in 1161. “Confessor” means a saint who witnessed to the faith by his life, not by martyrdom.",
      zh: "1161年被封为圣徒。“忏悔者”指以虔信生活见证信仰的圣徒，而非曾经悔过之意。"
    }
  },
  {
    id: "william",
    faction: "norman",
    band: 2,
    x: 300,
    y: 435,
    short: { en: "William", zh: "威廉" },
    name: { en: "William, Duke of Normandy", zh: "诺曼底公爵威廉" },
    dates: { en: "c. 1028–1087", zh: "约1028 – 1087年" },
    role: { en: "Duke of Normandy; King of England, 1066–1087", zh: "诺曼底公爵 · 1066–1087年为英格兰国王" },
    summary: {
      en: "Great-nephew of Emma and a descendant of the Viking Rollo. His victory at Hastings ended Anglo-Saxon England.",
      zh: "埃玛的侄孙、爱德华的表侄，也是维京首领罗洛的后裔。他以黑斯廷斯一战终结了盎格鲁-撒克逊英格兰。"
    },
    deeds: [
      { year: "1035", text: { en: "Succeeds his father Robert I as duke while still a boy, and survives years of baronial violence.", zh: "父亲罗贝尔一世朝圣途中去世，年幼的他继任诺曼底公爵，在贵族动乱中长大。" } },
      { year: "1051", text: { en: "According to Norman sources, is promised the English succession by Edward.", zh: "据诺曼史料，表叔爱德华在这一时期许诺由他继承英格兰王位。" } },
      { year: "1066", text: { en: "Lands at Pevensey on 28 September; on 14 October defeats and kills Harold at Hastings.", zh: "9月28日在佩文西登陆；10月14日于黑斯廷斯击败并杀死哈罗德。" } },
      { year: "1066", text: { en: "Crowned King of England in Westminster Abbey on Christmas Day.", zh: "圣诞节在威斯敏斯特修道院加冕为英格兰国王，史称“征服者”威廉。" } },
      { year: "1086", text: { en: "Orders the great survey of land and resources later called Domesday Book.", zh: "下令全面清查英格兰的土地与资源，即后来的《末日审判书》。" } }
    ]
  },
  {
    id: "harold",
    faction: "english",
    band: 2,
    x: 132,
    y: 510,
    short: { en: "Harold", zh: "哈罗德" },
    name: { en: "Harold Godwinson", zh: "哈罗德·戈德温森" },
    dates: { en: "c. 1022–1066", zh: "约1022 – 1066年" },
    role: { en: "Earl of Wessex; King of England, January–October 1066", zh: "威塞克斯伯爵 · 1066年1月–10月为英格兰国王" },
    summary: {
      en: "Son of Earl Godwin and brother-in-law of Edward. Within nineteen days he faced two invaders — one victory, one defeat, and the end of an age.",
      zh: "戈德温伯爵之子、爱德华的妻舅。他在十九天内先后迎战两路入侵者，一胜一败，为盎格鲁-撒克逊时代画上句号。"
    },
    deeds: [
      { year: "1053", text: { en: "Succeeds his father as Earl of Wessex, the greatest man in England after the king.", zh: "父亲去世后继任威塞克斯伯爵，成为国王之下最有权势的人。" } },
      { year: "c. 1064", text: { en: "Visits Normandy, where — say the Norman sources — he swears to support William's claim.", zh: "出使诺曼底；据诺曼史料，他在那里宣誓支持威廉继承王位。" } },
      { year: "1066", text: { en: "Crowned at Westminster on 6 January, the day of Edward's funeral.", zh: "1月6日，爱德华下葬当天在威斯敏斯特加冕。" } },
      { year: "1066", text: { en: "Marches north and on 25 September surprises the Norwegians at Stamford Bridge; Harald Hardrada and Harold's rebel brother Tostig are killed.", zh: "挥师北上，9月25日在斯坦福桥奇袭挪威军，哈拉尔与倒戈的弟弟托斯蒂格双双阵亡。" } },
      { year: "1066", text: { en: "Killed at Hastings on 14 October; Anglo-Saxon kingship dies with him.", zh: "10月14日战死于黑斯廷斯，盎格鲁-撒克逊王权随之终结。" } }
    ],
    note: {
      en: "The arrow in the eye rests on a reading of the Bayeux Tapestry and remains debated.",
      zh: "“眼睛中箭”之说源自对《贝叶挂毯》画面的解读，学界至今仍有争议。"
    }
  },
  {
    id: "hardrada",
    faction: "norse",
    band: 2,
    x: 300,
    y: 510,
    short: { en: "Hardrada", zh: "哈拉尔" },
    name: { en: "Harald Hardrada", zh: "“无情者”哈拉尔" },
    dates: { en: "c. 1015–1066", zh: "约1015 – 1066年" },
    role: { en: "King of Norway, 1046–1066", zh: "挪威国王 · 1046–1066年在位" },
    summary: {
      en: "Half-brother of St Olaf, veteran of Rus' and Byzantium, often called the last great Viking king.",
      zh: "圣奥拉夫的同母异父弟，半生征战于罗斯与拜占庭，常被称为“最后一位伟大的维京国王”。"
    },
    deeds: [
      { year: "1030", text: { en: "At about fifteen fights for his brother Olaf II at Stiklestad against Cnut-backed rebels; Olaf is killed and Harald, wounded, escapes to Rus'.", zh: "约十五岁时随兄长奥拉夫二世在斯蒂克莱斯塔德迎战受克努特支持的挪威贵族，兄长战死，他负伤逃往罗斯。" } },
      { year: "1030s–1040s", text: { en: "Serves the Byzantine emperors in the Varangian Guard, campaigning across the Mediterranean and amassing a fortune.", zh: "在君士坦丁堡加入拜占庭皇帝的瓦良格卫队，转战地中海各地，积累巨额财富。" } },
      { year: "1046", text: { en: "Returns to share Norway with his nephew Magnus; sole king from 1047.", zh: "回到挪威与侄子马格努斯共治，次年成为唯一的国王。" } },
      { year: "1066", text: { en: "Invades with some 300 ships, defeats the northern earls at Fulford on 20 September and receives York's submission.", zh: "率约三百艘战船入侵英格兰，9月20日在富尔福德击败北方伯爵，约克随即归降。" } },
      { year: "1066", text: { en: "Surprised by Harold at Stamford Bridge on 25 September and killed — by Snorri's account, an arrow in the throat.", zh: "9月25日在斯坦福桥遭哈罗德奇袭阵亡，据斯诺里记载是喉部中箭。" } }
    ],
    note: {
      en: "His claim to England rested on an agreement said to have been made between Magnus and Cnut's son Harthacnut.",
      zh: "他对英格兰王位的主张，源自据称马格努斯与克努特之子哈德克努特之间订立的继承约定。"
    }
  }
];

export const TIES: Tie[] = [
  // I
  { a: "ivar", b: "ubba", type: "kin", label: { en: "brothers", zh: "兄弟" }, hidden: true },
  { a: "ivar", b: "halfdan", type: "kin", label: { en: "brothers", zh: "兄弟" }, hidden: true },
  { a: "ubba", b: "halfdan", type: "kin", label: { en: "brothers", zh: "兄弟" }, hidden: true },
  { a: "ivar", b: "edmund_martyr", type: "conflict", label: { en: "869 · put to death", zh: "869 · 处死" } },
  { a: "ubba", b: "edmund_martyr", type: "conflict", label: { en: "869 · put to death", zh: "869 · 处死" }, hidden: true },
  { a: "halfdan", b: "alfred", type: "conflict", label: { en: "871 · war on Wessex", zh: "871 · 威塞克斯之战" } },
  { a: "alfred", b: "guthrum", type: "bond", label: { en: "878 · foe, then godson", zh: "878 · 由宿敌到教子" } },
  // I → II
  { a: "alfred", b: "aethelred2", type: "kin", label: { en: "great-great-grandson", zh: "玄孙" } },
  // II
  { a: "aethelred2", b: "sweyn", type: "conflict", label: { en: "1013 · drove him out", zh: "1013 · 逐王夺位" } },
  { a: "aethelred2", b: "emma", type: "marriage", label: { en: "1002 · married", zh: "1002 · 成婚" }, at: 0.64 },
  { a: "emma", b: "cnut", type: "marriage", label: { en: "1017 · married", zh: "1017 · 成婚" } },
  { a: "aethelred2", b: "edmund2", type: "kin", label: { en: "father & son", zh: "父子" } },
  { a: "sweyn", b: "cnut", type: "kin", label: { en: "father & son", zh: "父子" } },
  { a: "edmund2", b: "cnut", type: "conflict", label: { en: "1016 · Assandun", zh: "1016 · 阿桑顿之战" } },
  // II → III
  { a: "emma", b: "edward", type: "kin", label: { en: "mother & son", zh: "母子" } },
  // III
  { a: "edward", b: "william", type: "kin", label: { en: "kinsman · promised the crown?", zh: "表侄 · 据称许诺王位" } },
  { a: "edward", b: "harold", type: "marriage", label: { en: "brother-in-law · named heir", zh: "妻舅 · 临终托付" } },
  { a: "harold", b: "hardrada", type: "conflict", label: { en: "1066 · Stamford Bridge", zh: "1066 · 斯坦福桥" } },
  { a: "harold", b: "william", type: "conflict", label: { en: "1066 · Hastings", zh: "1066 · 黑斯廷斯" } }
];

export const FIGURE_BY_ID: Record<string, Figure> = Object.fromEntries(FIGURES.map((f) => [f.id, f]));
