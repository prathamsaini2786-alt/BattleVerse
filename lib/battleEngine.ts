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

export type BattleRoyaleResult = {
  winner: BattleFighter;
  fighters: BattleFighter[];
  events: BattleEvent[];
  rounds: number;
};

function calculateDamage(attacker: BattleFighter) {
  const baseDamage = attacker.power * 0.08;

  const variation =
    Math.random() * 12 - 6;

  return Math.max(
    4,
    Math.round(baseDamage + variation)
  );
}

export function simulateBattleRoyale(
  characters: Character[]
): BattleRoyaleResult {
  const fighters: BattleFighter[] = characters.map(
    (character) => ({
      ...character,
      health: 100,
      alive: true,
    })
  );

  const events: BattleEvent[] = [];

  let round = 0;

  while (
    fighters.filter((fighter) => fighter.alive).length > 1 &&
    round < 100
  ) {
    round++;

    const alive = fighters.filter(
      (fighter) => fighter.alive
    );

    const attacker =
      alive[Math.floor(Math.random() * alive.length)];

    const possibleTargets = alive.filter(
      (fighter) => fighter.id !== attacker.id
    );

    const defender =
      possibleTargets[
        Math.floor(Math.random() * possibleTargets.length)
      ];

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

  const winner =
    fighters.find((fighter) => fighter.alive) ??
    fighters[0];

  return {
    winner,
    fighters,
    events,
    rounds: round,
  };
}