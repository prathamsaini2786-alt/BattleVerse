export type Character = {
  id: string;
  name: string;
  universe: string;

  power: number;
  defense: number;
  speed: number;
  durability: number;

  ability: string;

  accent: string;
  description: string;
  image: string;
};

export const characters: Character[] = [
  {
    id: "goku",
    name: "Goku",
    universe: "Dragon Ball",

    power: 98,
    defense: 94,
    speed: 97,
    durability: 98,

    ability: "Ultra Instinct",

    accent: "from-orange-500/40 to-red-600/10",

    description:
      "A Saiyan warrior who constantly pushes beyond his limits.",

    image: "/characters/goku.jpeg",
  },

  {
    id: "gojo",
    name: "Gojo",
    universe: "Jujutsu Kaisen",

    power: 96,
    defense: 98,
    speed: 95,
    durability: 92,

    ability: "Infinity",

    accent: "from-blue-500/40 to-purple-600/10",

    description:
      "The strongest modern sorcerer with limitless potential.",

    image: "/characters/gojo.jpeg",
  },

  {
    id: "luffy",
    name: "Luffy",
    universe: "One Piece",

    power: 94,
    defense: 93,
    speed: 91,
    durability: 97,

    ability: "Gear 5",

    accent: "from-red-500/40 to-orange-500/10",

    description:
      "A pirate captain chasing the ultimate freedom.",

    image: "/characters/luffy.jpeg",
  },

  {
    id: "naruto",
    name: "Naruto",
    universe: "Naruto",

    power: 93,
    defense: 91,
    speed: 94,
    durability: 95,

    ability: "Six Paths Sage Mode",

    accent: "from-orange-500/40 to-yellow-500/10",

    description:
      "A shinobi who turned his struggles into extraordinary power.",

    image: "/characters/naruto.jpeg",
  },

  {
    id: "batman",
    name: "Batman",
    universe: "DC",

    power: 87,
    defense: 88,
    speed: 84,
    durability: 82,

    ability: "Preparation",

    accent: "from-zinc-400/30 to-purple-900/10",

    description:
      "A tactical master who relies on preparation and technology.",

    image: "/characters/batman.jpeg",
  },

  {
    id: "spiderman",
    name: "Spider-Man",
    universe: "Marvel",

    power: 89,
    defense: 87,
    speed: 96,
    durability: 88,

    ability: "Spider-Sense",

    accent: "from-red-600/40 to-blue-600/10",

    description:
      "A super-powered hero with agility, reflexes and spider-sense.",

    image: "/characters/spiderman.jpeg",
  },
];