type ReactionMap = Record<string, Array<[number, string]>>;

export class Laboratory {
  private knownSubstances: Set<string>;
  private quantities: Map<string, number>;

  private validateSubstanceName(substance: string): void {
    if (substance === "") {
      throw new Error('Invalid substance: ""');
    }
    if (substance.trim() === "") {
      throw new Error(`Invalid substance: "${substance}"`);
    }
  }

  private validateProductName(product: string): void {
    if (product === "") {
      throw new Error('Invalid product: ""');
    }
    if (product.trim() === "") {
      throw new Error(`Invalid product: "${product}"`);
    }
  }

  private validateQuantity(quantity: number): void {
    if (quantity < 0) {
      throw new Error(`Invalid quantity: ${quantity}`);
    }
    if (!Number.isFinite(quantity)) {
      throw new Error(`Invalid quantity: ${quantity}`);
    }
  }

  private validateIngredientName(ingredient: string): void {
    if (ingredient === "") {
      throw new Error('Invalid ingredient: ""');
    }
    if (ingredient.trim() === "") {
      throw new Error(`Invalid ingredient: "${ingredient}"`);
    }
  }

  private reactions: ReactionMap;

  constructor(knownSubstances: string[], reactions: ReactionMap = {}) {
    this.knownSubstances = new Set();
    this.quantities = new Map();
    this.reactions = reactions;
    if (knownSubstances.length === 0) {
      throw new Error("No substances provided");
    }

    for (const substance of knownSubstances) {
      this.validateSubstanceName(substance);
      if (this.knownSubstances.has(substance)) {
        throw new Error(`Duplicate substance: ${substance}`);
      }
      this.knownSubstances.add(substance);
      this.quantities.set(substance, 0);
    }

    const reactionProducts = Object.keys(reactions);
    for (const product of reactionProducts) {
      this.validateProductName(product);
      if (!this.knownSubstances.has(product)) {
        this.knownSubstances.add(product);
        this.quantities.set(product, 0);
      }
    }

    const knownWithProducts = new Set([...this.knownSubstances]);

    for (const product of reactionProducts) {
      for (const [amount, ingredient] of reactions[product]) {
        this.validateQuantity(amount);
        this.validateIngredientName(ingredient);
        if (!knownWithProducts.has(ingredient)) {
          throw new Error(`Unknown ingredient: ${ingredient}`);
        }
      }
    }
  }

  getQuantity(substance: string): number {
    this.validateSubstanceName(substance);
    if (!this.knownSubstances.has(substance)) {
      throw new Error(`Unknown substance: ${substance}`);
    }

    return this.quantities.get(substance)!;
  }

  add(substance: string, quantity: number): void {
    this.validateSubstanceName(substance);
    if (!this.knownSubstances.has(substance)) {
      throw new Error(`Unknown substance: ${substance}`);
    }
    this.validateQuantity(quantity);

    const current = this.quantities.get(substance)!;
    this.quantities.set(substance, current + quantity);
  }

  make(product: string, quantity: number): number {
    this.validateSubstanceName(product);
    if (!this.knownSubstances.has(product)) {
      throw new Error(`Unknown product: ${product}`);
    }
    this.validateQuantity(quantity);

    return this.makeInternal(product, quantity, new Set());
  }

  private makeInternal(
    product: string,
    quantity: number,
    stack: Set<string>
  ): number {
    if (stack.has(product)) {
      return 0;
    }

    const reaction = this.reactions[product];
    if (!reaction) {
      return 0;
    }

    stack.add(product);

    try {
      this.ensureIngredientsAvailable(reaction, quantity, stack);
      const maxPossible = this.computeMaxPossible(reaction);

      const actual = Math.min(quantity, maxPossible);
      if (actual <= 0) {
        return 0;
      }

      for (const [amount, ingredient] of reaction) {
        const available = this.quantities.get(ingredient)!;
        this.quantities.set(ingredient, available - amount * actual);
      }

      const currentProduct = this.quantities.get(product)!;
      this.quantities.set(product, currentProduct + actual);

      return actual;
    } finally {
      stack.delete(product);
    }
  }

  private ensureIngredientsAvailable(
    reaction: Array<[number, string]>,
    quantity: number,
    stack: Set<string>
  ): void {
    for (const [amount, ingredient] of reaction) {
      const required = amount * quantity;
      const available = this.quantities.get(ingredient)!;
      if (available < required && this.reactions[ingredient]) {
        this.makeInternal(ingredient, required - available, stack);
      }
    }
  }

  private computeMaxPossible(reaction: Array<[number, string]>): number {
    let maxPossible = Infinity;
    for (const [amount, ingredient] of reaction) {
      const available = this.quantities.get(ingredient)!;
      const possible = available / amount;
      if (possible < maxPossible) {
        maxPossible = possible;
      }
    }
    return maxPossible;
  }
}
