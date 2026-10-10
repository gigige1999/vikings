/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter } from "./types";

export const CHAPTERS_DATA: Chapter[] = [
  {
    "id": "timeline_interactive",
    "gothicTitle": "Milestones & Chronicle",
    "englishTitle": "Interactive Timeline",
    "runicSubtitle": "ᛏᛁᛘᛅᛚᛁᚾᛅ",
    "era": "793 - 1066 AD",
    "summary": "An interactive timeline spanning the key milestones of the Viking Age in Britain.",
    "paragraphs": [
      "From the first lightning raid on Lindisfarne in 793 to the final, bloody clash at Stamford Bridge in 1066, Britain's destiny was forged in the fire of Saxon and Viking conflict. These centuries saw kingdoms rise, fall, and merge under legendary sovereigns."
    ],
    "defaultImage": "/images/viking_timeline_1784019399632.jpg",
    "hotspots": [],
    "pages": [
      {
        "id": "chronicle_timeline_app",
        "title": "Royal Chronology & Timeline",
        "paragraphs": [
          "From the first lightning raid on Lindisfarne in 793 to the final, bloody clash at Stamford Bridge in 1066, Britain's destiny was forged in the fire of Saxon and Viking conflict. These centuries saw kingdoms rise, fall, and merge under legendary sovereigns.",
          "This interactive sub-page breaks this tumultuous era into four pivotal periods: the early raids, the division of the Danelaw, the grand North Sea Empire of Cnut, and the dramatic twilight of the Norsemen.",
          "Interact with each era node below to reveal key years and sub-tracks. Tap on individual year entries to open illuminated parchment scrolls, detailing the rulers, events, and final outcomes that shaped England."
        ],
        "image": "/images/viking_timeline_1784019399632.jpg",
        "hotspots": [],
        "isTimelineComponent": true
      },
      {
        "id": "expansion_map",
        "title": "The Viking World in Europe",
        "paragraphs": [
          "Setting out from the fjords of Scandinavia, in under three centuries the Vikings left their mark on coasts and rivers from the North Atlantic to the Black Sea: west to Iceland and Greenland, south up the Seine and into the Mediterranean, and east down the Dnieper to Constantinople."
        ],
        "image": "",
        "hotspots": [],
        "isExpansionMap": true
      }
    ]
  },
  {
    "id": "timeline",
    "gothicTitle": "The Chronicle of Kings and Raiders",
    "englishTitle": "Timeline & Royal Chronicle",
    "runicSubtitle": "ᛏᚼᛅ ᚴᚼᚱᚢᚾᛁᚴᛚᛅ",
    "era": "793 - 1066 AD",
    "summary": "Chronology of raids, treaties, and the struggle for the crown of England.",
    "paragraphs": [
      "In the year 793, terrifying portents appeared over Northumbria: immense sheets of light rushing through the air, and whirlwinds, and fiery dragons flying across the firmament. Soon after, on the sixth of June, the ravaging of heathen men lamentably destroyed God's church on Lindisfarne island through rapine and slaughter.",
      "This savage raid marked the dawn of the Viking Age in Britain. For decades, the Northmen struck like lightning, plundering coastal monasteries and fleeing back across the sea-road. But in 865, the nature of the threat shifted. No longer content with gold and silver, the 'Great Heathen Army' landed in East Anglia, seeking land to conquer, farm, and rule.",
      "Only Wessex, under the wise and resilient leadership of King Alfred the Great, withstood the pagan storm. Through the Treaty of Wedmore in 878, Alfred drew a boundary dividing England: the Danelaw in the north and east under Viking law, and Saxon Wessex in the south. Yet this peace was transient, culminating in the complete rule of Cnut the Great, and ending at the bloody Battle of Stamford Bridge in 1066."
    ],
    "defaultImage": "/images/viking_timeline_1784019399632.jpg",
    "hotspots": [
      {
        "id": "lindisfarne_raid",
        "name": "Lindisfarne Raid",
        "description": "In 793, Vikings raided Lindisfarne Monastery, plundering relics and treasures, marking the beginning of the Viking Age in England.",
        "x": 69,
        "y": 20
      },
      {
        "id": "great_heathen_army_landing",
        "name": "Landing of the Great Heathen Army",
        "description": "In 865, the Viking Great Army landed in East Anglia, seized York, established strongholds, and expanded their power.",
        "x": 53,
        "y": 54
      },
      {
        "id": "treaty_wedmore",
        "name": "Treaty of Wedmore",
        "description": "In 878, King Alfred the Great made a treaty with the Vikings, establishing the Danelaw and securing the Kingdom of Wessex.",
        "x": 34,
        "y": 66
      },
      {
        "id": "danelaw",
        "name": "Danelaw",
        "description": "A region under Viking rule, where they coexisted with locals and were governed by Viking laws.",
        "x": 74,
        "y": 70
      },
      {
        "id": "kingdom_wessex",
        "name": "Kingdom of Wessex",
        "description": "The Saxon kingdom ruled by King Alfred, which protected Christianity and traditions, gradually unifying England.",
        "x": 73,
        "y": 81
      }
    ],
    "pages": [
      {
        "id": "chronicle_intro",
        "title": "The Scriptorium Chronicle",
        "paragraphs": [
          "In the year 793, terrifying portents appeared over Northumbria: immense sheets of light rushing through the air, and whirlwinds, and fiery dragons flying across the firmament. Soon after, on the sixth of June, the ravaging of heathen men lamentably destroyed God's church on Lindisfarne island through rapine and slaughter.",
          "This savage raid marked the dawn of the Viking Age in Britain. For decades, the Northmen struck like lightning, plundering coastal monasteries and fleeing back across the sea-road. But in 865, the nature of the threat shifted. No longer content with gold and silver, the 'Great Heathen Army' landed in East Anglia, seeking land to conquer, farm, and rule.",
          "Only Wessex, under the wise and resilient leadership of King Alfred the Great, withstood the pagan storm. Through the Treaty of Wedmore in 878, Alfred drew a boundary dividing England: the Danelaw in the north and east under Viking law, and Saxon Wessex in the south."
        ],
        "image": "/images/admin/timeline_chronicle_intro_1784536487055.jpg",
        "hotspots": [
          {
            "id": "lindisfarne_raid",
            "name": "Lindisfarne Raid",
            "description": "In 793, Vikings raided Lindisfarne Monastery, plundering relics and treasures, marking the beginning of the Viking Age in England.",
            "x": 58,
            "y": 18
          },
          {
            "id": "great_heathen_army_landing",
            "name": "Landing of the Great Heathen Army",
            "description": "In 865, the Viking Great Army landed in East Anglia, seized York, established strongholds, and expanded their power.",
            "x": 60,
            "y": 52
          },
          {
            "id": "treaty_wedmore",
            "name": "Treaty of Wedmore",
            "description": "In 878, King Alfred the Great made a treaty with the Vikings, establishing the Danelaw and securing the Kingdom of Wessex.",
            "x": 48,
            "y": 76
          },
          {
            "id": "danelaw",
            "name": "Danelaw",
            "description": "A region under Viking rule, where they coexisted with locals and were governed by Viking laws.",
            "x": 80,
            "y": 72
          },
          {
            "id": "kingdom_wessex",
            "name": "Kingdom of Wessex",
            "description": "The Saxon kingdom ruled by King Alfred, which protected Christianity and traditions, gradually unifying England.",
            "x": 78,
            "y": 86
          }
        ]
      },
      {
        "id": "chronicle_heathen_army",
        "title": "The Great Heathen Army & Sacking of Kingdoms",
        "paragraphs": [
          "In late 865, a monumental turning point arrived on England's shores. Unlike the scattered summer raiding parties of previous decades, a colossal Norse military coalition—dubbed by contemporary scribes as the 'Great Heathen Army' (Micel Here)—landed in East Anglia. Led by the legendary, merciless sons of Ragnar Lodbrok, including Ivar the Boneless, Halfdan, and Ubba, their ultimate objective was not temporary gold plunder, but systematic regional conquest and settlement.",
          "The army demonstrated devastating mobility and coordination. They seized horses and marched swiftly north, capturing the Roman-walled citadel of York (Jórvík) in 866. When the warring kings of Northumbria united to expel them in 867, they were catastrophically defeated and executed. Turning south, the Norsemen captured East Anglia. King Edmund was taken prisoner and, refusing to renounce his Christian faith, was bound to a tree and executed under a rain of Viking arrows, becoming an instant national saint and martyr.",
          "Mercia, the once-mighty heartland of central England, crumbled next, with its native king driven into continental exile and replaced by a Norse-aligned puppet. By 871, three of the four historic Anglo-Saxon kingdoms had been entirely extinguished. The sovereign flame of Christian England was left to flicker within a single, cornered realm: the Southern Saxon kingdom of Wessex, ruled by King Æthelred I and his young brother Alfred."
        ],
        "image": "/images/admin/timeline_chronicle_heathen_army_1784536487073.jpg",
        "hotspots": [
          {
            "id": "turning_point",
            "name": "Turning Point of Fate",
            "description": "In late 865, the Great Heathen Army landed, aiming not for plunder but for land and conquest.",
            "x": 40,
            "y": 15
          },
          {
            "id": "sons_ragnar",
            "name": "Sons of Ragnar",
            "description": "Led by Ivar the Boneless, Halfdan, and Ubba, they were unprecedented in scale and determined to settle in Britain.",
            "x": 81,
            "y": 14
          },
          {
            "id": "capture_york",
            "name": "Capture of York (866)",
            "description": "The army seized horses for rapid strikes, broke through York's Roman walls; two kings' counterattack was crushed.",
            "x": 55,
            "y": 35
          },
          {
            "id": "martyrdom_edmund",
            "name": "Martyrdom of King Edmund",
            "description": "King Edmund of East Anglia was captured, refused to renounce his Christian faith, and was martyred by arrows.",
            "x": 31,
            "y": 55
          },
          {
            "id": "fall_mercia",
            "name": "Fall of Mercia",
            "description": "The last king fled to Rome and died in exile; Vikings installed a puppet ruler in Mercia.",
            "x": 62,
            "y": 55
          },
          {
            "id": "wessex_last_bastion",
            "name": "Wessex: The Last Bastion",
            "description": "By 871, three of the four great kingdoms had fallen, monasteries lay in ruins, leaving Wessex as the sole surviving bastion.",
            "x": 44,
            "y": 86
          }
        ]
      },
      {
        "id": "chronicle_alfred_defense",
        "title": "Alfred's Guerilla Stand & The Birth of Danelaw",
        "paragraphs": [
          "By midwinter of 878, the pagan conquest was near complete. A sudden, treacherous Twelfth Night assault by the Danish warlord Guthrum caught the Wessex royal court entirely by surprise at Chippenham. King Alfred, forced into rapid flight with only a small band of loyal housecarls and advisors, sought refuge deep within the cold, inaccessible Somerset marshes of Athelney, existing as a monarch of a virtually vanished realm.",
          "From his hidden marsh island fortress, Alfred orchestrated a brilliant, asymmetric guerrilla campaign. He built secret wooden bridges, executed lightning raids against Danish outposts, and sent secret riders across the countryside to summon the local peasant militia (fyrd). In May 878, Alfred assembled his forces at Egbert's Stone and engaged Guthrum's veteran army at the Battle of Edington (Ethandun), smashing the Viking line with a desperate Saxon shield wall.",
          "The decisive Saxon victory led directly to the historic Treaty of Wedmore. Guthrum surrendered, agreed to permanently withdraw his forces from Wessex, and accepted Christian baptism, with Alfred acting as his godfather. This treaty established the historic Danelaw border along Watling Street, partitioning England into Saxon and Viking legal spheres, which permanently preserved the English language, Alfredian laws, and Saxon identity from absolute destruction."
        ],
        "image": "/images/admin/timeline_chronicle_alfred_defense_1784536487092.png",
        "hotspots": [
          {
            "id": "night_raid_chippenham",
            "name": "Night Raid on Chippenham",
            "description": "In winter 878, Guthrum raided Chippenham; Alfred broke out and retreated to the Athelney marshes to bide his time.",
            "x": 75,
            "y": 20
          },
          {
            "id": "battle_ethandun",
            "name": "Battle of Ethandun",
            "description": "In May 878, Alfred gathered his army and fought a fierce day-long battle with a shield wall, crushing the Vikings and forcing Guthrum to surrender.",
            "x": 60,
            "y": 48
          },
          {
            "id": "signing_treaty_wedmore",
            "name": "Signing of the Treaty of Wedmore",
            "description": "In summer 878, the treaty was concluded; Guthrum was baptized, with Alfred as his godfather.",
            "x": 50,
            "y": 77
          },
          {
            "id": "watling_street",
            "name": "Watling Street Boundary",
            "description": "Watling Street became the boundary, with the Danelaw to the northeast and Wessex to the southwest.",
            "x": 84,
            "y": 73
          },
          {
            "id": "survival_civilisation",
            "name": "Survival of Civilisation's Flame",
            "description": "The victory at Ethandun saved the flame of civilisation, and the Treaty of Wedmore shaped England's future.",
            "x": 50,
            "y": 87
          }
        ]
      },
      {
        "id": "chronicle_cnut_empire",
        "title": "Cnut the Great & The Golden North Sea Empire",
        "paragraphs": [
          "Following a century of Saxon expansion and consolidation, the peace of Alfred's descendants was shattered in the late 10th century by devastating national-scale Danish invasions. Under the indecisive rule of King Æthelred II 'the Unready' (meaning 'badly counselled'), English defenses collapsed. The Danish King Sweyn Forkbeard launched a brutal, relentless conquest, successfully claiming the English throne in 1013 as the first foreign Scandinavian monarch, forcing Æthelred into exile in Normandy.",
          "Sweyn's sudden death in 1014 initiated a ferocious, multi-year civil war between his brilliant, ambitious young son, Cnut, and Æthelred's brave successor, Edmund Ironside. After fighting five epic battles in a single year, Edmund was betrayed by Saxon nobles at the Battle of Assandun in 1016. Cnut emerged victorious, securing the crowns of both northern and southern England. Ruling not as a tyrant but as a pious Christian sovereign, Cnut quickly restored internal order, patronized damaged monasteries, and established a prosperous era of peace.",
          "Cnut consolidated his colossal maritime domains to forge the 'North Sea Empire'—a grand tri-national superpower uniting England, Denmark, and Norway under a single crown. He secured vital trade agreements with continental European emperors, protected pilgrim paths to Rome, and ruled with great respect for native Anglo-Saxon laws. His legendary demonstration of command over the ocean tides served to teach his sycophantic courtiers that even the power of a mighty emperor was nothing compared to the divine majesty of God."
        ],
        "image": "/images/admin/timeline_chronicle_cnut_empire_1784536487107.jpg",
        "hotspots": [
          {
            "id": "sweyn_takes_london",
            "name": "Sweyn Takes London (1013)",
            "description": "King Sweyn of Denmark marched south, took London, crushed Wessex; Athelred II fled, and Sweyn was crowned King of England.",
            "x": 82,
            "y": 20
          },
          {
            "id": "battle_assandun",
            "name": "Battle of Assandun (1016)",
            "description": "Cnut and Edmund II fought for England; Edmund won five battles in a year but fell at Assandun, where Cnut emerged victorious.",
            "x": 63,
            "y": 40
          },
          {
            "id": "north_sea_empire",
            "name": "North Sea Empire (1016-1035)",
            "description": "Cnut united England, Denmark, and Norway under his rule, promoted Christianity, enforced Saxon laws, and enjoyed twenty years of peace and prosperity.",
            "x": 57,
            "y": 62
          },
          {
            "id": "humble_king_tide",
            "name": "The Humble King at the Tide",
            "description": "In about 1027, Cnut rebuked the tide on the beach to show his flattering courtiers that earthly power is nothing before God and nature.",
            "x": 68,
            "y": 82
          },
          {
            "id": "cnut_judgement",
            "name": "Historical Judgement of Cnut",
            "description": "He conquered kingdoms with his sword, but won hearts with his wisdom - Cnut the Great (1016-1035).",
            "x": 50,
            "y": 93
          }
        ]
      },
      {
        "id": "chronicle_twilight_1066",
        "title": "Stamford Bridge & The Twilight of the Vikings",
        "paragraphs": [
          "The turbulent, centuries-long saga of Saxon and Viking co-existence reached its dramatic, apocalyptic climax in the year 1066. Following the death of the childless King Edward the Confessor, the powerful Saxon earl Harold Godwinson claimed the English crown. Immediately, his throne was targeted by two massive external threats: William, Duke of Normandy, from the south, and Harald Hardrada, King of Norway—a legendary warrior hailed as 'the last great Viking'—who invaded from the north with a fleet of 300 longships.",
          "Hardrada's forces advanced rapidly into Yorkshire, defeating local earls and occupying York. Reacting with astonishing military speed, King Harold Godwinson marched his Saxon housecarls 185 miles north in just four days. On September 25, 1066, Godwinson caught the resting Vikings completely by surprise at Stamford Bridge. In a grueling, shield-shattering melee under a hot autumn sun, the Viking shield wall was obliterated, King Harald Hardrada was slain by an arrow to the throat, and the age of Scandinavian military invasions in Britain was permanently ended.",
          "However, there was no time to celebrate this monumental triumph. Exhausted and heavily depleted, the Saxon army had to immediately turn south and march 250 miles to meet the invading Norman forces of William. On October 14, 1066, at the Battle of Hastings, the weary Saxon shield wall finally collapsed under Norman cavalry charges and arrow fire. King Harold was killed, bringing an end to Anglo-Saxon England and initiating the Norman-French era that would fundamentally reshape the Western world."
        ],
        "image": "/images/admin/timeline_chronicle_twilight_1066_1784536487106.jpg",
        "hotspots": [
          {
            "id": "death_edward",
            "name": "Death of Edward the Confessor",
            "description": "In 1066, King Edward the Confessor died, leaving the throne vacant and attracting two powerful claimants.",
            "x": 17,
            "y": 16
          },
          {
            "id": "harold_proclaimed",
            "name": "Harold Godwinson Proclaimed King",
            "description": "Harold Godwinson was proclaimed King of England.",
            "x": 31,
            "y": 16
          },
          {
            "id": "stamford_bridge",
            "name": "Battle of Stamford Bridge (25 Sep 1066)",
            "description": "King Harald of Norway landed with 300 longships, crushed the northern militia, and took York, but Harald was killed and the Norwegian force was nearly annihilated.",
            "x": 58,
            "y": 40
          },
          {
            "id": "battle_hastings",
            "name": "Battle of Hastings (14 Oct 1066)",
            "description": "Harold marched 250 miles south overnight; Norman knights feigned retreat and rained arrows; Harold fell, and the Saxon shield wall broke.",
            "x": 65,
            "y": 58
          },
          {
            "id": "norman_conquest",
            "name": "Norman Conquest",
            "description": "In 1066, the Norman Conquest ended the Anglo-Saxon era and began a new epoch, profoundly altering the course of Western history.",
            "x": 40,
            "y": 78
          }
        ]
      }
    ],
    "coverImage": "/images/admin/timeline_cover_1784536487068.jpg"
  },
  {
    "id": "diet",
    "gothicTitle": "Of Bread, Broth, and Mead",
    "englishTitle": "Diet & Feast Cultures",
    "runicSubtitle": "ᚠᛅᛅᛋᛏ᛫ᛅᚾᛏ᛫ᛘᛅᛅᛏ",
    "era": "Daily Homestead Sustenance",
    "summary": "Exploring the hearth fire, continuous stews, and the political mead hall.",
    "paragraphs": [
      "To cross the tempestuous, freezing waves of the North Sea, Norse seafarers relied on highly specialized, nutrient-dense preservation techniques. In the cargo holds of their longships lay vital rations: wind-cured stockfish (torsk), dense griddle flatbreads (flatbrauð), and sour skyr packed in airtight wooden casks. Once settled in Britain's fertile shires, they combined these traditional Scandinavian survival foods with Anglo-Saxon crop cultivation, building a robust diet of grains, livestock, and wild forest bounties."
    ],
    "defaultImage": "/images/viking_diet_1784019408311.jpg",
    "hotspots": [
      {
        "id": "oil_lamps",
        "name": "Oil Lamps",
        "description": "Burn animal fat to provide lighting in the longhouse.",
        "x": 10,
        "y": 10
      },
      {
        "id": "hanging_dried_meat",
        "name": "Hanging Dried Meat and Fish",
        "description": "Hung from roof beams, smoke-cured for long-term preservation.",
        "x": 30,
        "y": 15
      },
      {
        "id": "drinking_vikings",
        "name": "Drinking Vikings and Nobles",
        "description": "Gathered around benches, drinking ale and mead in key social gatherings.",
        "x": 55,
        "y": 25
      },
      {
        "id": "benches_dais",
        "name": "Benches and Dais",
        "description": "Benches along the walls for warriors, with a raised platform for the chieftain and nobles.",
        "x": 80,
        "y": 20
      },
      {
        "id": "central_hearth",
        "name": "Central Hearth",
        "description": "A long central fire pit used for cooking, heating, and lighting.",
        "x": 45,
        "y": 40
      },
      {
        "id": "roasted_mead",
        "name": "Roasted Mead",
        "description": "Mead warmed by the fire, commonly consumed during festivals.",
        "x": 20,
        "y": 45
      },
      {
        "id": "ale",
        "name": "Ale",
        "description": "Daily barley-based drink and the most important social beverage for Vikings.",
        "x": 65,
        "y": 35
      },
      {
        "id": "flatbread",
        "name": "Flatbread",
        "description": "Unleavened flatbread made from barley or rye, a daily staple.",
        "x": 75,
        "y": 50
      },
      {
        "id": "blood_pudding",
        "name": "Blood Pudding",
        "description": "Traditional dish made from animal blood mixed with flour.",
        "x": 35,
        "y": 55
      },
      {
        "id": "butter",
        "name": "Butter",
        "description": "Made from cow's or goat's milk, used for eating and cooking.",
        "x": 50,
        "y": 60
      },
      {
        "id": "roasted_meat",
        "name": "Roasted Meat and Sausages",
        "description": "Meat and sausages roasted directly over the hearth fire, the centrepiece of feasts.",
        "x": 25,
        "y": 65
      },
      {
        "id": "skyr",
        "name": "Skyr",
        "description": "Icelandic-style thick cultured dairy, high in protein and a key dairy product.",
        "x": 60,
        "y": 70
      },
      {
        "id": "salted_cheese",
        "name": "Salted Cheese",
        "description": "Salt-preserved cheese, easy to store and served with meals.",
        "x": 80,
        "y": 65
      },
      {
        "id": "stew_pot",
        "name": "Stew Pot",
        "description": "Hanging pot over the fire for slow-cooking meat and vegetables as a daily meal.",
        "x": 40,
        "y": 80
      }
    ],
    "pages": [
      {
        "id": "diet_hearth",
        "title": "The Hearth & The Mead Hall",
        "paragraphs": [
          "The architectural and social centerpiece of the Viking longhouse was the central open hearth, where a monumental iron or bronze cauldron bubbled continuously with 'skálar'—a perpetual stew of mutton or horsemeat, wild garlic (hramsak), cabbage, and parsnips, constantly replenished with new scraps and fresh mountain water.",
          "At high-status feasts, culinary consumption became a primary tool for political diplomacy. Great silver-ringed drinking horns filled with potent honey-fermented mead (mjöðr) and heavy malt ale (öl) were distributed in strict hierarchical order down smoky timber halls, accompanied by boastful mannjafnaðr (man-matching comparisons) and intricate skaldic verses.",
          "Through these communal banquets, chieftains cemented bonds of loyalty, distributed spoils of war, and negotiated complex land grants in the newly partitioned English shires. This feasting culture created a unified community of Norse and Saxon subjects, blending their languages and identities over shared banquets."
        ],
        "image": "/images/admin/diet_diet_hearth_1784306043913.jpg",
        "hotspots": [
          {
            "id": "hanging_dried_meat",
            "name": "Hanging Dried Meat and Fish",
            "description": "Hung from roof beams, smoke-cured for long-term preservation.",
            "x": 85,
            "y": 18
          },
          {
            "id": "drinking_vikings",
            "name": "Drinking Vikings and Nobles",
            "description": "Gathered around benches, drinking ale and mead in key social gatherings.",
            "x": 27,
            "y": 36
          },
          {
            "id": "stew_pot",
            "name": "Stew Pot",
            "description": "Hanging pot over the fire for slow-cooking meat and vegetables as a daily meal.",
            "x": 50,
            "y": 47
          },
          {
            "id": "central_hearth",
            "name": "Central Hearth",
            "description": "A long central fire pit used for cooking, heating, and lighting.",
            "x": 50,
            "y": 63
          },
          {
            "id": "flatbread",
            "name": "Flatbread",
            "description": "Unleavened flatbread made from barley or rye, a daily staple.",
            "x": 68,
            "y": 77
          },
          {
            "id": "roasted_meat",
            "name": "Roasted Meat and Sausages",
            "description": "Meat and sausages roasted directly over the hearth fire, the centrepiece of feasts.",
            "x": 51,
            "y": 80
          }
        ]
      },
      {
        "id": "diet_agriculture",
        "title": "Daily Harvesting & Domestic Grain",
        "paragraphs": [
          "Settling in the Danelaw, Norse farmers harnessed the rich, damp soils of the English Midlands. They farmed intensive crops of six-row barley, rye, and oats—the absolute caloric bedrock of Norse society. These grains were meticulously ground using hand-turned granite querns, a grueling, repetitive daily task usually performed by women and thralls.",
          "The resulting coarse meal was kneaded with water or sour whey and baked on flat earthenware or iron griddles into flatbrauð—dense, unleavened flatbreads that could be dried and stored for long periods without mold or spoilage.",
          "They maintained extensive dairy herds of Shorthorn-style cattle, sheep, and goats. While fresh milk spoiled quickly, it was immediately converted into butter, salted cheeses, and skyr—a thick, pasteurized curd-like dairy rich in protein and lactic acid, which was preserved under a layer of sour whey (súrr) in cold earthen cellars for winter use, ensuring survival through devastating famines."
        ],
        "image": "/images/admin/diet_diet_agriculture_1784306043914.jpg",
        "hotspots": [
          {
            "id": "short_horn_cattle",
            "name": "Short-horn Cattle",
            "description": "Cold-adapted cattle breed providing milk, meat, and leather.",
            "x": 60,
            "y": 26
          },
          {
            "id": "querns",
            "name": "Querns",
            "description": "Hand-operated stone mill for grinding barley, rye, and other grains.",
            "x": 30,
            "y": 40
          },
          {
            "id": "six_row_barley",
            "name": "Six-row Barley",
            "description": "Cold-hardy grain, a core ingredient in Viking bread and ale.",
            "x": 47,
            "y": 35
          },
          {
            "id": "oats",
            "name": "Oats",
            "description": "Commonly used for porridge or as animal feed.",
            "x": 52,
            "y": 55
          },
          {
            "id": "butter_farm",
            "name": "Butter",
            "description": "A core dairy product, widely used in diet and trade.",
            "x": 68,
            "y": 59
          },
          {
            "id": "flatbread_farm",
            "name": "Flatbread",
            "description": "Unleavened flatbread made from rye, barley, or oats.",
            "x": 20,
            "y": 83
          }
        ]
      },
      {
        "id": "diet_preservation",
        "title": "Sea Rations & Preservation Arts",
        "paragraphs": [
          "For long-distance maritime voyages (víking), standard fresh rations were useless. Viking crews survived on wind-cured stockfish (skreið or torsk), which was dried on open timber racks (hjallur) in the freezing winds of northern Norway. Lacking salt, the fish dehydrated completely, losing 80% of its weight while retaining all nutrients, creating a rock-hard protein block that lasted for years and could be gnawed on directly or hammered soft and boiled.",
          "To complement this, sailors packed large, airtight wooden casks of skyr and mutton preserved in acidic, fermented whey (súrr). This lactic-acid preservation prevented bacterial spoilage and provided essential Vitamin C and calcium, defending the oarsmen against the ravages of scurvy and malnutrition during grueling weeks at sea.",
          "On land, meats were preserved via heavy cold-smoking in the soot-laden rafters of longhouses, absorbing protective antiseptic phenols from smoldering peat and oak wood. Coastal salt-pans yielded precious salt for curing herring, while wild alliums, stinging nettle, and dried juniper berries added vital antimicrobial flavorings to their daily fare."
        ],
        "image": "/images/admin/diet_diet_preservation_1784536511641.jpg",
        "hotspots": [
          {
            "id": "sunstone",
            "name": "Sunstone / Navigation Compass",
            "description": "A navigation tool using polarised light to locate the sun direction for open-sea voyages.",
            "x": 66,
            "y": 17
          },
          {
            "id": "iron_cauldron",
            "name": "Iron Cooking Cauldron",
            "description": "Iron cauldrons carried on board for cooking hot meals.",
            "x": 56,
            "y": 24
          },
          {
            "id": "seal_whale_hunting",
            "name": "Seal and Whale Hunting",
            "description": "Hunting sea mammals for oil, meat, and hide as vital expedition supplies.",
            "x": 87,
            "y": 21
          },
          {
            "id": "cold_smoked_meat",
            "name": "Cold-smoked Meat and Fish",
            "description": "Low-temperature smoking with peat and oak fumes for antibacterial preservation.",
            "x": 50,
            "y": 66
          },
          {
            "id": "dried_juniper",
            "name": "Dried Juniper Berries",
            "description": "Berries with antimicrobial properties, used as seasoning and herbal remedy.",
            "x": 28,
            "y": 89
          },
          {
            "id": "port_trading",
            "name": "Port Trading",
            "description": "Trading at ports during voyages to replenish water and fresh provisions.",
            "x": 80,
            "y": 86
          }
        ]
      }
    ]
  },
  {
    "id": "architecture",
    "gothicTitle": "From Longhouses to Stone Churches",
    "englishTitle": "Architecture & Settlements",
    "runicSubtitle": "ᚼᚢᛋ᛫ᛅᚾᛏ᛫ᚼᛅᛚ",
    "era": "Settlement & Integration",
    "summary": "The timber ships of the land and the sacred stone sanctuaries of the Saxons.",
    "paragraphs": [
      "When the Vikings settled the Danelaw, they did not merely destroy; they built. In urban trading hubs like Jórvík (modern York), they established tightly packed timber tenements, specialized craft workshops, and busy merchant lanes. Their rural homesteads reflected Norse heritage, anchored firmly by the iconic longhouse."
    ],
    "defaultImage": "/images/viking_architecture_1784019417525.jpg",
    "hotspots": [
      {
        "id": "viking_longhouse",
        "name": "Viking Longhouse",
        "description": "Central building of the village, combining dwelling, work, and social functions.",
        "x": 30,
        "y": 25
      },
      {
        "id": "wooden_palisade",
        "name": "Wooden Palisade",
        "description": "Wooden defensive enclosure surrounding the village against raids and wild animals.",
        "x": 10,
        "y": 40
      },
      {
        "id": "barn_storehouses",
        "name": "Barn and Storehouses",
        "description": "Separate structures for storing grain, dried meat, and other winter supplies.",
        "x": 55,
        "y": 20
      },
      {
        "id": "vegetable_garden",
        "name": "Vegetable Garden",
        "description": "Cultivated plots for rye, barley, oats, and vegetables for self-sufficiency.",
        "x": 75,
        "y": 30
      },
      {
        "id": "farmland",
        "name": "Farmland",
        "description": "Arable fields outside the village, using two- or three-field rotation.",
        "x": 85,
        "y": 45
      },
      {
        "id": "blacksmith",
        "name": "Blacksmith's Workshop",
        "description": "Essential workshop for smelting iron and forging tools and weapons.",
        "x": 20,
        "y": 55
      },
      {
        "id": "woodworking",
        "name": "Woodworking Workshop",
        "description": "Workshop for processing timber into furniture, carts, and boat parts.",
        "x": 45,
        "y": 50
      },
      {
        "id": "weaving_area",
        "name": "Weaving and Textile Area",
        "description": "Women-led area for wool spinning and cloth making.",
        "x": 65,
        "y": 55
      },
      {
        "id": "fish_racks",
        "name": "Fish Racks",
        "description": "Wooden racks for air-drying fish using wind and sunlight.",
        "x": 80,
        "y": 60
      },
      {
        "id": "assembly_ground",
        "name": "Central Assembly Ground",
        "description": "Open space for village assemblies, justice, and festivals.",
        "x": 40,
        "y": 65
      },
      {
        "id": "dock",
        "name": "Dock",
        "description": "Waterfront facility for mooring longships and loading cargo.",
        "x": 15,
        "y": 75
      },
      {
        "id": "salt_pans",
        "name": "Salt Pans",
        "description": "Shallow pools along the coast for evaporating salt from seawater.",
        "x": 60,
        "y": 75
      },
      {
        "id": "longship_docked",
        "name": "Viking Longship (Drakkar)",
        "description": "Iconic warship docked at the pier, used for both raids and transport.",
        "x": 25,
        "y": 85
      },
      {
        "id": "smelting_furnace",
        "name": "Smelting Furnace",
        "description": "Furnace for smelting ore, supplying raw material to the blacksmith.",
        "x": 50,
        "y": 80
      },
      {
        "id": "fences",
        "name": "Fences",
        "description": "Wooden enclosures separating pastures from arable land for livestock.",
        "x": 70,
        "y": 80
      },
      {
        "id": "grazing",
        "name": "Grazing",
        "description": "Livestock grazing within fenced pastures, a key part of Viking animal husbandry.",
        "x": 85,
        "y": 70
      }
    ],
    "pages": [
      {
        "id": "arch_longhouse",
        "title": "The Turf Longhouse & Homestead",
        "paragraphs": [
          "Constructed of curved timber ribs resembling an overturned ship, the Viking longhouse (langhús) was the cornerstone of Norse domestic life. Its design was refined over centuries to withstand violent North Atlantic storms and severe winter cold, using materials gathered directly from the surrounding natural landscape.",
          "Thick, layered walls of cut turf and sod insulated the interior, while wattle-and-daub panels sealed the gaps against howling drafts. Animal byres were often built directly into one end of the structure, allowing the raw body heat of dairy cows and sheep to supplement the warmth of the human living quarters.",
          "The roof was thatched with reeds or covered in green sod. These organic roofs blended seamlessly into the surrounding wilderness, forming a highly functional, self-repairing thermal barrier that was perfectly adapted to the wet, cold climates of Scandinavia and Northern England."
        ],
        "image": "/images/admin/architecture_arch_longhouse_1784306043914.jpg",
        "hotspots": [
          {
            "id": "vegetable_garden",
            "name": "Vegetable Garden",
            "description": "Cultivated plots for rye, barley, oats, and vegetables for self-sufficiency.",
            "x": 50,
            "y": 19
          },
          {
            "id": "viking_longhouse",
            "name": "Viking Longhouse",
            "description": "Central building of the village, combining dwelling, work, and social functions.",
            "x": 54,
            "y": 34
          },
          {
            "id": "assembly_ground",
            "name": "Central Assembly Ground",
            "description": "Open space for village assemblies, justice, and festivals.",
            "x": 49,
            "y": 62
          },
          {
            "id": "salt_pans",
            "name": "Salt Pans",
            "description": "Shallow pools along the coast for evaporating salt from seawater.",
            "x": 80,
            "y": 66
          },
          {
            "id": "blacksmith",
            "name": "Blacksmith's Workshop",
            "description": "Essential workshop for smelting iron and forging tools and weapons.",
            "x": 19,
            "y": 75
          },
          {
            "id": "longship_docked",
            "name": "Viking Longship (Drakkar)",
            "description": "Iconic warship docked at the pier, used for both raids and transport.",
            "x": 66,
            "y": 86
          }
        ]
      },
      {
        "id": "arch_interior",
        "title": "Interior Comfort & The Central Hearth",
        "paragraphs": [
          "Inside the traditional Norse longhouse, there were no interior partition walls or private chambers. Life was communal, shared, and public, centered entirely around a long, stone-lined central fire pit (langeldnr) that ran down the middle of the hard-packed dirt floor.",
          "This fire was the sole source of heat, light, and cooking energy for the entire household, including the chieftain's family, servants, and guests. Raised dirt platforms covered with heavy wooden planks, thick sheepskins, and hand-woven woolen blankets flanked the hearth on both sides, functioning as seats by day and beds by night.",
          "The overhead rafters were black with soot, as there were no chimneys. Smoke rose slowly toward a narrow, shuttered opening in the roof that served as a basic ventilation point. This smoke-filled space was highly useful, serving as the primary area where dried mutton, hams, and wind-cured fish hung to smoke and preserve."
        ],
        "image": "/images/admin/architecture_arch_interior_1784306043917.jpg",
        "hotspots": [
          {
            "id": "timber_pillars",
            "name": "Timber Support Pillars",
            "description": "Thick wooden pillars supporting the roof and dividing the interior space.",
            "x": 68,
            "y": 50
          },
          {
            "id": "dried_meat_interior",
            "name": "Dried Meat",
            "description": "Strips of dried meat hung from beams, preserved by smoking.",
            "x": 55,
            "y": 42
          },
          {
            "id": "loom",
            "name": "Loom",
            "description": "Upright loom used by women for weaving wool and linen.",
            "x": 28,
            "y": 54
          },
          {
            "id": "hearth",
            "name": "Hearth",
            "description": "Central elongated fire pit for cooking, heating, and lighting, the heart of the longhouse.",
            "x": 50,
            "y": 64
          },
          {
            "id": "storage_chests",
            "name": "Storage Chests",
            "description": "Wooden chests placed along the walls, storing clothing, valuables, and grain.",
            "x": 55,
            "y": 78
          },
          {
            "id": "skyr_interior",
            "name": "Skyr",
            "description": "Thick cultured dairy served in wooden bowls, a key part of daily diet.",
            "x": 64,
            "y": 80
          }
        ]
      },
      {
        "id": "arch_syncretism",
        "title": "Jórvík & Churchyard Monuments",
        "paragraphs": [
          "In vibrant urban trading centers like Jórvík (modern York), Norse settlers abandoned the sprawling rural longhouse in favor of narrow, multi-story timber tenements and workshops packed tightly together along muddy commercial lanes. These urban dwellings featured front shops for leatherworking, metal casting, and bone carving, with families living in the tight spaces behind or above.",
          "Meanwhile, in rural churchyards across Northern England, a fascinating architectural and sculptural fusion occurred as Viking lords converted to Christianity. Local stone masons carved stately stone crosses that combined Christian iconographies with traditional Scandinavian Norse myths.",
          "A prime example is the famous Gosforth Cross, which depicts the Crucifixion of Christ alongside carvings of the god Thor fishing for the Midgard Serpent and Odin's death at Ragnarök. These monuments stood as powerful public symbols of a blended, syncretic Anglo-Scandinavian culture, easing the transition between old and new beliefs."
        ],
        "image": "/images/admin/architecture_arch_syncretism_1784306043917.jpg",
        "hotspots": [
          {
            "id": "anglo_norse_cross",
            "name": "Anglo-Norse Stone Cross",
            "description": "Stone cross blending Saxon and Viking artistic styles, reflecting cultural fusion.",
            "x": 50,
            "y": 30
          },
          {
            "id": "city_palisade",
            "name": "City Defences (Wooden Palisade)",
            "description": "Wooden fortifications surrounding Jorvik (York), designed for defence.",
            "x": 77,
            "y": 15
          },
          {
            "id": "blacksmith_jorvik",
            "name": "Blacksmith's Workshop",
            "description": "Workshop for forging tools, weapons, and horseshoes, a hub of urban craft.",
            "x": 34,
            "y": 34
          },
          {
            "id": "market_stalls",
            "name": "Market Stalls",
            "description": "Open-air stalls selling grain, dried fish, furs, pottery, and slaves.",
            "x": 30,
            "y": 57
          },
          {
            "id": "tavern",
            "name": "Tavern",
            "description": "Public establishment serving ale, mead, and hot food, a social centre.",
            "x": 80,
            "y": 77
          },
          {
            "id": "longship_jorvik",
            "name": "Viking Longship",
            "description": "Viking warship moored along the River Ouse, symbolising waterborne trade and defence.",
            "x": 20,
            "y": 82
          }
        ]
      }
    ]
  },
  {
    "id": "religion",
    "gothicTitle": "Odin, Cross, and the Old Gods",
    "englishTitle": "Religion & Syncretism",
    "runicSubtitle": "ᚦᛁᚾ᛫ᛅᚾᛏ᛫ᚴᚱᛁᛋᛏ",
    "era": "The Convergence of Faiths",
    "summary": "The meeting of Thor's hammer and the Christian cross in early medieval Britain.",
    "paragraphs": [
      "The early Viking raiders were pagans, sworn to the Æsir—the old gods of the Nordic pantheon. They wore heavy amulets of Mjölnir, Thor's hammer, to invoke protection against tempestuous seas and hostile swords."
    ],
    "defaultImage": "/images/viking_religion_1784019426590.jpg",
    "hotspots": [
      {
        "id": "odin",
        "name": "Odin, the All-Father",
        "description": "The chief of the gods, ruling over wisdom, poetry, and war, sacrificing one eye for wisdom.",
        "x": 50,
        "y": 10
      },
      {
        "id": "frigg",
        "name": "Frigg",
        "description": "Odin's wife, goddess of marriage, family, and foreknowledge, which she keeps secret.",
        "x": 40,
        "y": 15
      },
      {
        "id": "thor",
        "name": "Thor",
        "description": "Wielding Mjolnir, protector of Midgard (human world) against the giants.",
        "x": 30,
        "y": 20
      },
      {
        "id": "freyja",
        "name": "Freyja",
        "description": "Goddess of love, beauty, and war, who guides fallen warriors to Folkvangr.",
        "x": 60,
        "y": 20
      },
      {
        "id": "freyr",
        "name": "Freyr",
        "description": "A Vanir god of fertility, prosperity, and peace, symbolising earthly bounty.",
        "x": 70,
        "y": 15
      },
      {
        "id": "tyr",
        "name": "Tyr",
        "description": "Bold god of war, known for sacrificing his hand to the wolf Fenrir.",
        "x": 20,
        "y": 30
      },
      {
        "id": "loki",
        "name": "Loki",
        "description": "A cunning and shape-shifting trickster, often causing troubles yet also resolving them.",
        "x": 80,
        "y": 25
      },
      {
        "id": "heimdall",
        "name": "Heimdall",
        "description": "Guardian of the Bifrost bridge to Asgard, endowed with superhuman senses.",
        "x": 15,
        "y": 40
      },
      {
        "id": "baldr",
        "name": "Baldr",
        "description": "God of light and purity, tragically killed by Loki's trickery, symbolising fate's cruelty.",
        "x": 85,
        "y": 35
      },
      {
        "id": "norns",
        "name": "The Norns",
        "description": "Three giantesses who weave the fates of all beings, governing past, present, and future.",
        "x": 50,
        "y": 35
      },
      {
        "id": "fenrir",
        "name": "Fenrir",
        "description": "Child of Loki, the monstrous wolf foretold to devour Odin at Ragnarok.",
        "x": 25,
        "y": 50
      },
      {
        "id": "jormungandr",
        "name": "Jormungandr",
        "description": "The world-serpent encircling Midgard, fated to oppose Thor.",
        "x": 75,
        "y": 50
      },
      {
        "id": "asgard",
        "name": "Asgard",
        "description": "Realm of the Aesir, the fortress and temple of the gods.",
        "x": 50,
        "y": 55
      },
      {
        "id": "vanaheim",
        "name": "Vanaheim",
        "description": "Home of the Vanir, representing nature and fertility.",
        "x": 35,
        "y": 60
      },
      {
        "id": "jotunheim",
        "name": "Jotunheim",
        "description": "Realm of the giants, in constant opposition to the gods.",
        "x": 65,
        "y": 60
      },
      {
        "id": "midgard",
        "name": "Midgard",
        "description": "The human world, guarded by Odin and the gods.",
        "x": 50,
        "y": 70
      },
      {
        "id": "alfheim",
        "name": "Alfheim",
        "description": "Realm of the light elves, symbolising light and beauty.",
        "x": 30,
        "y": 75
      },
      {
        "id": "niflheim",
        "name": "Niflheim",
        "description": "The primordial world of mist and cold, origin of frost giants.",
        "x": 20,
        "y": 80
      },
      {
        "id": "muspelheim",
        "name": "Muspelheim",
        "description": "Realm of fire, source of destructive forces in Ragnarok.",
        "x": 80,
        "y": 80
      },
      {
        "id": "svartalfheim",
        "name": "Svartalfheim",
        "description": "Realm of dark elves and dwarves, where legendary weapons are forged.",
        "x": 70,
        "y": 75
      },
      {
        "id": "helheim",
        "name": "Helheim",
        "description": "The realm of the dead, contrasting with Valhalla, where those not slain in battle dwell.",
        "x": 40,
        "y": 85
      },
      {
        "id": "valhalla",
        "name": "Valhalla",
        "description": "Odin's hall of fallen warriors, who feast and train for Ragnarok.",
        "x": 60,
        "y": 85
      },
      {
        "id": "bifrost",
        "name": "Bifrost",
        "description": "The burning rainbow bridge connecting Asgard and Midgard.",
        "x": 50,
        "y": 45
      }
    ],
    "pages": [
      {
        "id": "rel_old_gods",
        "title": "Pagan Lore & Christian Cross",
        "paragraphs": [
          "To the Norsemen, the universe was held within the colossal branches of the world-ash tree, Yggdrasil. Their gods—such as Odin, the Allfather of wisdom and war, Thor, the red-bearded protector of mankind, and Freyr, the lord of harvest fertility—were powerful but ultimately mortal, destined to perish alongside their enemies in the apocalyptic battle of Ragnarök.",
          "In stark contrast, Anglo-Saxon Britain was anchored by ancient, peaceful Christian monasteries. These sacred complexes, though highly vulnerable to coastal Viking raids due to their unguarded wealth, served as centers of literacy, theology, and administration, preserving historical records on painstakingly hand-written sheepskin scrolls.",
          "As the Norsemen settled, they found themselves deeply impressed by the literary and administrative power of the Christian clergy. Rather than abandoning their ancestral gods, they initially adopted a polytheistic compromise, adding the 'White Christ' to their existing pantheon of Norse deities."
        ],
        "image": "/images/admin/religion_rel_old_gods_1784306043918.jpg",
        "hotspots": [
          {
            "id": "odin",
            "name": "Odin, the All-Father",
            "description": "The chief of the gods, ruling over wisdom, poetry, and war, sacrificing one eye for wisdom.",
            "x": 50,
            "y": 17
          },
          {
            "id": "heimdall",
            "name": "Heimdall",
            "description": "Guardian of the Bifrost bridge to Asgard, endowed with superhuman senses.",
            "x": 14,
            "y": 33
          },
          {
            "id": "thor",
            "name": "Thor",
            "description": "Wielding Mjolnir, protector of Midgard (human world) against the giants.",
            "x": 49,
            "y": 34
          },
          {
            "id": "norns",
            "name": "The Norns",
            "description": "Three giantesses who weave the fates of all beings, governing past, present, and future.",
            "x": 16,
            "y": 55
          },
          {
            "id": "fenrir",
            "name": "Fenrir",
            "description": "Child of Loki, the monstrous wolf foretold to devour Odin at Ragnarok.",
            "x": 17,
            "y": 66
          },
          {
            "id": "midgard",
            "name": "Midgard",
            "description": "The human world, guarded by Odin and the gods.",
            "x": 50,
            "y": 68
          }
        ]
      },
      {
        "id": "rel_syncretism",
        "title": "The Soapstone Dual Molds",
        "paragraphs": [
          "As Viking merchants, artisans, and farmers integrated into English society, they operated in a multi-faith market. Blacksmiths and metalworkers adapted to this spiritual fluidity by designing highly practical casting molds made from soft, heat-resistant soapstone.",
          "A single soapstone slab would be carved with sockets for Christian crucifix crosses on one side and Thor's hammers (Mjölnir) on the other. This allowed craftsmen to melt pewter or silver and cast whatever amulet their customers requested from a single tool, supplying both pagan and Christian clients with ease.",
          "This pragmatic approach was adopted by Viking merchants, who would wear both symbols or swap them depending on their trading destination. They would proudly display the cross in Christian Anglo-Saxon market towns to secure trade partnerships, and revert to Thor's hammer in traditional Norse drinking halls to maintain ancestral bonds."
        ],
        "image": "/images/admin/religion_rel_syncretism_1784306043919.jpg",
        "hotspots": [
          {
            "id": "spices",
            "name": "Spices",
            "description": "Precious imports from the East and South, serving as luxury seasonings in Viking society.",
            "x": 13,
            "y": 22
          },
          {
            "id": "viking_traders",
            "name": "Viking Traders",
            "description": "Merchants travelling between Scandinavia and Britain, wearing symbols of both faiths to gain trust.",
            "x": 50,
            "y": 30
          },
          {
            "id": "dual_faith_mould",
            "name": "Dual-faith Mould",
            "description": "A single mould capable of casting both Thor hammers and crosses, reflecting Anglo-Norse cultural fusion.",
            "x": 50,
            "y": 43
          },
          {
            "id": "christian_cross",
            "name": "Christian Cross",
            "description": "Faith symbol adopted by Vikings after contact with Christianity, used in trade and diplomacy.",
            "x": 29,
            "y": 70
          },
          {
            "id": "thor_syncretism",
            "name": "Thor",
            "description": "Traditional Viking guardian god, with Mjolnir being the most common amulet.",
            "x": 73,
            "y": 68
          },
          {
            "id": "silver_coins",
            "name": "Silver Coins",
            "description": "Principal hard currency in Viking trade, often cut for weight-based payment.",
            "x": 22,
            "y": 82
          }
        ]
      },
      {
        "id": "rel_conversion",
        "title": "Treaty Conversion & Baptism",
        "paragraphs": [
          "Over generations, spiritual convergence paved the way for permanent political conversion. Following his decisive defeat at Edington in 878, the Danish leader Guthrum accepted the terms of the Treaty of Wedmore, which demanded his conversion to Christianity as a prerequisite for peace and regional autonomy.",
          "In a grand ceremony, Guthrum and thirty of his elite commanders were baptized in Christian waters. King Alfred the Great acted as Guthrum's godfather, cementing a spiritual and feudal kinship, and gifted him the Christian name Æthelstan. This act elevated Guthrum to the rank of a legitimate Christian king recognized by other European states.",
          "Following this royal example, mass baptisms occurred across the Danelaw. Scandinavian rulers began minting coins bearing Christian crosses alongside their own names, and within two generations, the descendants of the pagan raiders who had sacked Lindisfarne were building local parish churches and burying their dead in sacred Christian ground."
        ],
        "image": "/images/admin/religion_rel_conversion_1784306043920.jpg",
        "hotspots": [
          {
            "id": "saxon_church",
            "name": "Saxon Church Interior",
            "description": "Baptism took place inside a Saxon stone church, marking formal acceptance of Christianity.",
            "x": 22,
            "y": 18
          },
          {
            "id": "crucifix",
            "name": "Crucifix",
            "description": "The crucifix inside the church, central Christian symbol of the baptism ceremony.",
            "x": 70,
            "y": 27
          },
          {
            "id": "clergy_nobles",
            "name": "Clergy and Nobles",
            "description": "Saxon clergy officiating the ceremony, with Viking and Saxon nobles as witnesses.",
            "x": 24,
            "y": 57
          },
          {
            "id": "guthrum_baptism_event",
            "name": "Guthrum's Baptism",
            "description": "Viking leader Guthrum was baptised in the presence of Alfred, taking the Christian name Athelstan.",
            "x": 47,
            "y": 57
          },
          {
            "id": "baptismal_font",
            "name": "Baptismal Font",
            "description": "The font used for baptism, symbolising purification and rebirth.",
            "x": 45,
            "y": 68
          }
        ]
      }
    ]
  },
  {
    "id": "warfare",
    "gothicTitle": "The Clash of Shields",
    "englishTitle": "Warfare & Tactics",
    "runicSubtitle": "ᚢᛅᚱ᛫ᛅᚾᛏ᛫ᛋᚢᚢᚱᛏ",
    "era": "Battlefield Tactics",
    "summary": "The defensive skjaldborg, pattern-welded iron, and the terrifying Dane axe.",
    "paragraphs": [
      "Warfare in the Viking Age was an intimate, terrifying affair of shields, iron, and blood. The shield wall ('skjaldborg') was the cornerstone of tactical combat. Circular lime-wood shields overlapped to form a continuous, defensive wall."
    ],
    "defaultImage": "/images/viking_warfare_1784019435680.jpg",
    "hotspots": [
      {
        "id": "skjaldborg",
        "name": "Skjaldborg (Shield Wall)",
        "description": "Core Viking infantry tactic, with frontline warriors overlapping shields to form an impenetrable wall.",
        "x": 50,
        "y": 40
      },
      {
        "id": "banner",
        "name": "Banner",
        "description": "Clan or tribal flag used for command and rallying morale during battle.",
        "x": 25,
        "y": 20
      },
      {
        "id": "horn",
        "name": "Horn",
        "description": "Instrument for signalling attack, retreat, or formation changes.",
        "x": 75,
        "y": 20
      },
      {
        "id": "spears",
        "name": "Spears",
        "description": "Long thrusting weapons extended through gaps in the shield wall for attack.",
        "x": 40,
        "y": 55
      },
      {
        "id": "hand_axe",
        "name": "Hand Axe",
        "description": "Secondary weapon for parrying and quick hacking strikes in close combat.",
        "x": 65,
        "y": 60
      }
    ],
    "pages": [
      {
        "id": "war_shield_wall",
        "title": "The Skjaldborg Shield Wall",
        "paragraphs": [
          "The absolute core of Viking Age infantry combat was the 'skjaldborg' (shield wall). Both the Scandinavian raiders and the defending Anglo-Saxon forces deployed this ancient, interlocking defensive formation on the battlefield, demanding immense physical coordination and courage.",
          "Warriors stood shoulder-to-shoulder, overlapping their circular wooden shields made of light, shock-absorbing linden or lime-wood. This created an impenetrable barrier of wood, leather, and iron bosses, providing vital protection against flights of arrows, javelins, and heavy throwing axes.",
          "Behind this wooden wall, soldiers thrust long, steel-tipped spears through gaps in the shields to impale opponents, while shock troopers waited with two-handed weapons. A shield wall clash was a slow, exhausting, and bloody affair of crushing pressure, where the first side to break physical cohesion faced instant slaughter."
        ],
        "image": "/images/admin/warfare_war_shield_wall_1784306043920.jpg",
        "hotspots": [
          {
            "id": "horn",
            "name": "Horn",
            "description": "Instrument for signalling attack, retreat, or formation changes.",
            "x": 45,
            "y": 22
          },
          {
            "id": "banner",
            "name": "Banner",
            "description": "Clan or tribal flag used for command and rallying morale during battle.",
            "x": 62,
            "y": 20
          },
          {
            "id": "spears",
            "name": "Spears",
            "description": "Long thrusting weapons extended through gaps in the shield wall for attack.",
            "x": 68,
            "y": 32
          },
          {
            "id": "skjaldborg",
            "name": "Skjaldborg (Shield Wall)",
            "description": "Core Viking infantry tactic, with frontline warriors overlapping shields to form an impenetrable wall.",
            "x": 50,
            "y": 42
          },
          {
            "id": "hand_axe",
            "name": "Hand Axe",
            "description": "Secondary weapon for parrying and quick hacking strikes in close combat.",
            "x": 81,
            "y": 65
          }
        ]
      },
      {
        "id": "war_weapons",
        "title": "Iron Blades & Giant Battle Axes",
        "paragraphs": [
          "For the Norse elite, the sword was the ultimate status symbol, representing wealth, power, and family prestige. Often pattern-welded by twisting multiple rods of iron and high-carbon steel together at white-hot heat, these blades were incredibly flexible and razor-sharp, decorated with elaborate silver and gold hilt designs.",
          "In contrast, the long-shafted Dane Axe was a pure weapon of terror. Wielded with both hands by elite huscarls, its broad, thin-profile blade could shear through solid oak shields, split iron helmets, and cut down armored cavalry horses in a single, devastating swing, spreading psychological panic through enemy ranks.",
          "For protection, warriors wore conical iron helmets with a sturdy nasal guard to protect the face from downward slashing blows. Contrary to popular Victorian myths, historical helmets never featured horns, as any protrusion would catch enemy blades rather than deflect them, proving to be a fatal design flaw in close-quarters combat."
        ],
        "image": "/images/admin/warfare_war_weapons_1784306043921.jpg",
        "hotspots": [
          {
            "id": "nobles_chieftains",
            "name": "Nobles and Chieftains",
            "description": "Equipped with pattern-welded swords, fine hand axes, and gilt daggers, symbols of power and wealth.",
            "x": 14,
            "y": 20
          },
          {
            "id": "free_warriors",
            "name": "Free Commoner Warriors",
            "description": "Armed with spears, hand axes, round shields, and simple sax knives as the main fighting force.",
            "x": 14,
            "y": 40
          },
          {
            "id": "farmers_retinues",
            "name": "Farmers and Retinues",
            "description": "Using repurposed farming tools like scythes, wooden clubs, and javelins.",
            "x": 14,
            "y": 55
          },
          {
            "id": "slaves_thralls",
            "name": "Slaves (Thralls)",
            "description": "Armed with simple stone hammers and wooden clubs, often used as auxiliaries or cannon fodder.",
            "x": 14,
            "y": 67
          },
          {
            "id": "danish_long_axe",
            "name": "Danish Long Axe",
            "description": "Heavy two-handed armour-piercing axe of great power, favoured by later Viking elites.",
            "x": 17,
            "y": 85
          },
          {
            "id": "hunting_bow",
            "name": "Hunting Bow",
            "description": "Used for hunting and long-range harassment, made from yew or elm.",
            "x": 35,
            "y": 86
          }
        ]
      },
      {
        "id": "war_armor",
        "title": "The Defensive Byrnie & War Gear",
        "paragraphs": [
          "Only wealthy chieftains, kings, and their elite retainers could afford the exceptional protection of a complete iron byrnie—a chainmail tunic meticulously hand-crafted from tens of thousands of tiny, interlocking iron rings that were individually closed with iron rivets.",
          "An iron byrnie was highly effective at stopping slashing blows from swords, spears, and axes, though it offered less protection against the heavy blunt-force trauma of clubs or direct heavy thrusts, which could fracture ribs or cause severe internal bleeding beneath the armor.",
          "The vast majority of common soldiers went to battle wearing nothing but thick padded wool tunics or heavy leather vests, relying entirely on their heavy linden-wood shields, group coordination, and raw courage to survive the terrifying, deafening clash of steel."
        ],
        "image": "/images/admin/warfare_war_armor_1784306043926.jpg",
        "hotspots": [
          {
            "id": "hornless_helmet",
            "name": "Hornless Iron Helmet",
            "description": "Iconic Viking helmet, actually hornless, with a domed iron construction.",
            "x": 50,
            "y": 16
          },
          {
            "id": "chainmail",
            "name": "Chainmail",
            "description": "Metal ring armour worn by nobles and elite warriors for effective protection.",
            "x": 45,
            "y": 33
          },
          {
            "id": "noble_armor",
            "name": "Noble",
            "description": "Full set of chainmail, fine iron helmet, pattern-welded sword, and ornate cloak.",
            "x": 20,
            "y": 80
          },
          {
            "id": "common_warrior",
            "name": "Common Warrior",
            "description": "Medium outfit with iron helmet (or leather cap), spear, round shield, and sax knife.",
            "x": 42,
            "y": 80
          },
          {
            "id": "retinue_farmer",
            "name": "Retinue and Farmer",
            "description": "Primarily with leather caps, simple spears, and repurposed farm tools, with lighter protection.",
            "x": 64,
            "y": 80
          },
          {
            "id": "slave_thrall",
            "name": "Slave (Thrall)",
            "description": "Almost no formal protection, armed only with simple clubs or stone hammers, at the bottom of the hierarchy.",
            "x": 84,
            "y": 80
          }
        ]
      }
    ]
  }
];
