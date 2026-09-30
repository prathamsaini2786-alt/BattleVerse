import type { Character } from "@/data/characters";

export type BattleFighter = Character & {
  health: number;
  alive: boolean;
};

export type BattleEvent = {
  round: number;
  attacker: string;
  defender: string;
  damage: number;
  message: string;
};

export type BattleResult = {
  winner: BattleFighter;
  fighters: BattleFighter[];
  events: BattleEvent[];
  rounds: number;
};

function calculateDamage(attacker: BattleFighter) {
  const baseDamage = attacker.power * 0.08;

  const variation = Math.random() * 12 - 6;

  return Math.max(
    4,
    Math.round(baseDamage + variation)
  );
}

export function simulateBattle(
  characterOne: Character,
  characterTwo: Character
): BattleResult {
  const fighterOne: BattleFighter = {
    ...characterOne,
    health: 100,
    alive: true,
  };

  const fighterTwo: BattleFighter = {
    ...characterTwo,
    health: 100,
    alive: true,
  };

  const fighters = [fighterOne, fighterTwo];

  const events: BattleEvent[] = [];

  let round = 0;

  while (
    fighterOne.alive &&
    fighterTwo.alive &&
    round < 100
  ) {
    round++;

    const attacker =
      Math.random() < 0.5
        ? fighterOne
        : fighterTwo;

    const defender =
      attacker.id === fighterOne.id
        ? fighterTwo
        : fighterOne;

    const damage = calculateDamage(attacker);

    defender.health = Math.max(
      0,
      defender.health - damage
    );

    if (defender.health === 0) {
      defender.alive = false;
    }

    events.push({
      round,
      attacker: attacker.name,
      defender: defender.name,
      damage,
      message:
        defender.health === 0
          ? `${attacker.name} eliminates ${defender.name}.`
          : `${attacker.name} attacks ${defender.name} for ${damage} damage.`,
    });
  }

  const winner = fighterOne.alive
    ? fighterOne
    : fighterTwo;

  return {
    winner,
    fighters,
    events,
    rounds: round,
  };
}