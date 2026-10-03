import type { Character } from "@/data/characters";

export type RoyaleFighter = Character & {
  health: number;
  alive: boolean;
  placement?: number;
};

export type RoyaleEvent = {
  round: number;
  attacker: string;
  defender: string;
  damage: number;
  type:
    | "attack"
    | "critical"
    | "dodge"
    | "ability"
    | "elimination";
  message: string;
};

export type RoyaleStats = {
  totalAttacks: number;
  criticalHits: number;
  dodges: number;
  abilitiesUsed: number;
  eliminations: number;
  totalDamage: Record<string, number>;
};

export type BattleRoyaleResult = {
  winner: RoyaleFighter;
  fighters: RoyaleFighter[];
  events: RoyaleEvent[];
  rounds: number;
  stats: RoyaleStats;
};

function calculateDamage(
  attacker: RoyaleFighter,
  defender: RoyaleFighter
) {
  const baseDamage =
    attacker.power * 0.9 -
    defender.defense * 0.4 -
    defender.durability * 0.18;

  const variation = Math.random() * 16 - 8;

  return Math.max(
    5,
    Math.round(baseDamage + variation)
  );
}

function calculateCritChance(
  attacker: RoyaleFighter
) {
  return Math.min(
    0.3,
    0.08 + attacker.speed / 500
  );
}

function calculateDodgeChance(
  defender: RoyaleFighter
) {
  return Math.min(
    0.22,
    defender.speed / 600
  );
}

function calculateAbility(
  attacker: RoyaleFighter,
  defender: RoyaleFighter,
  damage: number
) {
  let finalDamage = damage;
  let activated = false;
  let message = "";

  switch (attacker.id) {
    case "goku":
      if (Math.random() < 0.12) {
        finalDamage = Math.round(damage * 1.35);
        activated = true;
        message =
          `${attacker.name} activates Ultra Instinct and unleashes a devastating strike on ${defender.name}.`;
      }
      break;

    case "gojo":
      if (Math.random() < 0.15) {
        finalDamage = Math.round(damage * 1.25);
        activated = true;
        message =
          `${attacker.name} uses Infinity and overwhelms ${defender.name}.`;
      }
      break;

    case "luffy":
      if (Math.random() < 0.15) {
        finalDamage = Math.round(damage * 1.3);
        activated = true;
        message =
          `${attacker.name} activates Gear 5 and massively powers up the attack.`;
      }
      break;

    case "naruto":
      if (Math.random() < 0.14) {
        finalDamage = Math.round(damage * 1.3);
        activated = true;
        message =
          `${attacker.name} enters Six Paths Sage Mode and powers up the attack.`;
      }
      break;

    case "batman":
      if (Math.random() < 0.12) {
        finalDamage = Math.round(damage * 1.2);
        activated = true;
        message =
          `${attacker.name} exploits ${defender.name}'s weakness using Preparation.`;
      }
      break;

    case "spiderman":
      if (Math.random() < 0.18) {
        finalDamage = Math.round(damage * 1.2);
        activated = true;
        message =
          `${attacker.name}'s Spider-Sense predicts the opening and enables a counterattack.`;
      }
      break;
  }

  return {
    damage: finalDamage,
    activated,
    message,
  };
}

function getAttackOrder(
  fighters: RoyaleFighter[]
) {
  return [...fighters]
    .filter((fighter) => fighter.alive)
    .sort((a, b) => {
      const speedA =
        a.speed + Math.random() * 25;

      const speedB =
        b.speed + Math.random() * 25;

      return speedB - speedA;
    });
}

function getRandomTarget(
  attacker: RoyaleFighter,
  fighters: RoyaleFighter[]
) {
  const targets = fighters.filter(
    (fighter) =>
      fighter.alive &&
      fighter.id !== attacker.id
  );

  if (targets.length === 0) {
    return null;
  }

  return targets[
    Math.floor(Math.random() * targets.length)
  ];
}

export function simulateBattleRoyale(
  characters: Character[]
): BattleRoyaleResult {
  const fighters: RoyaleFighter[] =
    characters.map((character) => ({
      ...character,
      health: 100,
      alive: true,
    }));

  const events: RoyaleEvent[] = [];

  const stats: RoyaleStats = {
    totalAttacks: 0,
    criticalHits: 0,
    dodges: 0,
    abilitiesUsed: 0,
    eliminations: 0,
    totalDamage: {},
  };

  for (const fighter of fighters) {
    stats.totalDamage[fighter.id] = 0;
  }

  let round = 0;

  while (
    fighters.filter((fighter) => fighter.alive)
      .length > 1 &&
    round < 200
  ) {
    round++;

    const attackOrder =
      getAttackOrder(fighters);

    for (const attacker of attackOrder) {
      if (!attacker.alive) continue;

      const livingFighters =
        fighters.filter(
          (fighter) => fighter.alive
        );

      if (livingFighters.length <= 1) {
        break;
      }

      const defender =
        getRandomTarget(
          attacker,
          fighters
        );

      if (!defender) break;

      stats.totalAttacks++;

      /*
       * DODGE
       */

      if (
        Math.random() <
        calculateDodgeChance(defender)
      ) {
        stats.dodges++;

        events.push({
          round,
          attacker: attacker.name,
          defender: defender.name,
          damage: 0,
          type: "dodge",
          message:
            `${defender.name} dodges ${attacker.name}'s attack with incredible speed.`,
        });

        continue;
      }

      /*
       * DAMAGE
       */

      let damage =
        calculateDamage(
          attacker,
          defender
        );

      /*
       * CRITICAL
       */

      const critical =
        Math.random() <
        calculateCritChance(attacker);

      if (critical) {
        damage = Math.round(
          damage * 1.5
        );

        stats.criticalHits++;
      }

      /*
       * ABILITY
       */

      const ability =
        calculateAbility(
          attacker,
          defender,
          damage
        );

      damage = ability.damage;

      if (ability.activated) {
        stats.abilitiesUsed++;
      }

      /*
       * APPLY DAMAGE
       */

      defender.health = Math.max(
        0,
        defender.health - damage
      );

      stats.totalDamage[attacker.id] +=
        damage;

      /*
       * ELIMINATION
       */

      if (defender.health <= 0) {
        defender.health = 0;
        defender.alive = false;

        stats.eliminations++;

        events.push({
          round,
          attacker: attacker.name,
          defender: defender.name,
          damage,
          type: "elimination",
          message:
            `${attacker.name} eliminates ${defender.name} with ${damage} damage.`,
        });

        continue;
      }

      /*
       * EVENT
       */

      let type: RoyaleEvent["type"] =
        "attack";

      let message =
        `${attacker.name} attacks ${defender.name} for ${damage} damage.`;

      if (ability.activated) {
        type = "ability";

        message =
          `${ability.message} ${damage} damage dealt.`;
      } else if (critical) {
        type = "critical";

        message =
          `${attacker.name} lands a CRITICAL HIT on ${defender.name} for ${damage} damage.`;
      }

      events.push({
        round,
        attacker: attacker.name,
        defender: defender.name,
        damage,
        type,
        message,
      });
    }
  }

  const winner =
    fighters.find(
      (fighter) => fighter.alive
    ) ?? fighters[0];

  const eliminated =
    fighters.filter(
      (fighter) => !fighter.alive
    );

  /*
   * Placement
   *
   * Winner = 1st
   * Last eliminated = 2nd
   * etc.
   */

  winner.placement = 1;

  eliminated
    .reverse()
    .forEach((fighter, index) => {
      fighter.placement = index + 2;
    });

  return {
    winner,
    fighters,
    events,
    rounds: round,
    stats,
  };
}