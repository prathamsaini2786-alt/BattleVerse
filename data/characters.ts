export type Character = {
  id: string;
  name: string;
  universe: string;
  power: number;
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
    accent: "from-red-600/40 to-blue-600/10",
    description:
      "A super-powered hero with agility, reflexes and spider-sense.",
    image: "/characters/spiderman.jpeg",
  },
];