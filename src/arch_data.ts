/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Architecture chapter, page 1: how Viking-age building changed (c. 800–1066),
 * with a labelled diagram for each stage. Claims follow excavated sites
 * (Borg, Jarlshof, Ribblehead, Coppergate/York) and surviving monuments
 * (Gosforth Cross, hogbacks, Kirkdale sundial, Barton-upon-Humber).
 */

type L = { en: string; zh: string };

export interface ArchSpot {
  n: number;
  x: number; // diagram coordinates (viewBox 320 × 210)
  y: number;
  name: L;
  text: L;
}

export interface ArchEra {
  id: "longhouse" | "island" | "town" | "stone";
  years: string;
  rune: string;
  color: string;
  title: L;
  diagram: L;
  text: L;
  points: L[];
  evidence: L;
  spots: ArchSpot[];
}

export const ARCH_W = 320;
export const ARCH_H = 210;

export const ARCH_ERAS: ArchEra[] = [
  {
    id: "longhouse",
    years: "c. 800–900",
    rune: "ᚼ",
    color: "#8a6a3a",
    title: { en: "The Longhouse of the Homeland", zh: "故土长屋：人畜同屋" },
    diagram: { en: "Longhouse · cutaway", zh: "长屋 · 纵剖面" },
    text: {
      en: "The heart of a Scandinavian farm was the longhouse (langhús), anything from about fifteen to several dozen metres long. Its long walls often bowed gently outward, giving it a boat-like plan. Two rows of stout posts carried the roof, dividing the inside into a central hall and side aisles; down the middle ran a long hearth, flanked by raised benches of earth and timber. Many longhouses had a byre partitioned off at one end, so that in winter people and cattle lived under one roof and the animals' warmth helped heat the house. Walls used what was to hand: posts and wattle-and-daub in Denmark, stone and turf in Norway and Iceland.",
      zh: "斯堪的纳维亚农庄的核心是长屋（langhús），长度从十几米到数十米不等。两侧长墙常微微向外弯出，平面略呈船形。屋内两排粗木柱承托屋顶，把空间分为中间的厅堂和两侧的侧廊；中央是长条形火塘，两侧是夯土加木板的坐卧台。许多长屋在一端隔出牲畜棚，冬天人与牛羊同住一个屋檐下，牲畜的体温也为屋子添暖。墙体因地取材：丹麦多用木柱与篱笆抹泥，挪威与冰岛则常以石块和草皮垒砌。"
    },
    points: [
      { en: "Bow-sided, boat-like plan", zh: "弓形长墙、船形平面" },
      { en: "Two rows of roof posts", zh: "两排内柱承重" },
      { en: "People and cattle under one roof", zh: "人畜同屋" }
    ],
    evidence: {
      en: "The chieftain's longhouse at Borg in the Lofoten Islands, Norway, was about 83 m long — one of the largest Viking-age buildings yet excavated.",
      zh: "挪威罗弗敦群岛博格遗址的首领长屋长约83米，是迄今发掘出的最大维京时代建筑之一。"
    },
    spots: [
      { n: 1, x: 230, y: 100, name: { en: "Turf or thatch roof", zh: "草皮或茅草屋顶" }, text: { en: "Thick layers of thatch, reed or rooted turf kept out the rain and held in the heat.", zh: "屋顶铺着厚厚的茅草、芦苇或带根草皮，既挡雨又保暖。" } },
      { n: 2, x: 95, y: 140, name: { en: "Roof-bearing posts", zh: "两排内柱" }, text: { en: "Paired posts took the weight of the roof and split the space into a hall and two aisles, so the outer walls did not have to carry it all.", zh: "成对的粗木柱承托屋顶，把屋内分成中厅与两侧侧廊，外墙因此不必承受全部重量。" } },
      { n: 3, x: 196, y: 180, name: { en: "Long hearth", zh: "中央长火塘" }, text: { en: "A stone-kerbed fire running down the centre: the house's only heating, light and kitchen.", zh: "石块围成的长条火塘，是全屋唯一的取暖、照明与烹饪之所。" } },
      { n: 4, x: 100, y: 174, name: { en: "Side benches", zh: "两侧坐卧台" }, text: { en: "Raised platforms of earth faced with planks: seats for work by day, beds spread with skins by night.", zh: "高出地面的夯土平台，以木板包边；白天坐着劳作，夜里铺上毛皮就是床铺。" } },
      { n: 5, x: 272, y: 148, name: { en: "Byre", zh: "牲畜棚" }, text: { en: "Stalls partitioned off at one end, where cattle were stalled through the winter.", zh: "长屋一端隔出的畜栏，冬季牛只就圈在屋内。" } },
      { n: 6, x: 160, y: 76, name: { en: "Smoke hole", zh: "烟孔" }, text: { en: "There was no chimney. Smoke drifted out through a hole in the roof, smoking the meat and fish hung from the beams on its way.", zh: "长屋没有烟囱，烟从屋顶的烟孔慢慢散出，顺带熏干挂在梁上的肉与鱼。" } },
      { n: 7, x: 106, y: 16, name: { en: "Boat-shaped plan", zh: "船形平面" }, text: { en: "Seen from above, the long walls bow outward and the posts stand in two rows.", zh: "从上方看，两侧长墙向外弯出，内柱排成两行。" } }
    ]
  },
  {
    id: "island",
    years: "c. 870–1000",
    rune: "ᛋ",
    color: "#5e6b38",
    title: { en: "Farmsteads of the Isles", zh: "海岛农庄：石墙草顶" },
    diagram: { en: "Island longhouse · cross-section", zh: "海岛长屋 · 横剖面" },
    text: {
      en: "Settlers carried the longhouse across the sea. On the nearly treeless islands of Shetland, Orkney and the Hebrides they built thick walls of two drystone faces packed with earth and turf. The roof rafters were scarce timber — often driftwood, or wood shipped in from elsewhere — covered with turf. In the Danelaw of England, rural houses were mostly timber-built, smaller than the great halls of the homeland, set in enclosed yards with outbuildings, and in time hard to tell from their English neighbours'.",
      zh: "越海而来的定居者把长屋带到了不列颠。在设得兰、奥克尼与赫布里底这些几乎不长树的海岛上，他们用内外两层干砌石块夹填泥土与草皮，垒成厚墙；屋椽用的是稀缺的木材——常是漂流木或从外地运来的木料——上面再盖上草皮。在英格兰的丹麦法区，乡村住宅多为木构，比故乡的大长屋小，常围出院落并附带小屋，久而久之与撒克逊邻居的房子已难以分辨。"
    },
    points: [
      { en: "Stone-faced walls with an earth core", zh: "双层石墙夹土芯" },
      { en: "Turf over precious timber", zh: "珍贵木椽上覆草皮" },
      { en: "Smaller farms in the Danelaw", zh: "丹麦法区农舍趋小" }
    ],
    evidence: {
      en: "Jarlshof in Shetland preserves the stone footings of Norse longhouses from the ninth century on; at Ribblehead in North Yorkshire a farmstead with stone-and-rubble walls was dated by coins of the 860s.",
      zh: "设得兰的贾尔斯霍夫遗址保存着九世纪以来诺斯长屋的石墙基；北约克郡里布尔黑德遗址发现了一座石墙农庄，出土钱币显示其年代约在860年代。"
    },
    spots: [
      { n: 1, x: 58, y: 165, name: { en: "Earth-cored wall", zh: "石夹土芯厚墙" }, text: { en: "Two faces of drystone with earth and turf rammed between — often well over a metre thick, proof against the island gales.", zh: "内外两层干砌石块，中间夯填泥土与草皮，厚度常超过一米，足以抵挡海岛狂风。" } },
      { n: 2, x: 100, y: 98, name: { en: "Turf roof", zh: "草皮屋顶" }, text: { en: "Turf cut in strips and laid over the rafters, grass side up: heavy, but warm and windproof.", zh: "切成条块的草皮铺在椽子上，草面朝上；虽然沉重，却保暖防风。" } },
      { n: 3, x: 226, y: 116, name: { en: "Precious rafters", zh: "珍贵的木椽" }, text: { en: "With few trees on the islands, roof timber was often driftwood or brought in by ship, and was reused whenever a house was rebuilt.", zh: "海岛少树，屋架木材常是漂流木或靠船运来，房屋翻修时也会拆下重复使用。" } },
      { n: 4, x: 118, y: 140, name: { en: "Inner posts", zh: "内柱" }, text: { en: "Two rows of posts, as in the homeland, carried the heavy turf roof.", zh: "和故乡一样，两排内柱承托着沉重的草皮屋顶。" } },
      { n: 5, x: 160, y: 164, name: { en: "Hearth and benches", zh: "火塘与坐卧台" }, text: { en: "The long hearth in the centre and the raised benches along the walls stayed the core of family life.", zh: "中央长火塘与沿墙的坐卧台，依旧是一家人生活的中心。" } }
    ]
  },
  {
    id: "town",
    years: "c. 930–1066",
    rune: "ᛃ",
    color: "#7d1d18",
    title: { en: "Jórvík: Narrow Houses on the Street", zh: "约维克：沿街的狭长木屋" },
    diagram: { en: "Coppergate · street front, one house cut away", zh: "科珀盖特街 · 临街立面（中屋剖切）" },
    text: {
      en: "In towns such as Jórvík (York), land was tight and the longhouse gave way to narrow plots along the street. Excavation at Coppergate showed the ground divided by wattle fences from about 930, with houses set gable-end to the street, workshops and shops at the front and wells, rubbish pits and cesspits in the yards behind. The first houses had walls of posts and woven wattle; from about 975 they were replaced by buildings sunk more than a metre into the ground, walled with oak planks held between upright posts. Wood-turners, leather-workers, comb-makers and jewellers worked here, and turned wooden cups and bowls were a speciality.",
      zh: "在约维克（今约克）这样的城镇里，地皮紧张，长屋让位给沿街排列的狭长地块。科珀盖特街的发掘显示，约930年起这里以篱笆划分地块，房屋山墙朝向街道，前部是作坊与店面，后院有水井、垃圾坑与粪坑。最早的房屋以立柱为骨、编织枝条抹泥为墙；约975年后，取而代之的是向地下挖深一米多、用立柱夹住橡木厚板筑墙的半地下建筑。镟木匠、皮匠、梳篦匠与首饰匠在此劳作，镟制的木杯木碗更是这里的特色。"
    },
    points: [
      { en: "Narrow plots, gables to the street", zh: "狭长地块、山墙朝街" },
      { en: "Wattle walls give way to oak planks", zh: "篱笆墙让位于橡木板墙" },
      { en: "Workshop in front, yard behind", zh: "前店后院" }
    ],
    evidence: {
      en: "York Archaeological Trust's dig at Coppergate (1976–1981): waterlogged, airless soil preserved timber, wattle, textiles and leather shoes for a thousand years. The site became the JORVIK Viking Centre.",
      zh: "约克考古信托1976–1981年在科珀盖特的发掘：潮湿缺氧的土层让木板、篱笆、织物乃至皮鞋保存了千年，遗址后来建成约维克维京中心。"
    },
    spots: [
      { n: 1, x: 60, y: 86, name: { en: "Gable to the street", zh: "山墙朝街" }, text: { en: "Plots were narrow, so each house turned its narrow gable end to the street, one beside the next.", zh: "地块狭窄，房屋以窄窄的山墙朝向街道，一户紧挨一户。" } },
      { n: 2, x: 36, y: 134, name: { en: "Post-and-wattle wall", zh: "篱笆抹泥墙" }, text: { en: "The earlier houses: upright posts with rods woven between them, the gaps daubed with clay.", zh: "较早的房屋以立柱为骨，柱间编织枝条，再抹上黏土。" } },
      { n: 3, x: 240, y: 130, name: { en: "Oak-plank wall", zh: "橡木厚板墙" }, text: { en: "From about 975: horizontal oak planks slotted between upright posts — sturdier and longer-lasting.", zh: "约975年后的新式房屋：横放的橡木厚板嵌在立柱之间，更坚固耐久。" } },
      { n: 4, x: 188, y: 180, name: { en: "Sunken floor", zh: "半地下层" }, text: { en: "The floor was dug more than a metre below ground. It may have served as a cellar or workroom, perhaps with a floor above.", zh: "地面向下挖深一米多，可能用作地窖或作坊，上方或许另有楼层。" } },
      { n: 5, x: 160, y: 122, name: { en: "Workshop and shop", zh: "作坊与店面" }, text: { en: "Craftsmen made and sold their wares here: turned cups and bowls, combs of antler, leather goods, metalwork.", zh: "工匠在此制作并出售货品：镟木杯碗、鹿角梳、皮具与金属器。" } },
      { n: 6, x: 110, y: 140, name: { en: "Plot fence", zh: "地块篱笆" }, text: { en: "Woven wattle fences marked each plot's boundary, running back to the yard.", zh: "编织的篱笆划清各户地块的边界，一直延伸到后院。" } },
      { n: 7, x: 284, y: 186, name: { en: "Waterlogged soil", zh: "潮湿缺氧的土层" }, text: { en: "Sealed from the air, the wet ground stopped wood, leather and cloth from rotting — an archaeologist's treasure house.", zh: "隔绝空气的湿土让木材、皮革与织物千年不腐，是考古学家的宝库。" } }
    ]
  },
  {
    id: "stone",
    years: "c. 920–1066",
    rune: "†",
    color: "#34557a",
    title: { en: "Stone and the Cross", zh: "石与十字：皈依之后" },
    diagram: { en: "Late Anglo-Saxon church and churchyard", zh: "晚期撒克逊教堂与墓园" },
    text: {
      en: "From the tenth century, Anglo-Scandinavian lords who had become Christian raised stone crosses and “hogbacks” across northern England. A hogback is a grave-stone shaped like a longhouse, with a curved ridge, a roof carved with shingle-like scales, and often a bear clasping each end. The Gosforth Cross in Cumbria, about 4.4 m of red sandstone, sets scenes of Ragnarök beside the Crucifixion. In the eleventh century more and more village churches were rebuilt in stone. Over the door of St Gregory's at Kirkdale in Yorkshire, a sundial records that Orm, son of Gamal, rebuilt the minster from the ground “in the days of King Edward and in the days of Earl Tosti” — a Viking descendant building Christ a house of stone.",
      zh: "十世纪起，皈依基督教的盎格鲁-斯堪的纳维亚贵族在北英格兰竖起石十字架与“狗背碑”。狗背碑是一种形似长屋的石墓碑：屋脊拱起，屋面刻着瓦片般的鳞纹，两端常雕有抱住墓碑的熊。坎布里亚郡的戈斯福斯十字架高约4.4米，以红砂岩雕成，把诸神黄昏的场景与基督受难并置。到了十一世纪，越来越多的乡村教堂改以石砌。约克郡柯克代尔圣格里高利教堂门上的日晷铭文写道，加梅尔之子奥姆“在爱德华王与托斯蒂伯爵之时”从地基重建了这座教堂——一位维京后裔，用石头为基督建起了家。"
    },
    points: [
      { en: "Stone crosses and hogbacks", zh: "石十字架与狗背碑" },
      { en: "Pagan myth beside the Gospel", zh: "神话与福音同刻一石" },
      { en: "Churches rebuilt in stone", zh: "教堂改以石砌" }
    ],
    evidence: {
      en: "The Kirkdale sundial (c. 1055–1065) carries one of the most complete Old English inscriptions to survive. The Earl Tosti it names is Tostig Godwinson, Harold's brother.",
      zh: "柯克代尔日晷（约1055–1065年）是现存最完整的古英语铭文之一；铭文中的托斯蒂伯爵，正是哈罗德·戈德温森的弟弟托斯蒂格。"
    },
    spots: [
      { n: 1, x: 56, y: 106, name: { en: "West tower", zh: "西塔楼" }, text: { en: "Many late Anglo-Saxon churches in the old Danelaw, especially in Lincolnshire, have stone west towers with paired arched belfry openings and “long-and-short” corner stones. The tower of St Peter's at Barton-upon-Humber dates from around 1000.", zh: "原丹麦法区（尤其林肯郡）的许多晚期撒克逊教堂建有石砌西塔楼，开着成对的拱形钟窗，墙角是长短交错的隅石。巴顿昂亨伯圣彼得教堂的塔楼可追溯到约公元1000年。" } },
      { n: 2, x: 100, y: 162, name: { en: "Stone nave", zh: "石砌中殿" }, text: { en: "Thick walls of roughly coursed stone, with small round-headed windows set high up.", zh: "粗石砌成的厚墙，开着高而小的圆拱窗。" } },
      { n: 3, x: 242, y: 166, name: { en: "Chancel", zh: "圣坛" }, text: { en: "The smaller, lower eastern end that held the altar.", zh: "东端较矮小的部分，是安放祭坛的地方。" } },
      { n: 4, x: 138, y: 142, name: { en: "Sundial inscription", zh: "日晷铭文" }, text: { en: "At Kirkdale, a sundial over the door records in Old English how Orm, son of Gamal, bought the ruined minster and rebuilt it.", zh: "柯克代尔教堂门上的日晷以古英语记下：加梅尔之子奥姆买下这座残破的教堂，并将其重建。" } },
      { n: 5, x: 290, y: 132, name: { en: "Stone cross", zh: "石十字架" }, text: { en: "Like the Gosforth Cross: a tall shaft carved with interlace and beasts, topped by a ring-head.", zh: "如戈斯福斯十字架：高耸的柱身刻满缠枝纹与异兽，顶端是带环的十字。" } },
      { n: 6, x: 231, y: 190, name: { en: "Hogback stone", zh: "狗背碑" }, text: { en: "A grave-cover carved as a little longhouse — a curved ridge, a scaled roof and end-beasts — found mainly in northern England and southern Scotland.", zh: "雕成小长屋模样的墓碑：拱起的屋脊、鳞纹屋面与两端的兽像，主要见于北英格兰与苏格兰南部。" } }
    ]
  }
];
