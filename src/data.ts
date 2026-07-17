/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter } from "./types";

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: "timeline",
    gothicTitle: "The Chronicle of Kings and Raiders",
    englishTitle: "Timeline & Royal Chronicle",
    runicSubtitle: "ᛏᚼᛅ ᚴᚼᚱᚢᚾᛁᚴᛚᛅ",
    era: "793 - 1066 AD",
    summary: "Chronology of raids, treaties, and the struggle for the crown of England.",
    paragraphs: [
      "In the year 793, terrifying portents appeared over Northumbria: immense sheets of light rushing through the air, and whirlwinds, and fiery dragons flying across the firmament. Soon after, on the sixth of June, the ravaging of heathen men lamentably destroyed God's church on Lindisfarne island through rapine and slaughter.",
      "This savage raid marked the dawn of the Viking Age in Britain. For decades, the Northmen struck like lightning, plundering coastal monasteries and fleeing back across the sea-road. But in 865, the nature of the threat shifted. No longer content with gold and silver, the 'Great Heathen Army' landed in East Anglia, seeking land to conquer, farm, and rule.",
      "Only Wessex, under the wise and resilient leadership of King Alfred the Great, withstood the pagan storm. Through the Treaty of Wedmore in 878, Alfred drew a boundary dividing England: the Danelaw in the north and east under Viking law, and Saxon Wessex in the south. Yet this peace was transient, culminating in the complete rule of Cnut the Great, and ending at the bloody Battle of Stamford Bridge in 1066."
    ],
    defaultImage: "/src/assets/images/viking_timeline_1784019399632.jpg",
    hotspots: [
      {
        id: "lindisfarne",
        name: "Lindisfarne Holy Island",
        description: "A sacred tidal island off the northeast coast of England. Its wealthy monastery, dedicated to St. Cuthbert, was sacked in 793, sending shockwaves of terror through Christian Europe.",
        x: 48,
        y: 22
      },
      {
        id: "heathen_army",
        name: "The Great Heathen Army",
        description: "An immense coalition of Norse warriors, primarily from Denmark and Norway, who landed in 865. Instead of raiding, they came to conquer and settle the Anglo-Saxon kingdoms.",
        x: 32,
        y: 45
      },
      {
        id: "alfred_great",
        name: "Alfred the Great",
        description: "King of Wessex (871-899) who defended England against the Vikings, instituted military burhs (fortified towns), and established the historic Danelaw border.",
        x: 72,
        y: 62
      },
      {
        id: "danelaw",
        name: "The Danelaw",
        description: "The historic region of northern and eastern England where the laws and customs of the Danes dominated, spanning from Yorkshire down to East Anglia.",
        x: 55,
        y: 80
      }
    ],
    pages: [
      {
        id: "chronicle_intro",
        title: "The Scriptorium Chronicle",
        paragraphs: [
          "In the year 793, terrifying portents appeared over Northumbria: immense sheets of light rushing through the air, and whirlwinds, and fiery dragons flying across the firmament. Soon after, on the sixth of June, the ravaging of heathen men lamentably destroyed God's church on Lindisfarne island through rapine and slaughter.",
          "This savage raid marked the dawn of the Viking Age in Britain. For decades, the Northmen struck like lightning, plundering coastal monasteries and fleeing back across the sea-road. But in 865, the nature of the threat shifted. No longer content with gold and silver, the 'Great Heathen Army' landed in East Anglia, seeking land to conquer, farm, and rule.",
          "Only Wessex, under the wise and resilient leadership of King Alfred the Great, withstood the pagan storm. Through the Treaty of Wedmore in 878, Alfred drew a boundary dividing England: the Danelaw in the north and east under Viking law, and Saxon Wessex in the south."
        ],
        image: "/src/assets/images/viking_timeline_1784019399632.jpg",
        hotspots: [
          {
            id: "lindisfarne",
            name: "Lindisfarne Holy Island",
            description: "A sacred tidal island off the northeast coast of England. Its wealthy monastery, dedicated to St. Cuthbert, was sacked in 793, sending shockwaves of terror through Christian Europe.",
            x: 48,
            y: 22
          },
          {
            id: "heathen_army",
            name: "The Great Heathen Army",
            description: "An immense coalition of Norse warriors, primarily from Denmark and Norway, who landed in 865. Instead of raiding, they came to conquer and settle the Anglo-Saxon kingdoms.",
            x: 32,
            y: 45
          },
          {
            id: "alfred_great",
            name: "Alfred the Great",
            description: "King of Wessex (871-899) who defended England against the Vikings, instituted military burhs (fortified towns), and established the historic Danelaw border.",
            x: 72,
            y: 62
          },
          {
            id: "danelaw",
            name: "The Danelaw",
            description: "The historic region of northern and eastern England where the laws and customs of the Danes dominated, spanning from Yorkshire down to East Anglia.",
            x: 55,
            y: 80
          }
        ]
      },
      {
        id: "chronicle_heathen_army",
        title: "The Great Heathen Army & Sacking of Kingdoms",
        paragraphs: [
          "In late 865, a monumental turning point arrived on England's shores. Unlike the scattered summer raiding parties of previous decades, a colossal Norse military coalition—dubbed by contemporary scribes as the 'Great Heathen Army' (Micel Here)—landed in East Anglia. Led by the legendary, merciless sons of Ragnar Lodbrok, including Ivar the Boneless, Halfdan, and Ubba, their ultimate objective was not temporary gold plunder, but systematic regional conquest and settlement.",
          "The army demonstrated devastating mobility and coordination. They seized horses and marched swiftly north, capturing the Roman-walled citadel of York (Jórvík) in 866. When the warring kings of Northumbria united to expel them in 867, they were catastrophically defeated and executed. Turning south, the Norsemen captured East Anglia. King Edmund was taken prisoner and, refusing to renounce his Christian faith, was bound to a tree and executed under a rain of Viking arrows, becoming an instant national saint and martyr.",
          "Mercia, the once-mighty heartland of central England, crumbled next, with its native king driven into continental exile and replaced by a Norse-aligned puppet. By 871, three of the four historic Anglo-Saxon kingdoms had been entirely extinguished. The sovereign flame of Christian England was left to flicker within a single, cornered realm: the Southern Saxon kingdom of Wessex, ruled by King Æthelred I and his young brother Alfred."
        ],
        image: "/src/assets/images/viking_timeline_1784019399632.jpg",
        hotspots: [
          {
            id: "heathen_army",
            name: "The Great Heathen Army",
            description: "An immense coalition of Norse warriors, primarily from Denmark and Norway, who landed in 865. Instead of raiding, they came to conquer and settle the Anglo-Saxon kingdoms.",
            x: 32,
            y: 45
          }
        ]
      },
      {
        id: "chronicle_alfred_defense",
        title: "Alfred's Guerilla Stand & The Birth of Danelaw",
        paragraphs: [
          "By midwinter of 878, the pagan conquest was near complete. A sudden, treacherous Twelfth Night assault by the Danish warlord Guthrum caught the Wessex royal court entirely by surprise at Chippenham. King Alfred, forced into rapid flight with only a small band of loyal housecarls and advisors, sought refuge deep within the cold, inaccessible Somerset marshes of Athelney, existing as a monarch of a virtually vanished realm.",
          "From his hidden marsh island fortress, Alfred orchestrated a brilliant, asymmetric guerrilla campaign. He built secret wooden bridges, executed lightning raids against Danish outposts, and sent secret riders across the countryside to summon the local peasant militia (fyrd). In May 878, Alfred assembled his forces at Egbert’s Stone and engaged Guthrum's veteran army at the Battle of Edington (Ethandun), smashing the Viking line with a desperate Saxon shield wall.",
          "The decisive Saxon victory led directly to the historic Treaty of Wedmore. Guthrum surrendered, agreed to permanently withdraw his forces from Wessex, and accepted Christian baptism, with Alfred acting as his godfather. This treaty established the historic Danelaw border along Watling Street, partitioning England into Saxon and Viking legal spheres, which permanently preserved the English language, Alfredian laws, and Saxon identity from absolute destruction."
        ],
        image: "/src/assets/images/viking_timeline_1784019399632.jpg",
        hotspots: [
          {
            id: "alfred_great",
            name: "Alfred the Great",
            description: "King of Wessex (871-899) who defended England against the Vikings, instituted military burhs (fortified towns), and established the historic Danelaw border.",
            x: 72,
            y: 62
          },
          {
            id: "danelaw",
            name: "The Danelaw",
            description: "The historic region of northern and eastern England where the laws and customs of the Danes dominated, spanning from Yorkshire down to East Anglia.",
            x: 55,
            y: 80
          }
        ]
      },
      {
        id: "chronicle_cnut_empire",
        title: "Cnut the Great & The Golden North Sea Empire",
        paragraphs: [
          "Following a century of Saxon expansion and consolidation, the peace of Alfred’s descendants was shattered in the late 10th century by devastating national-scale Danish invasions. Under the indecisive rule of King Æthelred II 'the Unready' (meaning 'badly counselled'), English defenses collapsed. The Danish King Sweyn Forkbeard launched a brutal, relentless conquest, successfully claiming the English throne in 1013 as the first foreign Scandinavian monarch, forcing Æthelred into exile in Normandy.",
          "Sweyn’s sudden death in 1014 initiated a ferocious, multi-year civil war between his brilliant, ambitious young son, Cnut, and Æthelred’s brave successor, Edmund Ironside. After fighting five epic battles in a single year, Edmund was betrayed by Saxon nobles at the Battle of Assandun in 1016. Cnut emerged victorious, securing the crowns of both northern and southern England. Ruling not as a tyrant but as a pious Christian sovereign, Cnut quickly restored internal order, patronized damaged monasteries, and established a prosperous era of peace.",
          "Cnut consolidated his colossal maritime domains to forge the 'North Sea Empire'—a grand tri-national superpower uniting England, Denmark, and Norway under a single crown. He secured vital trade agreements with continental European emperors, protected pilgrim paths to Rome, and ruled with great respect for native Anglo-Saxon laws. His legendary demonstration of command over the ocean tides served to teach his sycophantic courtiers that even the power of a mighty emperor was nothing compared to the divine majesty of God."
        ],
        image: "/src/assets/images/viking_timeline_1784019399632.jpg",
        hotspots: []
      },
      {
        id: "chronicle_twilight_1066",
        title: "Stamford Bridge & The Twilight of the Vikings",
        paragraphs: [
          "The turbulent, centuries-long saga of Saxon and Viking co-existence reached its dramatic, apocalyptic climax in the year 1066. Following the death of the childless King Edward the Confessor, the powerful Saxon earl Harold Godwinson claimed the English crown. Immediately, his throne was targeted by two massive external threats: William, Duke of Normandy, from the south, and Harald Hardrada, King of Norway—a legendary warrior hailed as 'the last great Viking'—who invaded from the north with a fleet of 300 longships.",
          "Hardrada’s forces advanced rapidly into Yorkshire, defeating local earls and occupying York. Reacting with astonishing military speed, King Harold Godwinson marched his Saxon housecarls 185 miles north in just four days. On September 25, 1066, Godwinson caught the resting Vikings completely by surprise at Stamford Bridge. In a grueling, shield-shattering melee under a hot autumn sun, the Viking shield wall was obliterated, King Harald Hardrada was slain by an arrow to the throat, and the age of Scandinavian military invasions in Britain was permanently ended.",
          "However, there was no time to celebrate this monumental triumph. Exhausted and heavily depleted, the Saxon army had to immediately turn south and march 250 miles to meet the invading Norman forces of William. On October 14, 1066, at the Battle of Hastings, the weary Saxon shield wall finally collapsed under Norman cavalry charges and arrow fire. King Harold was killed, bringing an end to Anglo-Saxon England and initiating the Norman-French era that would fundamentally reshape the Western world."
        ],
        image: "/src/assets/images/viking_timeline_1784019399632.jpg",
        hotspots: []
      },
      {
        id: "chronicle_timeline_app",
        title: "Royal Chronology & Timeline",
        paragraphs: [
          "From the first lightning raid on Lindisfarne in 793 to the final, bloody clash at Stamford Bridge in 1066, Britain's destiny was forged in the fire of Saxon and Viking conflict. These centuries saw kingdoms rise, fall, and merge under legendary sovereigns.",
          "This interactive sub-page breaks this tumultuous era into four pivotal periods: the early raids, the division of the Danelaw, the grand North Sea Empire of Cnut, and the dramatic twilight of the Norsemen.",
          "Interact with each era node below to reveal key years and sub-tracks. Tap on individual year entries to open illuminated parchment scrolls, detailing the rulers, events, and final outcomes that shaped England."
        ],
        image: "/src/assets/images/viking_timeline_1784019399632.jpg",
        hotspots: [],
        isTimelineComponent: true
      }
    ]
  },
  {
    id: "diet",
    gothicTitle: "Of Bread, Broth, and Mead",
    englishTitle: "Diet & Feast Cultures",
    runicSubtitle: "ᚠᛅᛅᛋᛏ᛫ᛅᚾᛏ᛫ᛘᛅᛅᛏ",
    era: "Daily Homestead Sustenance",
    summary: "Exploring the hearth fire, continuous stews, and the political mead hall.",
    paragraphs: [
      "To cross the tempestuous, freezing waves of the North Sea, Norse seafarers relied on highly specialized, nutrient-dense preservation techniques. In the cargo holds of their longships lay vital rations: wind-cured stockfish (torsk), dense griddle flatbreads (flatbrauð), and sour skyr packed in airtight wooden casks. Once settled in Britain's fertile shires, they combined these traditional Scandinavian survival foods with Anglo-Saxon crop cultivation, building a robust diet of grains, livestock, and wild forest bounties."
    ],
    defaultImage: "/src/assets/images/viking_diet_1784019408311.jpg",
    hotspots: [
      {
        id: "mead",
        name: "Mead & Ale Horns",
        description: "Mead, made by fermenting honey with herbs, was the divine drink of kings and Odin. It was consumed from beautifully polished horns decorated with silver bindings.",
        x: 34,
        y: 35
      },
      {
        id: "quern_stones",
        name: "Stone Querns",
        description: "Hand-turned stone wheels used to grind grain into flour. This labor-intensive chore was a cornerstone of daily household work, essential for flatbread baking.",
        x: 74,
        y: 72
      },
      {
        id: "cauldron",
        name: "Hearth Cauldron",
        description: "An iron cauldron hanging over the central fire. Stews (broths) were kept simmering perpetually, adding new scraps of meat and herbs daily to feed the entire household.",
        x: 50,
        y: 50
      },
      {
        id: "wild_garlic",
        name: "Alliums & Wild Herbs",
        description: "Wild garlic, onions, and leeks were essential flavorings and medicinals, thrown into perpetual stews to fight infections and supplement heavily salted meats.",
        x: 18,
        y: 82
      }
    ],
    pages: [
      {
        id: "diet_hearth",
        title: "The Hearth & The Mead Hall",
        paragraphs: [
          "The architectural and social centerpiece of the Viking longhouse was the central open hearth, where a monumental iron or bronze cauldron bubbled continuously with 'skálar'—a perpetual stew of mutton or horsemeat, wild garlic (hramsak), cabbage, and parsnips, constantly replenished with new scraps and fresh mountain water.",
          "At high-status feasts, culinary consumption became a primary tool for political diplomacy. Great silver-ringed drinking horns filled with potent honey-fermented mead (mjöðr) and heavy malt ale (öl) were distributed in strict hierarchical order down smoky timber halls, accompanied by boastful mannjafnaðr (man-matching comparisons) and intricate skaldic verses.",
          "Through these communal banquets, chieftains cemented bonds of loyalty, distributed spoils of war, and negotiated complex land grants in the newly partitioned English shires. This feasting culture created a unified community of Norse and Saxon subjects, blending their languages and identities over shared banquets."
        ],
        image: "/src/assets/images/viking_diet_1784019408311.jpg",
        hotspots: [
          {
            id: "mead",
            name: "Mead & Ale Horns",
            description: "Mead, made by fermenting honey with herbs, was the divine drink of kings and Odin. It was consumed from beautifully polished horns decorated with silver bindings.",
            x: 34,
            y: 35
          },
          {
            id: "cauldron",
            name: "Hearth Cauldron",
            description: "An iron cauldron hanging over the central fire. Stews (broths) were kept simmering perpetually, adding new scraps of meat and herbs daily to feed the entire household.",
            x: 50,
            y: 50
          }
        ]
      },
      {
        id: "diet_agriculture",
        title: "Daily Harvesting & Domestic Grain",
        paragraphs: [
          "Settling in the Danelaw, Norse farmers harnessed the rich, damp soils of the English Midlands. They farmed intensive crops of six-row barley, rye, and oats—the absolute caloric bedrock of Norse society. These grains were meticulously ground using hand-turned granite querns, a grueling, repetitive daily task usually performed by women and thralls.",
          "The resulting coarse meal was kneaded with water or sour whey and baked on flat earthenware or iron griddles into flatbrauð—dense, unleavened flatbreads that could be dried and stored for long periods without mold or spoilage.",
          "They maintained extensive dairy herds of Shorthorn-style cattle, sheep, and goats. While fresh milk spoiled quickly, it was immediately converted into butter, salted cheeses, and skyr—a thick, pasteurized curd-like dairy rich in protein and lactic acid, which was preserved under a layer of sour whey (súrr) in cold earthen cellars for winter use, ensuring survival through devastating famines."
        ],
        image: "/src/assets/images/viking_diet_1784019408311.jpg",
        hotspots: [
          {
            id: "quern_stones",
            name: "Stone Querns",
            description: "Hand-turned stone wheels used to grind grain into flour. This labor-intensive chore was a cornerstone of daily household work, essential for flatbread baking.",
            x: 74,
            y: 72
          }
        ]
      },
      {
        id: "diet_preservation",
        title: "Sea Rations & Preservation Arts",
        paragraphs: [
          "For long-distance maritime voyages (víking), standard fresh rations were useless. Viking crews survived on wind-cured stockfish (skreið or torsk), which was dried on open timber racks (hjallur) in the freezing winds of northern Norway. Lacking salt, the fish dehydrated completely, losing 80% of its weight while retaining all nutrients, creating a rock-hard protein block that lasted for years and could be gnawed on directly or hammered soft and boiled.",
          "To complement this, sailors packed large, airtight wooden casks of skyr and mutton preserved in acidic, fermented whey (súrr). This lactic-acid preservation prevented bacterial spoilage and provided essential Vitamin C and calcium, defending the oarsmen against the ravages of scurvy and malnutrition during grueling weeks at sea.",
          "On land, meats were preserved via heavy cold-smoking in the soot-laden rafters of longhouses, absorbing protective antiseptic phenols from smoldering peat and oak wood. Coastal salt-pans yielded precious salt for curing herring, while wild alliums, stinging nettle, and dried juniper berries added vital antimicrobial flavorings to their daily fare."
        ],
        image: "/src/assets/images/viking_diet_1784019408311.jpg",
        hotspots: [
          {
            id: "wild_garlic",
            name: "Alliums & Wild Herbs",
            description: "Wild garlic, onions, and leeks were essential flavorings and medicinals, thrown into perpetual stews to fight infections and supplement heavily salted meats.",
            x: 18,
            y: 82
          }
        ]
      }
    ]
  },
  {
    id: "architecture",
    gothicTitle: "From Longhouses to Stone Churches",
    englishTitle: "Architecture & Settlements",
    runicSubtitle: "ᚼᚢᛋ᛫ᛅᚾᛏ᛫ᚼᛅᛚ",
    era: "Settlement & Integration",
    summary: "The timber ships of the land and the sacred stone sanctuaries of the Saxons.",
    paragraphs: [
      "When the Vikings settled the Danelaw, they did not merely destroy; they built. In urban trading hubs like Jórvík (modern York), they established tightly packed timber tenements, specialized craft workshops, and busy merchant lanes. Their rural homesteads reflected Norse heritage, anchored firmly by the iconic longhouse."
    ],
    defaultImage: "/src/assets/images/viking_architecture_1784019417525.jpg",
    hotspots: [
      {
        id: "longhouse",
        name: "The Turf Longhouse",
        description: "A timber-framed building up to 30 meters long, with curved walls like a ship's hull. Insulated with thick sod/turf to retain heat, it housed both families and their livestock.",
        x: 25,
        y: 32
      },
      {
        id: "wattle_daub",
        name: "Wattle and Daub",
        description: "A building technique where woven wooden branches (wattle) are plastered with a clay-like mix of mud, straw, and manure (daub) to create wind-resistant, sturdy walls.",
        x: 68,
        y: 54
      },
      {
        id: "stone_crosses",
        name: "Anglo-Norse Stone Crosses",
        description: "Stately churchyard monuments, like the famous Gosforth Cross, blending Christian narratives with carvings of Odin, Thor, and Ragnarok—visual proof of syncretism.",
        x: 82,
        y: 20
      },
      {
        id: "hearth_center",
        name: "Central Fire Pit",
        description: "The beating heart of the longhouse, used for warmth, cooking, and light. Smoke escaped through a simple hole in the thatched roof as there were no chimneys.",
        x: 45,
        y: 75
      }
    ],
    pages: [
      {
        id: "arch_longhouse",
        title: "The Turf Longhouse & Homestead",
        paragraphs: [
          "Constructed of curved timber ribs resembling an overturned ship, the Viking longhouse (langhús) was the cornerstone of Norse domestic life. Its design was refined over centuries to withstand violent North Atlantic storms and severe winter cold, using materials gathered directly from the surrounding natural landscape.",
          "Thick, layered walls of cut turf and sod insulated the interior, while wattle-and-daub panels sealed the gaps against howling drafts. Animal byres were often built directly into one end of the structure, allowing the raw body heat of dairy cows and sheep to supplement the warmth of the human living quarters.",
          "The roof was thatched with reeds or covered in green sod. These organic roofs blended seamlessly into the surrounding wilderness, forming a highly functional, self-repairing thermal barrier that was perfectly adapted to the wet, cold climates of Scandinavia and Northern England."
        ],
        image: "/src/assets/images/viking_architecture_1784019417525.jpg",
        hotspots: [
          {
            id: "longhouse",
            name: "The Turf Longhouse",
            description: "A timber-framed building up to 30 meters long, with curved walls like a ship's hull. Insulated with thick sod/turf to retain heat, it housed both families and their livestock.",
            x: 25,
            y: 32
          },
          {
            id: "wattle_daub",
            name: "Wattle and Daub",
            description: "A building technique where woven wooden branches (wattle) are plastered with a clay-like mix of mud, straw, and manure (daub) to create wind-resistant, sturdy walls.",
            x: 68,
            y: 54
          }
        ]
      },
      {
        id: "arch_interior",
        title: "Interior Comfort & The Central Hearth",
        paragraphs: [
          "Inside the traditional Norse longhouse, there were no interior partition walls or private chambers. Life was communal, shared, and public, centered entirely around a long, stone-lined central fire pit (langeldnr) that ran down the middle of the hard-packed dirt floor.",
          "This fire was the sole source of heat, light, and cooking energy for the entire household, including the chieftain’s family, servants, and guests. Raised dirt platforms covered with heavy wooden planks, thick sheepskins, and hand-woven woolen blankets flanked the hearth on both sides, functioning as seats by day and beds by night.",
          "The overhead rafters were black with soot, as there were no chimneys. Smoke rose slowly toward a narrow, shuttered opening in the roof that served as a basic ventilation point. This smoke-filled space was highly useful, serving as the primary area where dried mutton, hams, and wind-cured fish hung to smoke and preserve."
        ],
        image: "/src/assets/images/viking_architecture_1784019417525.jpg",
        hotspots: [
          {
            id: "hearth_center",
            name: "Central Fire Pit",
            description: "The beating heart of the longhouse, used for warmth, cooking, and light. Smoke escaped through a simple hole in the thatched roof as there were no chimneys.",
            x: 45,
            y: 75
          }
        ]
      },
      {
        id: "arch_syncretism",
        title: "Jórvík & Churchyard Monuments",
        paragraphs: [
          "In vibrant urban trading centers like Jórvík (modern York), Norse settlers abandoned the sprawling rural longhouse in favor of narrow, multi-story timber tenements and workshops packed tightly together along muddy commercial lanes. These urban dwellings featured front shops for leatherworking, metal casting, and bone carving, with families living in the tight spaces behind or above.",
          "Meanwhile, in rural churchyards across Northern England, a fascinating architectural and sculptural fusion occurred as Viking lords converted to Christianity. Local stone masons carved stately stone crosses that combined Christian iconographies with traditional Scandinavian Norse myths.",
          "A prime example is the famous Gosforth Cross, which depicts the Crucifixion of Christ alongside carvings of the god Thor fishing for the Midgard Serpent and Odin's death at Ragnarök. These monuments stood as powerful public symbols of a blended, syncretic Anglo-Scandinavian culture, easing the transition between old and new beliefs."
        ],
        image: "/src/assets/images/viking_architecture_1784019417525.jpg",
        hotspots: [
          {
            id: "stone_crosses",
            name: "Anglo-Norse Stone Crosses",
            description: "Stately churchyard monuments, like the famous Gosforth Cross, blending Christian narratives with carvings of Odin, Thor, and Ragnarok—visual proof of syncretism.",
            x: 82,
            y: 20
          }
        ]
      }
    ]
  },
  {
    id: "religion",
    gothicTitle: "Odin, Cross, and the Old Gods",
    englishTitle: "Religion & Syncretism",
    runicSubtitle: "ᚦᛁᚾ᛫ᛅᚾᛏ᛫ᚴᚱᛁᛋᛏ",
    era: "The Convergence of Faiths",
    summary: "The meeting of Thor's hammer and the Christian cross in early medieval Britain.",
    paragraphs: [
      "The early Viking raiders were pagans, sworn to the Æsir—the old gods of the Nordic pantheon. They wore heavy amulets of Mjölnir, Thor's hammer, to invoke protection against tempestuous seas and hostile swords."
    ],
    defaultImage: "/src/assets/images/viking_religion_1784019426590.jpg",
    hotspots: [
      {
        id: "mjolnir",
        name: "Thor's Hammer (Mjölnir)",
        description: "An amulet of protection, representing Thor's weapon that defended Asgard. Often worn as a pendant, it stood as a proud counter-symbol to the Christian crucifix.",
        x: 28,
        y: 40
      },
      {
        id: "celtic_cross",
        name: "The Crucifix and Cross",
        description: "The Christian cross, representing salvation and monastic learning. To the Vikings, its followers possessed a formidable literary god who wrote books on parchment.",
        x: 72,
        y: 38
      },
      {
        id: "dual_molds",
        name: "Dual-Symbol Soapstone Molds",
        description: "Archaeologists have found soapstone casting molds with sockets for both crosses and Thor's hammers, proving craftsmen supplied both pagan and Christian clients.",
        x: 50,
        y: 65
      },
      {
        id: "guthrum_baptism",
        name: "Royal Baptism",
        description: "The treaty-bound conversion of Norse kings. In 878, Viking King Guthrum was baptized with Alfred the Great as godfather, bridging pagan lords to Saxon Christian royalty.",
        x: 51,
        y: 88
      }
    ],
    pages: [
      {
        id: "rel_old_gods",
        title: "Pagan Lore & Christian Cross",
        paragraphs: [
          "To the Norsemen, the universe was held within the colossal branches of the world-ash tree, Yggdrasil. Their gods—such as Odin, the Allfather of wisdom and war, Thor, the red-bearded protector of mankind, and Freyr, the lord of harvest fertility—were powerful but ultimately mortal, destined to perish alongside their enemies in the apocalyptic battle of Ragnarök.",
          "In stark contrast, Anglo-Saxon Britain was anchored by ancient, peaceful Christian monasteries. These sacred complexes, though highly vulnerable to coastal Viking raids due to their unguarded wealth, served as centers of literacy, theology, and administration, preserving historical records on painstakingly hand-written sheepskin scrolls.",
          "As the Norsemen settled, they found themselves deeply impressed by the literary and administrative power of the Christian clergy. Rather than abandoning their ancestral gods, they initially adopted a polytheistic compromise, adding the 'White Christ' to their existing pantheon of Norse deities."
        ],
        image: "/src/assets/images/viking_religion_1784019426590.jpg",
        hotspots: [
          {
            id: "mjolnir",
            name: "Thor's Hammer (Mjölnir)",
            description: "An amulet of protection, representing Thor's weapon that defended Asgard. Often worn as a pendant, it stood as a proud counter-symbol to the Christian crucifix.",
            x: 28,
            y: 40
          },
          {
            id: "celtic_cross",
            name: "The Crucifix and Cross",
            description: "The Christian cross, representing salvation and monastic learning. To the Vikings, its followers possessed a formidable literary god who wrote books on parchment.",
            x: 72,
            y: 38
          }
        ]
      },
      {
        id: "rel_syncretism",
        title: "The Soapstone Dual Molds",
        paragraphs: [
          "As Viking merchants, artisans, and farmers integrated into English society, they operated in a multi-faith market. Blacksmiths and metalworkers adapted to this spiritual fluidity by designing highly practical casting molds made from soft, heat-resistant soapstone.",
          "A single soapstone slab would be carved with sockets for Christian crucifix crosses on one side and Thor's hammers (Mjölnir) on the other. This allowed craftsmen to melt pewter or silver and cast whatever amulet their customers requested from a single tool, supplying both pagan and Christian clients with ease.",
          "This pragmatic approach was adopted by Viking merchants, who would wear both symbols or swap them depending on their trading destination. They would proudly display the cross in Christian Anglo-Saxon market towns to secure trade partnerships, and revert to Thor's hammer in traditional Norse drinking halls to maintain ancestral bonds."
        ],
        image: "/src/assets/images/viking_religion_1784019426590.jpg",
        hotspots: [
          {
            id: "dual_molds",
            name: "Dual-Symbol Soapstone Molds",
            description: "Archaeologists have found soapstone casting molds with sockets for both crosses and Thor's hammers, proving craftsmen supplied both pagan and Christian clients.",
            x: 50,
            y: 65
          }
        ]
      },
      {
        id: "rel_conversion",
        title: "Treaty Conversion & Baptism",
        paragraphs: [
          "Over generations, spiritual convergence paved the way for permanent political conversion. Following his decisive defeat at Edington in 878, the Danish leader Guthrum accepted the terms of the Treaty of Wedmore, which demanded his conversion to Christianity as a prerequisite for peace and regional autonomy.",
          "In a grand ceremony, Guthrum and thirty of his elite commanders were baptized in Christian waters. King Alfred the Great acted as Guthrum’s godfather, cementing a spiritual and feudal kinship, and gifted him the Christian name Æthelstan. This act elevated Guthrum to the rank of a legitimate Christian king recognized by other European states.",
          "Following this royal example, mass baptisms occurred across the Danelaw. Scandinavian rulers began minting coins bearing Christian crosses alongside their own names, and within two generations, the descendants of the pagan raiders who had sacked Lindisfarne were building local parish churches and burying their dead in sacred Christian ground."
        ],
        image: "/src/assets/images/viking_religion_1784019426590.jpg",
        hotspots: [
          {
            id: "guthrum_baptism",
            name: "Royal Baptism",
            description: "The treaty-bound conversion of Norse kings. In 878, Viking King Guthrum was baptized with Alfred the Great as godfather, bridging pagan lords to Saxon Christian royalty.",
            x: 51,
            y: 88
          }
        ]
      }
    ]
  },
  {
    id: "warfare",
    gothicTitle: "The Clash of Shields",
    englishTitle: "Warfare & Tactics",
    runicSubtitle: "ᚢᛅᚱ᛫ᛅᚾᛏ᛫ᛋᚢᚢᚱᛏ",
    era: "Battlefield Tactics",
    summary: "The defensive skjaldborg, pattern-welded iron, and the terrifying Dane axe.",
    paragraphs: [
      "Warfare in the Viking Age was an intimate, terrifying affair of shields, iron, and blood. The shield wall ('skjaldborg') was the cornerstone of tactical combat. Circular lime-wood shields overlapped to form a continuous, defensive wall."
    ],
    defaultImage: "/src/assets/images/viking_warfare_1784019435680.jpg",
    hotspots: [
      {
        id: "shield_wall",
        name: "The Skjaldborg",
        description: "The overlapping shield wall tactic. It demanded extreme discipline. A single warrior breaking rank could compromise the entire line, exposing the army to slaughter.",
        x: 50,
        y: 50
      },
      {
        id: "dane_axe",
        name: "The Dane Axe",
        description: "A long-shafted, light, two-handed battle axe with a thin blade. It was a terrifying weapon of terror, able to cut down heavily armed cavalry or split oak shields.",
        x: 18,
        y: 35
      },
      {
        id: "pattern_welded_sword",
        name: "Pattern-Welded Sword",
        description: "A blade made by twisting iron bars together and hammer-forging them at white heat. This produced a flexible, sturdy steel blade with a snake-like surface pattern.",
        x: 75,
        y: 60
      },
      {
        id: "byrnie",
        name: "Iron Chainmail (Byrnie)",
        description: "A protective tunic composed of thousands of interwoven, riveted iron rings. Highly effective against slashing sword blows, though heavy and extremely expensive.",
        x: 42,
        y: 22
      }
    ],
    pages: [
      {
        id: "war_shield_wall",
        title: "The Skjaldborg Shield Wall",
        paragraphs: [
          "The absolute core of Viking Age infantry combat was the 'skjaldborg' (shield wall). Both the Scandinavian raiders and the defending Anglo-Saxon forces deployed this ancient, interlocking defensive formation on the battlefield, demanding immense physical coordination and courage.",
          "Warriors stood shoulder-to-shoulder, overlapping their circular wooden shields made of light, shock-absorbing linden or lime-wood. This created an impenetrable barrier of wood, leather, and iron bosses, providing vital protection against flights of arrows, javelins, and heavy throwing axes.",
          "Behind this wooden wall, soldiers thrust long, steel-tipped spears through gaps in the shields to impale opponents, while shock troopers waited with two-handed weapons. A shield wall clash was a slow, exhausting, and bloody affair of crushing pressure, where the first side to break physical cohesion faced instant slaughter."
        ],
        image: "/src/assets/images/viking_warfare_1784019435680.jpg",
        hotspots: [
          {
            id: "shield_wall",
            name: "The Skjaldborg",
            description: "The overlapping shield wall tactic. It demanded extreme discipline. A single warrior breaking rank could compromise the entire line, exposing the army to slaughter.",
            x: 50,
            y: 50
          }
        ]
      },
      {
        id: "war_weapons",
        title: "Iron Blades & Giant Battle Axes",
        paragraphs: [
          "For the Norse elite, the sword was the ultimate status symbol, representing wealth, power, and family prestige. Often pattern-welded by twisting multiple rods of iron and high-carbon steel together at white-hot heat, these blades were incredibly flexible and razor-sharp, decorated with elaborate silver and gold hilt designs.",
          "In contrast, the long-shafted Dane Axe was a pure weapon of terror. Wielded with both hands by elite huscarls, its broad, thin-profile blade could shear through solid oak shields, split iron helmets, and cut down armored cavalry horses in a single, devastating swing, spreading psychological panic through enemy ranks.",
          "For protection, warriors wore conical iron helmets with a sturdy nasal guard to protect the face from downward slashing blows. Contrary to popular Victorian myths, historical helmets never featured horns, as any protrusion would catch enemy blades rather than deflect them, proving to be a fatal design flaw in close-quarters combat."
        ],
        image: "/src/assets/images/viking_warfare_1784019435680.jpg",
        hotspots: [
          {
            id: "dane_axe",
            name: "The Dane Axe",
            description: "A long-shafted, light, two-handed battle axe with a thin blade. It was a terrifying weapon of terror, able to cut down heavily armed cavalry or split oak shields.",
            x: 18,
            y: 35
          },
          {
            id: "pattern_welded_sword",
            name: "Pattern-Welded Sword",
            description: "A blade made by twisting iron bars together and hammer-forging them at white heat. This produced a flexible, sturdy steel blade with a snake-like surface pattern.",
            x: 75,
            y: 60
          }
        ]
      },
      {
        id: "war_armor",
        title: "The Defensive Byrnie & War Gear",
        paragraphs: [
          "Only wealthy chieftains, kings, and their elite retainers could afford the exceptional protection of a complete iron byrnie—a chainmail tunic meticulously hand-crafted from tens of thousands of tiny, interlocking iron rings that were individually closed with iron rivets.",
          "An iron byrnie was highly effective at stopping slashing blows from swords, spears, and axes, though it offered less protection against the heavy blunt-force trauma of clubs or direct heavy thrusts, which could fracture ribs or cause severe internal bleeding beneath the armor.",
          "The vast majority of common soldiers went to battle wearing nothing but thick padded wool tunics or heavy leather vests, relying entirely on their heavy linden-wood shields, group coordination, and raw courage to survive the terrifying, deafening clash of steel."
        ],
        image: "/src/assets/images/viking_warfare_1784019435680.jpg",
        hotspots: [
          {
            id: "byrnie",
            name: "Iron Chainmail (Byrnie)",
            description: "A protective tunic composed of thousands of interwoven, riveted iron rings. Highly effective against slashing sword blows, though heavy and extremely expensive.",
            x: 42,
            y: 22
          }
        ]
      }
    ]
  }
];
