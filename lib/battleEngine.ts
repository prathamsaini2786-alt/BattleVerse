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
  let chance =
    0.08 + attacker.speed / 500;

  // Ultra Instinct
  if (attacker.id === "goku") {
    chance += 0.06;
  }

  // Preparation gives Batman a tactical advantage.
  if (attacker.id === "batman") {
    chance += 0.04;
  }

  return Math.min(0.3, chance);
}

function calculateDodgeChance(
  defender: BattleFighter
) {
  let chance =
    defender.speed / 600;

  // Ultra Instinct
  if (defender.id === "goku") {
    chance += 0.12;
  }

  // Spider-Sense
  if (defender.id === "spiderman") {
    chance += 0.12;
  }

  return Math.min(0.4, chance);
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

function calculateAbilityDamage(
  attacker: BattleFighter,
  damage: number
) {
  let finalDamage = damage;
  let message = "";

  switch (attacker.id) {
    case "goku":
      if (Math.random() < 0.12) {
        finalDamage =
          Math.round(damage * 1.35);

        message =
          `${attacker.name} activates Ultra Instinct and unleashes a devastating attack.`;
      }
      break;

    case "luffy":
      if (Math.random() < 0.2) {
        finalDamage =
          Math.round(damage * 1.4);

        message =
          `${attacker.name} activates Gear 5 and dramatically amplifies the attack.`;
      }
      break;

    case "batman":
      if (Math.random() < 0.15) {
        finalDamage =
          Math.round(damage * 1.25);

        message =
          `${attacker.name} exploits a weakness using Preparation.`;
      }
      break;

    case "spiderman":
      if (Math.random() < 0.12) {
        finalDamage =
          Math.round(damage * 1.2);

        message =
          `${attacker.name}'s Spider-Sense predicts the opening and enables a counterattack.`;
      }
      break;
  }

  return {
    damage: finalDamage,
    message,
  };
}

function applyDefenseAbility(
  defender: BattleFighter,
  damage: number
) {
  let finalDamage = damage;
  let message = "";

  switch (defender.id) {
    case "gojo":
      // Infinity dramatically reduces incoming damage.
      if (Math.random() < 0.85) {
        finalDamage =
          Math.round(damage * 0.45);

        message =
          `${defender.name}'s Infinity drastically reduces the incoming attack.`;
      }
      break;

    case "batman":
      // Preparation gives Batman a chance to heavily reduce damage.
      if (Math.random() < 0.18) {
        finalDamage =
          Math.round(damage * 0.55);

        message =
          `${defender.name}'s Preparation allows him to anticipate the attack.`;
      }
      break;
  }

  return {
    damage: finalDamage,
    message,
  };
}

function applyRegeneration(
  fighter: BattleFighter
) {
  if (
    fighter.id !== "naruto" ||
    !fighter.alive ||
    fighter.health >= 100
  ) {
    return 0;
  }

  if (Math.random() < 0.2) {
    const healing = 8;

    const previousHealth =
      fighter.health;

    fighter.health = Math.min(
      100,
      fighter.health + healing
    );

    return fighter.health - previousHealth;
  }

  return 0;
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

    /*
     * Naruto's Six Paths Sage Mode
     * can regenerate health at the beginning
     * of a round.
     */
    const healingOne =
      applyRegeneration(fighterOne);

    if (healingOne > 0) {
      events.push({
        round,
        attacker: fighterOne.name,
        defender: fighterOne.name,
        damage: 0,
        message:
          `${fighterOne.name} regenerates ${healingOne} health using Six Paths Sage Mode.`,
      });
    }

    const healingTwo =
      applyRegeneration(fighterTwo);

    if (healingTwo > 0) {
      events.push({
        round,
        attacker: fighterTwo.name,
        defender: fighterTwo.name,
        damage: 0,
        message:
          `${fighterTwo.name} regenerates ${healingTwo} health using Six Paths Sage Mode.`,
      });
    }

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

      /*
       * Dodge system.
       */
      const dodges =
        Math.random() <
        calculateDodgeChance(defender);

      if (dodges) {
        events.push({
          round,
          attacker: attacker.name,
          defender: defender.name,
          damage: 0,
          message:
            `${defender.name} dodges ${attacker.name}'s attack.`,
        });

        continue;
      }

      /*
       * Base damage.
       */
      let damage =
        calculateDamage(
          attacker,
          defender
        );

      /*
       * Critical hit.
       */
      const isCritical =
        Math.random() <
        calculateCritChance(attacker);

      if (isCritical) {
        damage =
          Math.round(damage * 1.5);
      }

      /*
       * Attacker ability.
       */
      const abilityResult =
        calculateAbilityDamage(
          attacker,
          damage
        );

      damage =
        abilityResult.damage;

      /*
       * Defender ability.
       */
      const defenseResult =
        applyDefenseAbility(
          defender,
          damage
        );

      damage =
        defenseResult.damage;

      /*
       * Apply damage.
       */
      defender.health =
        Math.max(
          0,
          defender.health - damage
        );

      if (defender.health === 0) {
        defender.alive = false;
      }

      /*
       * Build battle message.
       */
      let message: string;

      if (!defender.alive) {
        message =
          `${attacker.name} eliminates ${defender.name} with ${damage} damage.`;
      } else if (
        defenseResult.message
      ) {
        message =
          `${defenseResult.message} ${damage} damage taken.`;
      } else if (
        abilityResult.message
      ) {
        message =
          `${abilityResult.message} ${damage} damage dealt.`;
      } else if (isCritical) {
        message =
          `${attacker.name} lands a CRITICAL HIT on ${defender.name} for ${damage} damage.`;
      } else {
        message =
          `${attacker.name} attacks ${defender.name} for ${damage} damage.`;
      }

      events.push({
        round,
        attacker: attacker.name,
        defender: defender.name,
        damage,
        message,
      });

      if (!defender.alive) {
        break;
      }
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
  };
}