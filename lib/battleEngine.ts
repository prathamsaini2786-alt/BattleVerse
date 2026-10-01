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
  type:
    | "attack"
    | "critical"
    | "dodge"
    | "ability"
    | "elimination";
};

export type BattleStats = {
  totalAttacks: number;
  criticalHits: number;
  dodges: number;
  abilitiesUsed: number;
  totalDamage: Record<string, number>;
};

export type BattleResult = {
  winner: BattleFighter;
  fighters: BattleFighter[];
  events: BattleEvent[];
  rounds: number;
  stats: BattleStats;
};

function calculateDamage(
  attacker: BattleFighter,
  defender: BattleFighter
) {
  const powerDamage = attacker.power * 0.9;

  const defenseReduction = defender.defense * 0.45;

  const durabilityReduction =
    defender.durability * 0.2;

  const variation =
    Math.random() * 16 - 8;

  const damage =
    powerDamage -
    defenseReduction -
    durabilityReduction +
    variation;

  return Math.max(5, Math.round(damage));
}

function calculateCritChance(
  attacker: BattleFighter
) {
  return Math.min(
    0.3,
    0.08 + attacker.speed / 500
  );
}

function calculateDodgeChance(
  defender: BattleFighter
) {
  return Math.min(
    0.22,
    defender.speed / 600
  );
}

function calculateAttackOrder(
  fighterOne: BattleFighter,
  fighterTwo: BattleFighter
) {
  const speedOne =
    fighterOne.speed + Math.random() * 25;

  const speedTwo =
    fighterTwo.speed + Math.random() * 25;

  return speedOne >= speedTwo
    ? [fighterOne, fighterTwo]
    : [fighterTwo, fighterOne];
}

function applyAbility(
  attacker: BattleFighter,
  defender: BattleFighter,
  damage: number
) {
  let finalDamage = damage;
  let message = "";
  let activated = false;

  switch (attacker.id) {
    case "goku":
      if (Math.random() < 0.12) {
        finalDamage = Math.round(damage * 1.35);
        activated = true;

        message = `${attacker.name} activates Ultra Instinct and unleashes a devastating attack.`;
      }
      break;

    case "gojo":
      if (Math.random() < 0.15) {
        finalDamage = Math.round(damage * 1.25);
        activated = true;

        message = `${attacker.name} uses Infinity and overwhelms ${defender.name}.`;
      }
      break;

    case "luffy":
      if (Math.random() < 0.15) {
        finalDamage = Math.round(damage * 1.3);
        activated = true;

        message = `${attacker.name} activates Gear 5 and dramatically increases the attack.`;
      }
      break;

    case "naruto":
      if (Math.random() < 0.14) {
        finalDamage = Math.round(damage * 1.3);
        activated = true;

        message = `${attacker.name} enters Six Paths Sage Mode and powers up the attack.`;
      }
      break;

    case "batman":
      if (Math.random() < 0.12) {
        finalDamage = Math.round(damage * 1.2);
        activated = true;

        message = `${attacker.name} exploits a weakness using Preparation.`;
      }
      break;

    case "spiderman":
      if (Math.random() < 0.18) {
        finalDamage = Math.round(damage * 1.2);
        activated = true;

        message = `${attacker.name}'s Spider-Sense predicts the opening and enables a counterattack.`;
      }
      break;
  }

  return {
    damage: finalDamage,
    message,
    activated,
  };
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

  const stats: BattleStats = {
    totalAttacks: 0,
    criticalHits: 0,
    dodges: 0,
    abilitiesUsed: 0,
    totalDamage: {
      [fighterOne.id]: 0,
      [fighterTwo.id]: 0,
    },
  };

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

      stats.totalAttacks++;

      /*
       * Dodge
       */
      const dodges =
        Math.random() <
        calculateDodgeChance(defender);

      if (dodges) {
        stats.dodges++;

   events.push({
  round,
  attacker: attacker.name,
  defender: defender.name,
  damage: 0,
  type: "dodge",
  message:
    `${defender.name} dodges ${attacker.name}'s attack using incredible speed.`,
});

        continue;
      }

      let damage = calculateDamage(
        attacker,
        defender
      );

      /*
       * Critical hit
       */
      const isCritical =
        Math.random() <
        calculateCritChance(attacker);

      if (isCritical) {
        stats.criticalHits++;

        damage = Math.round(
          damage * 1.5
        );
      }

      /*
       * Character ability
       */
      const abilityResult = applyAbility(
        attacker,
        defender,
        damage
      );

      damage = abilityResult.damage;

      if (abilityResult.activated) {
        stats.abilitiesUsed++;
      }

      /*
       * Apply damage
       */
      defender.health = Math.max(
        0,
        defender.health - damage
      );

      stats.totalDamage[attacker.id] += damage;

      if (defender.health === 0) {
        defender.alive = false;
      }

      /*
       * Battle message
       */
      let message: string;

      if (!defender.alive) {
        message =
          `${attacker.name} eliminates ${defender.name} with ${damage} damage.`;
      } else if (abilityResult.message) {
        message =
          `${abilityResult.message} ${damage} damage dealt.`;
      } else if (isCritical) {
        message =
          `${attacker.name} lands a CRITICAL HIT on ${defender.name} for ${damage} damage.`;
      } else {
        message =
          `${attacker.name} attacks ${defender.name} for ${damage} damage.`;
      }

      let eventType: BattleEvent["type"] = "attack";

if (!defender.alive) {
  eventType = "elimination";
} else if (abilityResult.activated) {
  eventType = "ability";
} else if (isCritical) {
  eventType = "critical";
}

events.push({
  round,
  attacker: attacker.name,
  defender: defender.name,
  damage,
  message,
  type: eventType,
});

      if (!defender.alive) break;
    }
  }

  const winner =
    fighterOne.alive
      ? fighterOne
      : fighterTwo;

  return {
    winner,
    fighters,
    events,
    rounds: round,
    stats,
  };
}