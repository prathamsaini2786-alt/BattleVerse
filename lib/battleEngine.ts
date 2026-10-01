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
  const attackPower = attacker.power;

  const defenseReduction = defender.defense * 0.35;

  const durabilityReduction =
    defender.durability * 0.15;

  const baseDamage =
    attackPower -
    defenseReduction -
    durabilityReduction;

  const variation =
    Math.random() * 12 - 6;

  return Math.max(
    4,
    Math.round(baseDamage + variation)
  );
}

function calculateCritChance(
  attacker: BattleFighter
) {
  return Math.min(
    0.35,
    attacker.speed / 400
  );
}

function calculateAttackOrder(
  fighterOne: BattleFighter,
  fighterTwo: BattleFighter
) {
  const speedOne =
    fighterOne.speed + Math.random() * 20;

  const speedTwo =
    fighterTwo.speed + Math.random() * 20;

  return speedOne >= speedTwo
    ? [fighterOne, fighterTwo]
    : [fighterTwo, fighterOne];
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

  while (
    fighterOne.alive &&
    fighterTwo.alive &&
    round < 100
  ) {
    round++;

    const [
      firstAttacker,
      secondAttacker,
    ] = calculateAttackOrder(
      fighterOne,
      fighterTwo
    );

    const attackers = [
      firstAttacker,
      secondAttacker,
    ];

    for (const attacker of attackers) {
      if (!attacker.alive) continue;

      const defender =
        attacker.id === fighterOne.id
          ? fighterTwo
          : fighterOne;

      if (!defender.alive) break;

      let damage = calculateDamage(
        attacker,
        defender
      );

      const isCritical =
        Math.random() <
        calculateCritChance(attacker);

      if (isCritical) {
        damage = Math.round(damage * 1.5);
      }

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
        message: defender.alive
          ? isCritical
            ? `${attacker.name} lands a CRITICAL HIT on ${defender.name} for ${damage} damage.`
            : `${attacker.name} attacks ${defender.name} for ${damage} damage.`
          : `${attacker.name} eliminates ${defender.name} with ${damage} damage.`,
      });

      if (!defender.alive) break;
    }
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