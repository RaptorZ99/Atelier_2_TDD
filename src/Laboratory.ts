export class Laboratory {
  private knownSubstances: Set<string>;

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
    if (knownSubstances.length === 0) {
      throw new Error("No substances provided");
    }

    for (const substance of knownSubstances) {
      this.validateSubstanceName(substance);
      if (this.knownSubstances.has(substance)) {
        throw new Error(`Duplicate substance: ${substance}`);
      }
      this.knownSubstances.add(substance);
    }
  }

  getQuantity(substance: string): number {
    this.validateSubstanceName(substance);
    if (!this.knownSubstances.has(substance)) {
      throw new Error(`Unknown substance: ${substance}`);
    }

    return 0;
  }
}
