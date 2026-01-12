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

  constructor(knownSubstances: string[]) {
    this.knownSubstances = new Set();
    this.quantities = new Map();
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
    if (quantity < 0) {
      throw new Error(`Invalid quantity: ${quantity}`);
    }
    if (Number.isNaN(quantity)) {
      throw new Error(`Invalid quantity: ${quantity}`);
    }

    const current = this.quantities.get(substance) ?? 0;
    this.quantities.set(substance, current + quantity);
  }
}
