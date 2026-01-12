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

  private validateQuantity(quantity: number): void {
    if (quantity < 0) {
      throw new Error(`Invalid quantity: ${quantity}`);
    }
    if (!Number.isFinite(quantity)) {
      throw new Error(`Invalid quantity: ${quantity}`);
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

    for (const product of Object.keys(reactions)) {
      if (product === "") {
        throw new Error('Invalid product: ""');
      }
      if (product.trim() === "") {
        throw new Error(`Invalid product: "${product}"`);
      }
      for (const [amount, ingredient] of reactions[product] ?? []) {
        this.validateQuantity(amount);
        if (ingredient === "") {
          throw new Error('Invalid ingredient: ""');
        }
        if (ingredient.trim() === "") {
          throw new Error(`Invalid ingredient: "${ingredient}"`);
        }
        if (!this.knownSubstances.has(ingredient)) {
          throw new Error(`Unknown ingredient: ${ingredient}`);
        }
      }
      if (!this.knownSubstances.has(product)) {
        this.knownSubstances.add(product);
        this.quantities.set(product, 0);
      }
    }
  }

  getQuantity(substance: string): number {
    this.validateSubstanceName(substance);
    if (!this.knownSubstances.has(substance)) {
      throw new Error(`Unknown substance: ${substance}`);
    }

    return this.quantities.get(substance) ?? 0;
  }

  add(substance: string, quantity: number): void {
    this.validateSubstanceName(substance);
    if (!this.knownSubstances.has(substance)) {
      throw new Error(`Unknown substance: ${substance}`);
    }
    this.validateQuantity(quantity);

    const current = this.quantities.get(substance) ?? 0;
    this.quantities.set(substance, current + quantity);
  }
}
