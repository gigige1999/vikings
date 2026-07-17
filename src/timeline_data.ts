/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TimelineEvent {
  year: string;
  saxons: { en: string; zh: string };
  vikings: { en: string; zh: string };
  title: { en: string; zh: string };
  details: { en: string; zh: string };
}

export interface EraNode {
  id: string;
  yearRange: string;
  label: { en: string; zh: string };
  badge: string; // Icon or symbol description
  color: string; // Tailwind hex color
  accentBg: string; // hex
  subTrack: TimelineEvent[];
}

export const TIMELINE_ERAS: EraNode[] = [
  {
    id: "raid",
    yearRange: "793",
    label: { en: "Lindisfarne Sack", zh: "林迪斯法恩劫掠" },
    badge: "✝️",
    color: "#8b0000",
    accentBg: "bg-red-950/25",
    subTrack: [
      {
        year: "793 AD",
        saxons: { en: "Monastic Northumbria (King Æthelred I)", zh: "诺森布里亚修道院 (国王埃塞尔雷德一世)" },
        vikings: { en: "Norse Raiders from Hordaland", zh: "来自霍达兰的诺斯掠夺者" },
        title: { en: "The Sacrilege of Holy Island", zh: "圣岛大劫掠" },
        details: {
          en: "On June 8, 793, Norse longships quietly approached the holy island of Lindisfarne. Pagans slaughtered the helpless monks, looted gold, and burnt precious manuscripts (including early iterations of Northumbrian art). The Anglo-Saxon Chronicle recorded 'terrible portents'—whirlwinds, lightning, and fiery dragons flying in the sky—foreshadowing this catastrophic raid. This shockwave shattered Christian Europe's peace and inaugurated the Viking Age.",
          zh: "公元793年6月8日，满载诺斯战士的长船悄然驶向诺森布里亚的林迪斯法恩圣岛。异教徒洗劫了毫无防备的修道院，屠杀僧侣，掠夺大量神圣黄金与珍贵手稿。《盎格鲁-撒克逊编年史》记载，在此之前天空中曾闪现烈焰恶龙、狂风呼啸等恐怖预兆。这场对欧洲天主教信仰中心的暴行彻底震碎了基督教世界的安宁，宣告了不列颠维京时代长达数百年的血色破晓。"
        }
      }
    ]
  },
  {
    id: "resistance",
    yearRange: "802-878",
    label: { en: "Alfred's Resistance", zh: "反抗入侵" },
    badge: "🛡️",
    color: "#c8a67a",
    accentBg: "bg-amber-950/25",
    subTrack: [
      {
        year: "802-839",
        saxons: { en: "King Egbert of Wessex", zh: "威塞克斯国王埃格伯特" },
        vikings: { en: "Norse Sea Wolves", zh: "诺斯海上豺狼" },
        title: { en: "Rise of Wessex Hegemony", zh: "威塞克斯霸权崛起" },
        details: {
          en: "King Egbert established Wessex as the dominant power among the Anglo-Saxon kingdoms by winning the legendary Battle of Ellandun in 825, ending centuries of Mercian supremacy. This consolidation of southern English power under his royal line proved vital, positioning Wessex as the primary shield and the only kingdom capable of surviving the coming Viking storm.",
          zh: "公元825年，埃格伯特国王在传奇的埃兰顿战役（Battle of Ellandun）中决定性地击败麦西亚，终结了麦西亚的百年霸权，确立了威塞克斯在盎格鲁-撒克逊诸国之中的霸主地位。这一南部英格兰政权的深度整合，为日后该王室血脉成为抵御维京海啸的坚强护盾奠定了无可替代的历史基石。"
        }
      },
      {
        year: "839-858",
        saxons: { en: "King Æthelwulf of Wessex", zh: "威塞克斯国王埃塞尔沃夫" },
        vikings: { en: "Rorik of Dorestad", zh: "多雷斯塔德的罗里克" },
        title: { en: "Father of the Great King", zh: "伟大的帝国奠基人" },
        details: {
          en: "Æthelwulf, father of Alfred, was a deeply pious ruler who balanced devotion with military steel. In 851, he crushed a massive Viking invasion force at the Battle of Aclea, a slaughter the Chronicle describes as the greatest ever recorded. He also traveled on a grand pilgrimage to Rome with young Alfred, paying the first Peter's Pence and cementing ties with Pope Leo IV, which elevated Wessex's prestige across continental Europe.",
          zh: "阿尔弗雷德大帝之父埃塞尔沃夫，是一位将虔诚信仰与铁血军事完美融合的明君。公元851年，他在阿克里亚战役（Battle of Aclea）中近乎全歼了庞大的维京联军，编年史称其为“有史以来最惨烈的屠杀和胜利”。他还带着年幼的阿尔弗雷德远赴罗马进行宏大朝圣，向教皇缴纳什一税，极大地提升了威塞克斯王室在整个欧洲大陆的声望。"
        }
      },
      {
        year: "858-865",
        saxons: { en: "Kings Æthelbald & Æthelberht", zh: "国王埃塞尔巴尔德与埃塞尔伯特" },
        vikings: { en: "Early Danish Wintering Fleets", zh: "早期丹麦驻营越冬船队" },
        title: { en: "A Season of Rising Threats", zh: "维京阴云密布" },
        details: {
          en: "During this turbulent decade, the nature of Viking raids shifted ominously. Instead of hit-and-run coastal plunder, Danish forces began expanding their fleets and wintering inland (notably on the Isle of Thanet and Sheppey). Under King Æthelberht, a formidable Norse raid penetrated and sacked the historic capital of Winchester in 860, signalling that the scattered kingdoms could no longer defend themselves individually.",
          zh: "在这一动荡的十年中，维京入侵的本质发生了令人不寒而栗的改变。北欧战船不再满足于“打了就跑”的沿海洗劫，而是开始组织庞大的越冬舰队进驻内陆（如萨尼特岛和谢皮岛）。在埃塞尔伯特国王统治期间，维京大军于公元860年长驱直入洗劫了历史古都温彻斯特，向撒克逊诸国敲响了生存危机之钟。"
        }
      },
      {
        year: "865-871",
        saxons: { en: "King Æthelred I & Prince Alfred", zh: "国王埃塞尔雷德一世与阿尔弗雷德王子" },
        vikings: { en: "Ivar the Boneless & Halfdan", zh: "“无骨人”伊瓦尔与哈夫丹" },
        title: { en: "Landing of the Heathen Army", zh: "异教徒大军登陆" },
        details: {
          en: "In late 865, the 'Great Heathen Army' landed in East Anglia, led by the sons of Ragnar Lodbrok—Ivar, Halfdan, and Ubba. They captured York in 866 and executed Northumbrian Kings Ælla and Osberht. In 869, they marched south, tortured and executed King Edmund of East Anglia at Hoxne for refusing to renounce Christ. By 871, they invaded Wessex, initiating the brutal 'Year of Battles' where Æthelred and Alfred fought nine pitched engagements.",
          zh: "公元865年末，由拉格纳诸子（伊瓦尔、哈夫丹、乌巴）统帅的“异教大军”（Great Heathen Army）在东盎格利亚登陆。他们于公元866年攻破天险重镇约克，残忍处死了诺森布里亚双王。公元869年，大军南下劫掠，东盎格利亚国王埃德蒙因拒绝背弃基督被乱箭射死殉道。公元871年，维京兵锋直指威塞克斯，开启了著名的“战役之年”，阿尔弗雷德兄弟并肩浴血拼死抵抗。"
        }
      },
      {
        year: "871-899",
        saxons: { en: "King Alfred the Great", zh: "国王阿尔弗雷德大帝" },
        vikings: { en: "King Guthrum of East Anglia", zh: "东盎格利亚国王古思伦" },
        title: { en: "The Treaty of Wedmore", zh: "爱丁顿大捷与受洗" },
        details: {
          en: "Forced into exile in the Somerset marshes of Athelney, Alfred rallied his forces and won a stunning, decisive victory over Guthrum at the Battle of Edington (Ethandun) in May 878. At the subsequent Treaty of Wedmore, Guthrum agreed to withdraw from Wessex and accept baptism, with Alfred acting as his godfather. The Treaty of Alfred and Guthrum (c. 886) officially defined the Danelaw border along Watling Street, cementing Wessex's status as the last surviving bastion of Anglo-Saxon culture.",
          zh: "公元878年，被迫退守萨默塞特阿瑟尔尼沼泽的阿尔弗雷德绝地反击，在爱丁顿战役中彻底击溃了古思伦带领的维京主力。随后双方签署《威德莫尔和约》，古思伦被迫撤出威塞克斯并率领三十位将领接受基督教洗礼，阿尔弗雷德亲自担任其教父。约公元886年，双方进一步划定“丹麦法区”边界，威塞克斯成为盎格鲁-撒克逊文明在英格兰仅存的孤臣扁舟。"
        }
      }
    ]
  },
  {
    id: "expansion",
    yearRange: "899-954",
    label: { en: "Wessex Expansion", zh: "领土收复" },
    badge: "👑",
    color: "#1e4620",
    accentBg: "bg-emerald-950/25",
    subTrack: [
      {
        year: "899-924",
        saxons: { en: "King Edward the Elder & Lady Æthelflæd", zh: "国王“长者”爱德华与麦西亚女领主埃塞尔弗列塔" },
        vikings: { en: "Sigtric Caích & Midlands Lords", zh: "西格特里格·凯奇与中英格兰诺斯诸首领" },
        title: { en: "The Recapture of Mercia", zh: "收复麦西亚大区" },
        details: {
          en: "Alfred's son Edward and his brilliant daughter Æthelflæd, Lady of the Mercians, orchestrated a masterclass in grand strategy. While Æthelflæd constructed heavily fortified settlements ('burhs') and recaptured Derby (917) and Leicester (918), Edward coordinated offensive movements, slowly strangling and annexing the southern and midland Viking domains.",
          zh: "阿尔弗雷德大帝之子爱德华与其惊才绝艳的女儿——麦西亚女领主埃塞尔弗列塔，共同上演了收复失地的宏大战略大戏。女领主在麦西亚境内步步为营修筑坚固壁垒（Burhs），攻克德比（917）与莱斯特（918）；爱德华则在南部协同并进，将维京盘踞的南部和中英格兰地区逐步蚕食鲸吞。"
        }
      },
      {
        year: "918 AD",
        saxons: { en: "Lady Æthelflæd of Mercia", zh: "麦西亚女领主埃塞尔弗列塔" },
        vikings: { en: "—", zh: "—" },
        title: { en: "The Union of Saxon Realms", zh: "撒克逊国土大联合" },
        details: {
          en: "In June 918, the heroic Lady of the Mercians passed away. Though her daughter Ælfwynn was briefly acclaimed as successor, King Edward swiftly moved in, deposed her, and directly annexed the historic kingdom of Mercia into Wessex. This bloodless unification created a powerful, centralized Anglo-Saxon state capable of launch nationwide campaigns to reclaim the north.",
          zh: "公元918年6月，麦西亚的功勋女领主埃塞尔弗列塔英年早逝。虽然其女埃尔夫温曾被麦西亚贵族拥立，但威塞克斯的爱德华国王迅速出兵介入，将其罢黜并将麦西亚大区彻底合并入威塞克斯。这一并吞举措完成了撒克逊人两大主力政权的历史性合并，组建起统一北伐的铁血王权。"
        }
      },
      {
        year: "924-939",
        saxons: { en: "King Athelstan the Glorious", zh: "国王埃塞尔斯坦" },
        vikings: { en: "King Olaf Guthfrithson of Dublin", zh: "都柏林维京国王奥拉夫·古什弗里森" },
        title: { en: "The Birth of England", zh: "英格兰的诞生" },
        details: {
          en: "Athelstan, widely regarded as the first true King of England, accomplished the ultimate dream of a unified realm. In 937, he faced a massive coalition of Olaf Guthfrithson (Viking King of Dublin), Constantine II of Scotland, and Owain of Strathclyde. At the brutal Battle of Brunanburh, Athelstan won an epic victory celebrated in famous Old English poetry, securing his title as 'Rex Anglorum' (King of all England) and shaping the modern map of Britain.",
          zh: "埃塞尔斯坦被公认为英格兰历史上首位真正的国王。公元937年，面对由都柏林维京王奥拉夫、苏格兰国王康斯坦丁二世及斯特拉斯克莱德不列颠联军组成的庞大合围势力，他在极其惨烈的布鲁南伯尔战役（Battle of Brunanburh）中血战大捷。此战不仅被写进古英语叙事史诗，更终结了北方割据，奠定了英格兰王国的完整雏形。"
        }
      },
      {
        year: "939-946",
        saxons: { en: "King Edmund I", zh: "国王埃德蒙一世" },
        vikings: { en: "Olaf Cuaran & Norse Earls", zh: "奥拉夫·库阿兰与诺斯诸伯爵" },
        title: { en: "Recovery of the Five Boroughs", zh: "收复五市镇" },
        details: {
          en: "Following Athelstan's death, the Vikings briefly seized control of the North Midlands. In 942, Edmund I mounted a swift campaign and permanently reclaimed the strategically vital 'Five Boroughs' of the Danelaw: Derby, Nottingham, Lincoln, Leicester, and Stamford. This triumph was seen as liberating the Christian Anglo-Saxons of Mercia from Viking pagan oppression.",
          zh: "在埃塞尔斯坦逝世后，维京人卷土重来抢占了中部。公元942年，继位的埃德蒙一世凭借雷霆军威迅速北征，永久收复了丹麦法区的战略咽喉“五市镇”（德比、诺丁汉、林肯、莱斯特和斯坦福），彻底解救了长期受北欧异教政权盘剥的中英格兰撒克逊基督徒。"
        }
      },
      {
        year: "946-955",
        saxons: { en: "King Eadred", zh: "国王埃德雷德" },
        vikings: { en: "King Eric Bloodaxe of York", zh: "约克国王“血斧”埃里克" },
        title: { en: "The Fall of Viking York", zh: "约克维京王国的终结" },
        details: {
          en: "The Norse Kingdom of York (Jórvík) had stood for decades as a beacon of Viking power. In 954, King Eadred's forces coordinated with Northumbrian factions to expel its notorious last king, the Norwegian exile Eric Bloodaxe (Eiríkr Blóðøx). Eric was betrayed and slain in the bleak wilderness of Stainmore, marking the permanent collapse of independent Scandinavian kingdoms in northern England.",
          zh: "作为不列颠维京王权的最后一座孤堡，约克维京王国（Jórvík）已傲立多年。公元954年，埃德雷德一世联络诺森布里亚贵族里应外合，驱逐了恶名昭彰的末代维京国王——挪威“血斧”埃里克。埃里克随后在冷冽荒芜的斯坦莫尔（Stainmore）遇刺身亡，宣告了北欧斯堪的纳维亚人在英格兰北部的独立割据时代彻底划上句号。"
        }
      }
    ]
  },
  {
    id: "peak",
    yearRange: "973",
    label: { en: "Golden Coronation", zh: "黄金加冕盛世" },
    badge: "🏛️",
    color: "#5d3a7c",
    accentBg: "bg-purple-950/25",
    subTrack: [
      {
        year: "955-959",
        saxons: { en: "King Eadwig All-Fair", zh: "国王埃德威格" },
        vikings: { en: "Scandinavians of the North", zh: "北方的斯堪的纳维亚臣民" },
        title: { en: "The Divided Realm", zh: "割裂的分治统治" },
        details: {
          en: "Eadwig's brief reign was marked by intense political strife with Abbot Dunstan of Glastonbury. This conflict fractured the realm, leading the Mercian and Northumbrian elites to rebel in 957 and declare Eadwig's younger brother Edgar as their king, temporarily splitting England until Eadwig's untimely death in 959.",
          zh: "埃德威格年轻英俊但任性，其短暂的统治因与修道院院长邓斯坦等重臣产生剧烈政治党争而分崩离析。公元957年，不堪重负的麦西亚与诺森布里亚贵族悍然反叛，拥立其弟埃德加为王。英格兰一度陷入南北分治，直至埃德威格在公元959年离奇暴毙。"
        }
      },
      {
        year: "959-975",
        saxons: { en: "King Edgar the Peaceful", zh: "国王埃德加和平王" },
        vikings: { en: "King Kenneth II of Scotland", zh: "苏格兰国王肯尼思二世" },
        title: { en: "Zenith of Medieval England", zh: "帝国的巅峰荣光" },
        details: {
          en: "Edgar's reign was a golden age of peace, monastic revival, and uncontested sovereign power. In 973, he staged a magnificent, highly ritualized coronation at Bath Abbey. Shortly after, he sailed his fleet to Chester on the Welsh border, where eight Celtic client kings—including Kenneth II of Scotland and Malcolm of Strathclyde—ceremonially rowed Edgar in his state barge down the River Dee, demonstrating absolute submission to the Emperor of Britain.",
          zh: "埃德加统治时期被史家赞誉为中世纪撒克逊帝国的“黄金和平盛世”。公元973年，他在巴斯大修道院举行了奠定不列颠王权仪轨的宏大加冕典礼。随后，他率庞大舰队巡航至切斯特，威尔士与苏格兰的八位臣属君王（包括苏格兰王肯尼思二世与斯特拉斯克莱德王马尔科姆）在切斯特附近的迪河（River Dee）上亲自为埃德加荡桨撑船，将威塞克斯王朝的帝国尊严推向了极盛巅峰。"
        }
      }
    ]
  },
  {
    id: "danegeld",
    yearRange: "991-1013",
    label: { en: "Danegeld & Silver", zh: "丹麦金与动荡" },
    badge: "🪙",
    color: "#708090",
    accentBg: "bg-slate-900/25",
    subTrack: [
      {
        year: "975-978",
        saxons: { en: "King Edward the Martyr", zh: "国王“殉教者”爱德华" },
        vikings: { en: "—", zh: "—" },
        title: { en: "Assassination at Corfe Castle", zh: "科夫城堡谋杀案" },
        details: {
          en: "The teenage King Edward was brutally stabbed to death in March 978 while visiting his half-brother Æthelred and his politically ambitious stepmother Ælfthryth at Corfe Castle in Dorset. The shocking murder of an anointed king shattered royal authority, split the Saxon nobility into bitter factions, and was quickly interpreted as a divine curse that invited renewed Viking scourges.",
          zh: "公元978年3月，年仅十余岁的爱德华国王在前往多塞特郡的科夫城堡（Corfe Castle）探望半血缘弟弟埃塞尔雷德及继母埃尔夫斯里丝时，在马背上惨遭刺杀。这场弑君惨案极大动摇了王室神圣威权，撒克逊贵族陷入了残酷的内部清算和信任危机，被同时代人视为招致神谴和维京噩梦卷土重来的不祥之兆。"
        }
      },
      {
        year: "978-1013",
        saxons: { en: "King Æthelred II the Unready", zh: "国王“决策无方者”埃塞尔雷德二世" },
        vikings: { en: "King Sweyn Forkbeard of Denmark", zh: "丹麦国王“八字胡”斯韦恩" },
        title: { en: "The Tax of Extortion", zh: "血腥的买路财：丹麦金" },
        details: {
          en: "Reigning with poor counsel ('unready' from 'unræd' - 'no counsel'), Æthelred faced devastating raids. In 1002, he ordered the St. Brice's Day Massacre of all Danes in England, which enraged King Sweyn Forkbeard of Denmark. Sweyn launched a relentless war of revenge, extracting millions of silver coins (Danegeld) from English taxpayers. In 1013, Sweyn mounted a full invasion, captured London, and chased Æthelred into exile in Normandy.",
          zh: "埃塞尔雷德二世因执政“决策无方”（古英语“Unræd”，意为缺乏良谋）而备受诟病。公元1002年，他愚蠢下令大肆屠杀英格兰境内的丹麦定居者（圣布赖斯日大屠杀），彻底激怒了丹麦国王“八字胡”斯韦恩。斯韦恩发动灭国级复仇战争，逼迫撒克逊人每年征收重税上缴巨额赎金（丹麦金）。公元1013年，斯韦恩长驱直入攻陷伦敦，将流亡的埃塞尔雷德逐至诺曼底。"
        }
      }
    ]
  },
  {
    id: "empire",
    yearRange: "1016",
    label: { en: "Cnut's Empire", zh: "克努特北海帝国" },
    badge: "👑",
    color: "#0f4c81",
    accentBg: "bg-sky-950/25",
    subTrack: [
      {
        year: "1013-1014",
        saxons: { en: "House of Wessex in Exile", zh: "威塞克斯王室流亡" },
        vikings: { en: "King Sweyn Forkbeard", zh: "国王“八字胡”斯韦恩" },
        title: { en: "The First Danish Sovereign", zh: "第一位丹麦裔征服王" },
        details: {
          en: "Sweyn Forkbeard was declared King of England in December 1013, becoming the first Viking sovereign to rule the entire nation. However, his historic reign lasted only five weeks before he died suddenly at Gainsborough in February 1014, leaving England in a state of chaotic, bloody succession wars between his son Cnut and the returning Æthelred.",
          zh: "公元1013年12月，斯韦恩被宣布为全英格兰之王，成为英国历史上首位北欧异族征服王。然而，他的历史性统治仅维持了短短五周——公元1014年2月，他在利肯郡的盖恩斯伯勒突然暴毙，英格兰随之陷入其幼子克努特与卷土重来的撒克逊旧主之间更加血腥的内战风暴中。"
        }
      },
      {
        year: "1014-1016",
        saxons: { en: "King Edmund II Ironside", zh: "国王“刚勇者”埃德蒙二世" },
        vikings: { en: "King Cnut the Great", zh: "国王克努特大帝" },
        title: { en: "The Battle of Assandun", zh: "阿桑顿决战" },
        details: {
          en: "Edmund 'Ironside' fought with legendary, near-superhuman courage, rallying the Saxon defense through five pitch battles in 1016. However, at the decisive Battle of Assandun (Essex) in October, the traitorous ealdorman Eadric Streona deserted the Saxon shield wall. Edmund was defeated, forced to partition England with Cnut, and died mysteriously in November 1016, allowing Cnut to rightfully claim the crown of all England.",
          zh: "威塞克斯末日雄主埃德蒙二世在1016年通过五场血战力挽狂澜，因英勇无畏被尊为“刚勇者”。然而在1016年10月的阿桑顿决战（Battle of Assandun）中，叛变领主埃德里克·斯特里奥纳临阵脱逃，导致撒克逊盾墙崩溃。埃德蒙被迫与克努特割地分治，并于同年11月离奇暴毙，年轻的克努特大帝顺理成章独掌江山。"
        }
      },
      {
        year: "1016-1035",
        saxons: { en: "— (Saxon Royal Line Suppressed)", zh: "— (撒克逊王室受压制)" },
        vikings: { en: "King Cnut the Great", zh: "国王克努特大帝" },
        title: { en: "Zenith of the North Sea", zh: "北海帝国的黄金盛世" },
        details: {
          en: "Cnut proved to be one of England's most effective and respected monarchs. He established the 'North Sea Empire'—uniting England, Denmark, and Norway in a maritime superpower. Ruling as a devout Christian king, Cnut protected monasteries, promoted trade, secured safe-passage treaties with European emperors for English pilgrims, and earned historical renown by showing his courtiers that even a great king cannot command the ocean tides.",
          zh: "克努特证明了自己是不列颠历史上最杰出、最受爱戴的英主之一。他一手締造了囊括英格兰、丹麦和挪威的“北海帝国”（North Sea Empire）。他皈依基督教、广修教堂、促进跨海贸易、保护修道院，并在罗马同欧洲皇帝和教皇签订互惠条约，其著名的“潮汐训臣”故事（向谄媚的朝臣展示帝王亦无法抗拒大自然神圣规律）使其名留青史。"
        }
      }
    ]
  },
  {
    id: "collapse",
    yearRange: "1035-1042",
    label: { en: "Imperial Fracture", zh: "帝国的瓦解与复辟" },
    badge: "⛓️",
    color: "#333333",
    accentBg: "bg-stone-900/40",
    subTrack: [
      {
        year: "1035-1040",
        saxons: { en: "Alfred Atheling (Assassinated)", zh: "阿尔弗雷德·艾塞林" },
        vikings: { en: "Kings Harold Harefoot & Harthacnut", zh: "国王“兔足”哈罗德与哈德克努特" },
        title: { en: "The Royal Succession Dispute", zh: "兄弟内耗与帝国分裂" },
        details: {
          en: "Following Cnut's death, his sons Harold Harefoot and Harthacnut squabbled viciously over the succession. In 1036, Harold Harefoot captured and blinded Cnut's stepson Alfred Atheling (Wessex claimant), who died of his wounds. When Harthacnut took sole power, he was so vindictive he ordered Harold's corpse exhumed and cast into a Thames ditch. Heavy taxes, brutality, and internal civil wars completely fractured Cnut's grand North Sea union.",
          zh: "克努特大帝逝世后，其子嗣“兔足”哈罗德与哈德克努特爆发了恶劣的夺权内讧。公元1036年，哈罗德设计擒获并挖去了流亡回国的撒克逊王室继承人阿尔弗雷德的眼睛，致其惨死。哈德克努特复仇执政后，甚至将哈罗德的尸体从坟墓中掘出扔入泰晤士河沼泽。暴政与横征暴敛导致庞大的北海帝国在数年内彻底分崩离析。"
        }
      },
      {
        year: "1042-1066",
        saxons: { en: "King Edward the Confessor", zh: "国王“忏悔者”爱德华" },
        vikings: { en: "— (Danish Rule Dissolved)", zh: "— (丹麦统治解体)" },
        title: { en: "Restoration of the Saxon Line", zh: "威塞克斯王朝的复辟" },
        details: {
          en: "With Harthacnut collapsing dead at a wedding feast, the ancient Saxon royal line was restored under Edward, son of Æthelred II. Having spent his youth in Norman exile, Edward was deeply pious, favored Norman advisors, and spent his reign building the magnificent Westminster Abbey. However, his childless state and political reliance on the powerful Godwin family created a dangerous succession vacuum that set up the apocalyptic crisis of 1066.",
          zh: "随着哈德克努特在一场婚礼宴席上因暴饮暴食猝死，不列颠古老的撒克逊王室血统在埃塞尔雷德二世之子——“忏悔者”爱德华治下得以复辟。因长期流亡诺曼底，爱德华极度偏袒诺曼幕僚，其毕生精力均用于修筑宏伟的威斯敏斯特大教堂。由于他终生无嗣且朝廷被权臣戈德温家族把持，这一权力中空为1066年英格兰的血雨腥风埋下了导火索。"
        }
      }
    ]
  },
  {
    id: "ending",
    yearRange: "1066",
    label: { en: "Twilight of Vikings", zh: "维京时代的黄昏" },
    badge: "🪓",
    color: "#b22222",
    accentBg: "bg-red-950/30",
    subTrack: [
      {
        year: "1066 Sep",
        saxons: { en: "King Harold Godwinson", zh: "国王哈罗德·戈德温森" },
        vikings: { en: "King Harald Hardrada of Norway", zh: "挪威国王“无情者”哈拉尔" },
        title: { en: "Battle of Stamford Bridge", zh: "斯坦福桥战役：众神黄昏" },
        details: {
          en: "In September 1066, Norwegian King Harald Hardrada, the legendary 'last great Viking hard-ruler,' invaded Northumbria. Hearing the news, Saxon King Harold Godwinson marched his elite housecarls 185 miles in just four days, surprising the Vikings at Stamford Bridge. In a brutal melee, the Norse shield wall was shattered, and Hardrada was slain by an arrow to the neck. The direct Viking military threat to England was ended forever.",
          zh: "公元1066年9月，被称为“欧洲最后一个维京无情硬汉”的挪威国王哈拉尔（哈德拉达）起兵入侵英格兰北方。刚登基的撒克逊国王哈罗德·戈德温森率精锐皇家卫队在短短4天内急行军185英里，发动了人类军事史上最著名的斯坦福桥突袭战。混战中哈拉尔喉部中箭阵亡，维京盾墙彻底崩溃。长达近三百年的维京军事入侵威胁就此画上永久句号。"
        }
      },
      {
        year: "1066 Oct",
        saxons: { en: "King Harold Godwinson (Slain)", zh: "国王哈罗德·戈德温森 (阵亡)" },
        vikings: { en: "Duke William of Normandy", zh: "诺曼底公爵威廉" },
        title: { en: "The Battle of Hastings", zh: "黑斯廷斯战役：诺曼征服" },
        details: {
          en: "Exhausted and depleted from defeating the Vikings at Stamford Bridge, King Harold rushed his tired army 250 miles south to meet the invading Norman fleet led by Duke William (descendant of Rollo's Vikings). On October 14, 1066, on Senlac Hill near Hastings, the Saxon shield wall held for hours until feigned retreats broke their lines. Harold was slain—famously depicted in the Bayeux Tapestry—bringing Saxon England to a dramatic close and birthing Norman-French England.",
          zh: "刚在斯坦福桥拼死力战、人困马乏的哈罗德被迫日夜兼程南下250英里，迎击来自诺曼底的征服者威廉（实为定居法国的维京人后裔）。公元1066年10月14日，两军在黑斯廷斯展开了改变欧洲历史的惨烈决战。坚挺一整天的撒克逊盾墙在诺曼骑士的佯败诱敌中瓦解，哈罗德眼睛中箭殉国（如著名黑斯廷斯贝叶挂毯所绘），宣告盎格鲁-撒克逊时代落幕，诺曼征服揭开了英格兰历史新篇章。"
        }
      }
    ]
  }
];
