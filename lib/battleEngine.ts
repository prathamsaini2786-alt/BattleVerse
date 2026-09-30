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

function calculateDamage(
  attacker: BattleFighter,
  defender: BattleFighter
) {
  // Power determines the attack's base strength.
  const baseDamage = attacker.power * 0.12;

  // Defense reduces incoming damage.
  const defenseMultiplier =
    1 - defender.defense / 250;

  // Small randomness keeps battles unpredictable.
  const variation =
    0.8 + Math.random() * 0.4;

  let damage =
    baseDamage *
    defenseMultiplier *
    variation;

  // Character-specific abilities.
  if (attacker.ability === "Ultra Instinct") {
    damage *= 1.08;
  }

  if (attacker.ability === "Gear Fifth") {
    damage *= 1.05;
  }

  if (attacker.ability === "Six Paths Mode") {
    damage *= 1.06;
  }

  if (attacker.ability === "Infinity") {
    damage *= 1.04;
  }

  if (attacker.ability === "Preparation") {
    damage *= 1.03;
  }

  if (attacker.ability === "Spider-Sense") {
    damage *= 1.02;
  }

  return Math.max(4, Math.round(damage));
}

function determineFirstAttacker(
  fighterOne: BattleFighter,
  fighterTwo: BattleFighter
) {
  if (fighterOne.speed > fighterTwo.speed) {
    return fighterOne;
  }

  if (fighterTwo.speed > fighterOne.speed) {
    return fighterTwo;
  }

  return Math.random() < 0.5
    ? fighterOne
    : fighterTwo;
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

  const fighters = [
    fighterOne,
    fighterTwo,
  ];

  const events: BattleEvent[] = [];

  let round = 0;

  let attacker =
    determineFirstAttacker(
      fighterOne,
      fighterTwo
    );

  let defender =
    attacker.id === fighterOne.id
      ? fighterTwo
      : fighterOne;

  while (
    fighterOne.alive &&
    fighterTwo.alive &&
    round < 100
  ) {
    round++;

    const damage = calculateDamage(
      attacker,
      defender
    );

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

    if (!defender.alive) {
      break;
    }

    const previousAttacker = attacker;

    attacker = defender;
    defender = previousAttacker;
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