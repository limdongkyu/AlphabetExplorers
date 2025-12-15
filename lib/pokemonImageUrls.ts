// 포켓몬스터 이미지 URL 매핑
// PokeAPI의 공식 스프라이트 이미지 사용
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png

// 포켓몬 이름을 ID로 매핑
export const pokemonIdMap: Record<string, number> = {
  // A
  'Abra': 63,
  'Arbok': 24,
  'Articuno': 144,
  'Aerodactyl': 142,
  'Alakazam': 65,
  'Aipom': 190,
  'Ampharos': 181,
  'Ariados': 168,
  'Azumarill': 184,
  'Azurill': 298,
  
  // B
  'Bulbasaur': 1,
  'Butterfree': 12,
  'Beedrill': 15,
  'Blastoise': 9,
  'Bellsprout': 69,
  'Blissey': 242,
  'Breloom': 286,
  'Bayleef': 153,
  'Blaziken': 257,
  'Buneary': 427,
  
  // C
  'Charmander': 4,
  'Charizard': 6,
  'Caterpie': 10,
  'Clefairy': 35,
  'Cloyster': 91,
  'Chikorita': 152,
  'Cyndaquil': 155,
  'Croconaw': 159,
  'Celebi': 251,
  'Combusken': 256,
  
  // D
  'Dragonite': 149,
  'Dratini': 147,
  'Dugtrio': 51,
  'Dewgong': 87,
  'Ditto': 132,
  'Dunsparce': 206,
  'Donphan': 232,
  'Delibird': 225,
  'Delcatty': 301,
  'Dustox': 269,
  
  // E
  'Eevee': 133,
  'Ekans': 23,
  'Electabuzz': 125,
  'Electrode': 101,
  'Exeggcute': 102,
  'Exeggutor': 103,
  'Elekid': 239,
  'Entei': 244,
  'Espeon': 196,
  'Empoleon': 395,
  
  // F
  'Flareon': 136,
  'Farfetchd': 83,
  'Fearow': 22,
  'Feraligatr': 160,
  'Forretress': 205,
  'Furret': 162,
  'Flaaffy': 180,
  'Froslass': 478,
  'Flygon': 330,
  'Frosmoth': 873,
  
  // G
  'Gengar': 94,
  'Golbat': 42,
  'Golduck': 55,
  'Golem': 76,
  'Growlithe': 58,
  'Glaceon': 471,
  'Garchomp': 445,
  'Gallade': 475,
  'Giratina': 487,
  'Gyarados': 130,
  
  // H
  'Haunter': 93,
  'Hitmonchan': 107,
  'Hitmonlee': 106,
  'Horsea': 116,
  'Hypno': 97,
  'Hoothoot': 163,
  'Hoppip': 187,
  'Heracross': 214,
  'Houndoom': 229,
  'Hariyama': 297,
  
  // I
  'Ivysaur': 2,
  'Igglybuff': 174,
  'Illumise': 314,
  'Infernape': 392,
  'Inkay': 686,
  'Inteleon': 818,
  'Incineroar': 727,
  'Ivysaur': 2,
  'Icy': 87,
  'Iron': 374,
  
  // J
  'Jigglypuff': 39,
  'Jolteon': 135,
  'Jynx': 124,
  'Jumpluff': 189,
  'Jirachi': 385,
  'Joltik': 595,
  'Jangmo-o': 782,
  'Jellicent': 593,
  'Jumpluff': 189,
  'Jigglypuff': 39,
  
  // K
  'Kadabra': 64,
  'Kakuna': 14,
  'Kangaskhan': 115,
  'Kingler': 99,
  'Koffing': 109,
  'Kirlia': 281,
  'Kecleon': 352,
  'Kyogre': 382,
  'Klefki': 707,
  'Komala': 775,
  
  // L
  'Lapras': 131,
  'Lickitung': 108,
  'Lucario': 448,
  'Lugia': 249,
  'Lunatone': 337,
  'Luxray': 405,
  'Lycanroc': 745,
  'Litten': 725,
  'Lurantis': 754,
  'Latias': 380,
  
  // M
  'Machamp': 68,
  'Machoke': 67,
  'Machop': 66,
  'Magikarp': 129,
  'Magnemite': 81,
  'Magneton': 82,
  'Mamoswine': 473,
  'Manaphy': 490,
  'Marshadow': 802,
  'Mawile': 303,
  
  // N
  'Nidoking': 34,
  'Nidoqueen': 31,
  'Nidoran': 29,
  'Ninetales': 38,
  'Noctowl': 164,
  'Nuzleaf': 274,
  'Nihilego': 793,
  'Noivern': 715,
  'Naganadel': 804,
  'Ninetales': 38,
  
  // O
  'Oddish': 43,
  'Omanyte': 138,
  'Omastar': 139,
  'Onix': 95,
  'Octillery': 224,
  'Oddish': 43,
  'Oshawott': 501,
  'Oranguru': 765,
  'Obstagoon': 862,
  'Onix': 95,
  'Oricorio': 741,
  
  // P
  'Pikachu': 25,
  'Pidgeot': 18,
  'Pidgeotto': 17,
  'Pidgey': 16,
  'Pinsir': 127,
  'Poliwag': 60,
  'Poliwhirl': 61,
  'Poliwrath': 62,
  'Ponyta': 77,
  'Primeape': 57,
  
  // Q
  'Quagsire': 195,
  'Quilava': 156,
  'Qwilfish': 211,
  'Quaxly': 912,
  'Quaxwell': 913,
  'Quaquaval': 914,
  
  // R
  'Raichu': 26,
  'Rapidash': 78,
  'Raticate': 20,
  'Rattata': 19,
  'Rayquaza': 384,
  'Regice': 378,
  'Regirock': 377,
  'Registeel': 379,
  'Riolu': 447,
  'Roserade': 407,
  
  // S
  'Squirtle': 7,
  'Scyther': 123,
  'Starmie': 121,
  'Staryu': 120,
  'Snorlax': 143,
  'Sceptile': 254,
  'Swampert': 260,
  'Salamence': 373,
  'Shaymin': 492,
  'Serperior': 497,
  
  // T
  'Tauros': 128,
  'Tangela': 114,
  'Tentacool': 72,
  'Tentacruel': 73,
  'Togepi': 175,
  'Torchic': 255,
  'Treecko': 252,
  'Typhlosion': 157,
  'Tyrantrum': 697,
  'Talonflame': 663,
  
  // U
  'Umbreon': 197,
  'Ursaring': 217,
  'Unown': 201,
  'Ursaluna': 901,
  'Umbreon': 197,
  'Ursaring': 217,
  'Urshifu': 892,
  
  // V
  'Vaporeon': 134,
  'Venomoth': 49,
  'Venonat': 48,
  'Venusaur': 3,
  'Victreebel': 71,
  'Vileplume': 45,
  'Volcarona': 637,
  'Vanilluxe': 584,
  'Vespiquen': 416,
  'Vibrava': 329,
  
  // W
  'Wartortle': 8,
  'Weedle': 13,
  'Weepinbell': 70,
  'Weezing': 110,
  'Wigglytuff': 40,
  'Wobbuffet': 202,
  'Wurmple': 265,
  'Wailord': 321,
  'Whiscash': 340,
  'Wingull': 278,
  
  // X
  'Xatu': 178,
  'Xerneas': 716,
  'Xurkitree': 796,
  
  // Y
  'Yanma': 193,
  'Yveltal': 717,
  'Yamper': 835,
  'Yanmega': 469,
  'Yungoos': 734,
  
  // Z
  'Zapdos': 145,
  'Zubat': 41,
  'Zangoose': 335,
  'Zigzagoon': 263,
  'Zoroark': 571,
  'Zorua': 570,
  'Zygarde': 718,
  'Zacian': 888,
  'Zamazenta': 889,
  'Zekrom': 644,
};

// 포켓몬 이미지 URL 가져오기
export function getPokemonImageUrl(pokemonName: string): string | undefined {
  const pokemonId = pokemonIdMap[pokemonName];
  if (pokemonId) {
    // PokeAPI 공식 아트워크 이미지 사용 (더 큰 이미지)
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }
  return undefined;
}

