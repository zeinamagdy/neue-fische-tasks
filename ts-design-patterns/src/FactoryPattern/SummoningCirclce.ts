// Implement the SummoningCirclce with the factory pattern:

// define an interface Creature with name: string and a method useAbility: which prints a message what the creature does.
// Create multiple classes which implement the creature interface. Some suggestions: a Dragon class with the ability breathing fire,
// a Phoenix class with ability Reborn, a Unicorn class with ability Dancing on rainbow.
// Create the Factory class SummoningCircle with a method called summon(ingredientType: string).
// Depending on the ingridient type (fire, air, sparkles, etc) a different Creature class is created and returned.
// Use the Summoning circle with different ingredients.
export interface Creature {
  name: string;
  useAbility(): void;
}
class Dragon implements Creature {
  constructor(public name: string = "Dragon") {}
  useAbility() {
    console.log("ability breathing fire");
  }
}
class Phoenix implements Creature {
  constructor(public name: string = "Phoenix") {}
  useAbility() {
    console.log("ability Reborn");
  }
}
class Unicorn implements Creature {
  constructor(public name: string = "Unicorn") {}
  useAbility() {
    console.log("ability Dancing on rainbow");
  }
}

// Factory Class
export class SummoningCircle {
  public summon(ingredientType: string): Creature {
    switch (ingredientType) {
      case "fire":
        return new Dragon();
      case "air":
        return new Phoenix();
      case "sparkles":
        return new Unicorn();
      default:
        throw new Error(`Unsupported ingredient: ${ingredientType}`);
    }
  }
}



